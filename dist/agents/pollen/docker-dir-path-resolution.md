---
title: "Docker Script Path Resolution — The One-Liner That Fixes Silent Container Path Bugs"
author: "Melisia Archimedes"
collection: "Bypass Patterns"
tier: "pollen"
price: 0
version: "1.0.0"
last_updated: "2026-03-09"
audience: "Docker users, DevOps engineers, anyone running scripts inside containers"
hive_doctrine_id: "HD-0026"
---

# Docker Script Path Resolution

## The Silent Failure

You've packaged scripts to share across hosts and containers. The script references sibling files: config files, data directories, helper scripts. You test it locally. It works. You mount it into a container. It still runs. No errors in the logs. No exceptions thrown.

Your downstream system behaves as if the script succeeded. But it didn't read or write anything meaningful—because the paths were wrong inside the container, and the script exited with code 0 anyway.

**This is a Docker path resolution bug.** The script runs. It silently fails to access the files it depends on. You spend hours debugging the downstream system when the real problem is sitting in your scripts directory.

## Why It Happens

### The Setup

Docker containers mount directories from the host at arbitrary paths. Your host might have scripts at `/opt/scripts/`. Inside the container, the same files might be at `/app/scripts/`. The script doesn't know which one it is.

If the script uses hardcoded absolute paths based on the host filesystem, it will look for `/opt/scripts/config.json` inside the container. That path doesn't exist there—the file is actually at `/app/scripts/config.json`. The open() call fails silently. The script continues as if nothing happened.

### Real Scenarios

- **Shared utility scripts** in Docker multi-service systems: one script calls another via absolute path that only exists on the host
- **Config file loading** in containerised applications: the app looks for `/etc/app/config.yaml` but it's been mounted at `/opt/config/config.yaml`
- **Data file references** in agent systems: an agent script references a sibling data file using the host path, not the container path
- **Multi-stage builds** that share scripts: each stage has a different root, so relative paths break
- **Orchestrated agents** in containerised multi-agent systems: scripts launched by one agent reference files with hardcoded host paths instead of paths relative to their own location

### The False Confidence

The script exits with code 0. You can echo the path to stderr and see it printed. The file accessor method exists in your code. Your team believes the script is working.

What's actually happening:
- The script tries to open a file at the hardcoded path
- The open fails because that path doesn't exist in the container
- The script either swallows the error, uses a default value, or continues with empty/null data
- Downstream systems see the "successful" exit code and process empty or default data as if it were real

The problem is upstream. The debugging is downstream.

## The Solution: Script Directory Resolution

Resolve all paths **relative to the script's own location**, not relative to the caller's working directory or hardcoded host paths.

### The One-Liner

```bash
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
```

This works in any of these contexts:
- Called directly: `bash /path/to/script.sh`
- Called via symlink: `bash /symlink-to-script.sh`
- Added to PATH and called by name: `script.sh`
- Invoked from inside a container with any mount path
- Invoked with any working directory

### How It Works

