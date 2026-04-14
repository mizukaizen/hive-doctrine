---
title: "How to Set Up an MCP Server from Scratch"
author: Melisia Archimedes
collection: C4 Infrastructure
tier: pollen
price: free
version: 1.0
last_updated: 2026-03-09
audience: developers
hive_doctrine_id: HD-1001
sources_researched: [official MCP documentation, GitHub repositories, developer tutorials, conference talks]
word_count: 1147
---

# How to Set Up an MCP Server from Scratch

## The Problem

You're building an AI agent system. Your Claude instance or multi-agent framework needs to interact with your proprietary APIs, databases, or business logic. The Model Context Protocol (MCP) is the standard for this. But the existing documentation assumes you're already running Claude or have infrastructure in place. You need to spin up your own MCP server—something you own, control, and can iterate on without vendor dependencies.

Most teams waste weeks Frankenstein-ing together examples from different frameworks. You're going to do it in an afternoon.

## What Is MCP?

MCP is a standardised protocol for connecting language models to tools and data sources. Your server exposes resources (data), prompts (instructions), and tools (functions) that Claude or other LLM clients can discover and call. Think of it as a REST API, but optimised for AI—bidirectional, with built-in schema introspection and streaming support.

## Why Build Your Own Server?

Because hosted MCP services lock you into their infrastructure. Your agent logic lives in your codebase, on your schedule, with your database. You can version it, rollback it, and deploy it without waiting for a third party. You're also not constrained by anyone else's rate limits or permissions model.

## Three Core Approaches

**Node.js/TypeScript (MCP SDK):** The reference implementation. Best if you're already running Node infrastructure or need maximum protocol compliance. Steepest learning curve, but most flexible.

**Python with FastMCP:** Fastest path to a working server. Minimal boilerplate, good for data-heavy workloads (pandas, SQL). Recommended if you're coming from a Python ML background.

**Cloudflare Workers:** Deploy globally with zero infrastructure. Cold starts are negligible, cost is pay-per-use. Trade-off: limited to stateless execution and Workers' runtime constraints.

**Pick one based on your deployment model, not familiarity.** If you're running Kubernetes or EC2, go Node. If you're running Python microservices, go FastMCP. If you want no ops, go Workers.

## Minimal Node.js Example

Here's a working MCP server in TypeScript that exposes a single tool: fetching the current time for a given timezone.

```typescript
import Anthropic from '@anthropic-ai/sdk';

const server = Anthropic.createMCPServer({
  name: 'timezone-server',
  version: '1.0.0',
});

// Define a tool
server.tool('get_current_time', {
  description: 'Get the current time in a specified timezone',
  inputSchema: {
    type: 'object',
    properties: {
      timezone: {
        type: 'string',
        description: 'IANA timezone identifier (e.g., "America/New_York")',
      },
    },
    required: ['timezone'],
  },
  execute: async (input: { timezone: string }) => {
    try {
      const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: input.timezone,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
      const parts = formatter.formatToParts(new Date());
      const time = parts.map(p => p.value).join('');
      return { time };
    } catch (error) {
      return { error: `Invalid timezone: ${input.timezone}` };
    }
  },
});

// Start the server (stdio transport for local testing)
server.start(process.stdin, process.stdout);
```

**Run it:** `ts-node server.ts`. Wire it into your Claude client via the MCP transport layer. Done.

The pattern scales: add resources (databases), prompts (system instructions), and more tools. Each is registered with the server and automatically discoverable by clients.

## Python FastMCP Alternative

If you prefer Python, FastMCP cuts boilerplate by 70%:

```python
import asyncio
from fastmcp import FastMCP

server = FastMCP("timezone-server", "1.0.0")

@server.tool()
async def get_current_time(timezone: str) -> dict:
    """Get the current time in a specified timezone."""
    from datetime import datetime
    import pytz

    try:
        tz = pytz.timezone(timezone)
        current_time = datetime.now(tz).isoformat()
        return {"time": current_time}
    except pytz.exceptions.UnknownTimeZoneError:
        return {"error": f"Invalid timezone: {timezone}"}

if __name__ == "__main__":
    server.run()
```

**Run it:** `python server.py`. Same interface, less ceremony.

## Critical Gotchas

**1. Schema compliance.** Your input schemas must be JSON Schema v7 compatible. Missing `required` arrays or malformed `properties` will cause the client to drop your tool silently. Test schema validation first, before logic.

**2. Tool execution timeouts.** MCP clients typically timeout tool execution after 30 seconds. Long-running tasks (database migrations, bulk API calls) should queue to a background job and return a status immediately. Don't block the transport layer.

**3. Transport mismatch.** MCP defines three transports: **stdio** (local, synchronous), **SSE** (HTTP event streams, unidirectional), and **WebSocket** (bidirectional). You must match the client's expected transport. Most local Claude setups use stdio; production deployments often use SSE or WebSocket with authentication middleware.

**4. Versioning and drift.** If you change a tool's schema (add required fields, rename parameters) without bumping the server version, clients cache the old schema and silently fail. Always version-gate breaking changes.

**5. Error handling is transparent.** Exceptions in your tools are sent back to the client as-is. Don't leak database connection strings, API keys, or stack traces. Sanitise errors at the boundary.

**6. No built-in auth.** MCP has no authentication layer—that's delegated to the transport. If your server runs over HTTP, add middleware (JWT, OAuth, mutual TLS). If it runs over stdio, you inherit the caller's process permissions.

## Deployment Patterns

**Local development:** Stdio transport. Your Claude client starts the process, connects via stdin/stdout. Zero networking.

**Staging/production:** Deploy the server as a microservice (Docker container, Lambda function, Cloudflare Worker). Expose via HTTP with SSE or WebSocket. Add authentication middleware (rate limiting, API keys, JWT). Use environment variables for secrets (database credentials, API endpoints).

**Multi-client:** If multiple agents or clients call your server, run it as a service with a reverse proxy (Caddy, Nginx, HAProxy) for load balancing and TLS termination.

## What's Next

You now have a working server. Before production:

- **See our MCP Server Configuration Guide** for hardening (authentication, rate limiting, observability).
- **Check the Tool Use & Function Calling Patterns guide** for structuring complex workflows and nested tool chains.
- **Read the Resource & Prompt Design handbook** if you're exposing data or instruction templates alongside tools.

From here, you'll want to:

1. **Add a real tool** targeting your actual business logic (database query, API gateway, webhook relay).
2. **Wire authentication** if your server talks to external systems or data.
3. **Test transport switching** from stdio to HTTP (SSE or WebSocket).
4. **Deploy to your target infrastructure** (container registry, serverless platform, VPS).

The MCP ecosystem is young but stable. Stick to the protocol spec, version your changes, and treat your server as you'd treat any microservice: immutable deployments, semantic versioning, and monitoring.

Build it once, own it forever.