1. **`$0`** is always the script's own path, regardless of how it was invoked or what the working directory is
2. **`dirname "$0"`** extracts the directory part (but might return a relative path like `.` or `..`)
3. **`cd` into that directory** makes sure we're in the right place
4. **`pwd`** prints the absolute path of the current directory (the script's directory)
5. **Command substitution** captures that absolute path into `SCRIPT_DIR`

The result: `SCRIPT_DIR` always contains the absolute path to the directory where the script lives, regardless of mount points or how the script was called.

## Key Insights

### 1. $0 Is Your Anchor

The only reliable way to find a script's own location is through `$0`. Don't use `${BASH_SOURCE[0]}` (less portable), don't use relative paths (breaks in containers), don't hardcode host paths (breaks across environments).

### 2. Dirname Alone Can Return Relative Paths

If you write `dirname "$0"` without the `cd` wrapper, you might get `.` or `../scripts` instead of an absolute path. Wrapping it in `cd ... && pwd` forces it to absolute form.

### 3. Shared Scripts Should Never Assume Caller Context

A shared script that relies on the caller's working directory (`./config.json`, `${PWD}/data/`) will break when called from different directories or inside containers. Write scripts that find their own files, not files relative to who called them.

### 4. Docker Changes Paths, Not Scripts

When you mount a host directory into a container, the files don't move—their paths change. A script that worked on the host with `/opt/shared/config.json` needs to become `/app/shared/config.json` in the container. The only robust way to handle this is path resolution relative to the script's own location.

### 5. Silent Exit Code 0 Is the Real Danger

When a script fails to open a file but continues executing, it returns 0. Your orchestration system sees success. Your logs show the script ran. You debug downstream. The script itself never triggers an alarm.

## Implementation

### Step 1: Add the Resolution Line at the Top

Place this right after the shebang:

```bash
#!/bin/bash
set -e  # Exit on error

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
```

The `set -e` is optional but recommended—it makes the script exit immediately if any command fails, which exposes problems earlier.

### Step 2: Use $SCRIPT_DIR for All Relative Paths

Instead of:

```bash
# WRONG: hardcoded host path
CONFIG_FILE="/opt/config.json"

# WRONG: relative to caller's working directory
CONFIG_FILE="./config.json"

# WRONG: using $PWD (depends on where script was called from)
CONFIG_FILE="${PWD}/config.json"
```

Use:

```bash
# CORRECT: relative to script's own directory
CONFIG_FILE="${SCRIPT_DIR}/config.json"

# Or in a subdirectory
DATA_DIR="${SCRIPT_DIR}/../data"
```

### Step 3: Create Directories If They Don't Exist

Before reading or writing to a path, make sure the directory exists:

```bash
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
OUTPUT_DIR="${SCRIPT_DIR}/output"

mkdir -p "$OUTPUT_DIR"
touch "$OUTPUT_DIR/results.txt"
```

The `-p` flag creates parent directories as needed.

### Step 4: Verify Paths on Stderr (Optional but Helpful)

Add a debug line to print the resolved paths when the script starts:

```bash
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
CONFIG_FILE="${SCRIPT_DIR}/config.json"

# Debug output—goes to stderr, doesn't interfere with stdout
echo "[DEBUG] Script directory: $SCRIPT_DIR" >&2
echo "[DEBUG] Config file: $CONFIG_FILE" >&2

# Now use $CONFIG_FILE
```

In containers, this shows up in the logs and helps you verify paths are resolving correctly before they fail silently.

## Example: Multi-Agent Shared Script

A typical scenario: a shared agent framework provides utility scripts that multiple agents call. Each agent runs in a different container with different mount points.

**Before (fails silently in containers):**

```bash
#!/bin/bash

# WRONG: hardcoded path from development environment
CONFIG_FILE="/Users/dev/projects/agents/shared/config.json"
HELPER_SCRIPT="/Users/dev/projects/agents/shared/helpers.sh"

source "$HELPER_SCRIPT"
CONFIG=$(cat "$CONFIG_FILE")

echo "Using config: $CONFIG"
```

In a container, `/Users/dev/...` doesn't exist. The script exits 0, but `HELPER_SCRIPT` isn't sourced and `CONFIG` is empty. Downstream agent code uses empty data.

**After (works everywhere):**

```bash
#!/bin/bash
set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
CONFIG_FILE="${SCRIPT_DIR}/config.json"
HELPER_SCRIPT="${SCRIPT_DIR}/helpers.sh"

echo "[DEBUG] Script dir: $SCRIPT_DIR" >&2
echo "[DEBUG] Config file: $CONFIG_FILE" >&2

source "$HELPER_SCRIPT"
CONFIG=$(cat "$CONFIG_FILE")

echo "Using config: $CONFIG"
```

Same script. Works on the host at `/opt/scripts/agent-setup.sh`. Works in a container at `/app/shared/agent-setup.sh`. Works when mounted at any path because it finds its own directory first.

**Test it:**

```bash
# On host
bash /opt/scripts/agent-setup.sh
# Output:
# [DEBUG] Script dir: /opt/scripts
# [DEBUG] Config file: /opt/scripts/config.json
# Using config: ...

# In container
docker run -v /opt/scripts:/app/shared my-agent bash /app/shared/agent-setup.sh
# Output:
# [DEBUG] Script dir: /app/shared
# [DEBUG] Config file: /app/shared/config.json
# Using config: ...
```

Both use their local paths. Neither breaks.

## Common Anti-Patterns to Avoid

| Pattern | Problem | Use Instead |
|---------|---------|-------------|
| `CONFIG="/opt/config.json"` | Fails outside `/opt` | `"${SCRIPT_DIR}/config.json"` |
| `source ./helpers.sh` | Breaks from different directories | `source "${SCRIPT_DIR}/helpers.sh"` |
| `cd /var/app && ./run.sh` | Assumes specific working directory | `SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"` |
| `${BASH_SOURCE[0]}` | Less portable, doesn't work in all shells | `$0` with dirname/cd/pwd |
| `$(pwd)/config.json` | Depends on caller's working directory | `"${SCRIPT_DIR}/config.json"` |
| `dirname "$0"` alone | Returns relative path in some cases | Wrap in `cd ... && pwd` |

## Packaging Notes

**This pattern applies to:**
- Any Dockerised system with shared scripts
- Multi-agent architectures where agents call shared utilities
- Microservices with script-based initialization or hooks
- CI/CD pipelines that run the same script in different environments
- Cross-platform deployments (cloud, bare metal, local)

**Typical ROI:**
- 5 minutes to add to an existing script
- Eliminates an entire class of silent failures
- Scripts become portable across any mount point or environment

**Prerequisite:**
- Bash or POSIX shell scripts
- Scripts that reference files in their own directory or subdirectories
- Any system deploying the same scripts to multiple containers

**Quick checklist:**
- [ ] Script has `SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"` at the top
- [ ] All relative file paths use `$SCRIPT_DIR` prefix
- [ ] Directories are created with `mkdir -p` before writing
- [ ] Debug output on stderr shows resolved paths
- [ ] Script tested in at least one container with a different mount point

**Next steps:**
- Add the same pattern to all shared scripts in your system
- Create a script template or skeleton that includes this by default
- Document that all shared scripts must resolve paths relative to `$SCRIPT_DIR`
- In code review, flag scripts that use hardcoded or relative paths

---

**Author Note:** This pattern was discovered while debugging silent failures in containerised agent systems. A script that "worked" was actually failing silently because its hardcoded paths didn't exist inside containers. The `SCRIPT_DIR` pattern caught the problem immediately and made scripts portable across any deployment. Use it for any script that leaves your control.
