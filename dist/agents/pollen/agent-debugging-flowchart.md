---
title: "The Agent Debugging Flowchart"
author: Melisia Archimedes
collection: C9 Diagnostic Patterns
tier: pollen
price: free
version: 1.0
last_updated: 2026-03-09
audience: developers
hive_doctrine_id: HD-1006
sources_researched: [agent debugging frameworks, observability platforms, production incident reports, developer forums]
word_count: 987
---

# The Agent Debugging Flowchart

Your agent just broke. The output is wrong. Performance tanked. It's stuck in a loop. Or it's calling tools that don't exist.

Stop guessing.

This flowchart isn't theory. It's the decision tree we've used to debug production agents across multi-agent orchestration layers, LLM API shifts, and real-world tool failures. Follow the branches. Check the diagnostics. Apply the fix. Move on.

---

## Stop Guessing: The Core Tree

```
                        AGENT PRODUCED WRONG OUTPUT
                                    |
                    __________________+__________________
                    |                 |                 |
            WRONG CONTENT         WRONG FORMAT      WRONG TONE/STYLE
                    |                 |                 |
                [Branch A]        [Branch B]        [Branch C]
```

This tree has five major branches. Each one isolates a category of failure. Pick the one that matches your symptom, then drill down.

---

## Branch A: Wrong Content (Agent Gave Bad Information)

**Diagnostic questions:**
1. Did the agent hallucinate, or did it receive hallucinated input from a tool?
2. Is the prompt expecting behaviour the model doesn't support at this capability tier?
3. Is context too old, too large, or corrupted by token limit cuts?

**What to check:**

- **Tool output**: Log every tool response. Print the raw JSON. Agents often repeat bad data because the tool lied first.
- **Context window**: Count tokens in the prompt. If you're above 70% of the model's limit, context gets truncated or pruned by the model's internal attention. Add a summarisation step.
- **Prompt specificity**: Ask the agent to "summarise in one sentence" vs "analyse and synthesise." The second is harder and more likely to fail on weaker models.

**Most common fix:**
Validate tool outputs before the agent sees them. Wrap tool calls in a verification layer: does the response match the expected schema? Is the data within expected ranges? Reject and retry if not.

---

## Branch B: Tool Failure (Agent Can't Call Tools or Tools Return Errors)

**Diagnostic questions:**
1. Is the tool registered and accessible to the agent runtime?
2. Does the agent have the right credentials or API keys for this tool?
3. Is the tool request malformed, or is the tool endpoint actually down?

**What to check:**

- **Tool registry**: Verify the tool exists in your orchestration layer. Log the tool name the agent tried to use. Compare against your defined tools.
- **Permissions**: Check API keys, OAuth tokens, database credentials. The agent won't tell you "I don't have permission"—it'll either hang or return a 401/403 wrapped in a generic error.
- **Tool request format**: Many tool failures are actually format mismatches. The agent generated `{"query": "..."}` but your tool expects `{"input": "..."}`. Add a schema validation step before dispatching.

**Most common fix:**
Add a tool-wrapping layer that validates the request schema and retries once with exponential backoff. Log the raw request and response. Most failures resolve on retry (transient network glitches). If not, the logs will show exactly where it failed.

---

## Branch C: Context and Memory Issues (Agent Forgot or Lost State)

**Diagnostic questions:**
1. Is the agent losing context between turns in a conversation?
2. Is multi-agent coordination breaking because agents can't see each other's outputs?
3. Is the memory store (vector DB, message history, external knowledge base) stale or corrupted?

**What to check:**

- **Message history**: Print the full conversation history the agent sees. If earlier turns are missing or truncated, the agent can't reference them.
- **Shared memory**: In multi-agent systems, does Agent B see Agent A's outputs? Check your IPC/message queue. Log what gets written and what gets read.
- **Embedding freshness**: If you're using vector retrieval for context, check the embedding timestamps. Stale embeddings = wrong context.

**Most common fix:**
Implement explicit state serialisation. Before each agent turn, snapshot the current state (conversation history, shared context, agent roles). Make state immutable and append-only. Log state transitions. This is tedious but catches 80% of memory-related bugs.

---

## Branch D: Model Capability Mismatch (Agent Can't Do What You're Asking)

**Diagnostic questions:**
1. Is the task genuinely beyond this model's capability tier? (reasoning, code generation, etc.)
2. Has the model's behaviour changed recently? (API version update, fine-tuning, parameter shift)
3. Is the prompt asking for outputs the model's tokeniser can't represent cleanly?

**What to check:**

- **Model benchmarks**: Check current evals on reasoning, coding, and instruction-following for your model. If you're asking for 99th percentile performance, you won't get it.
- **API changelog**: Look at recent updates to your LLM provider. New parameter limits? Fine-tuning changes? Model deprecations? These break agents silently.
- **Output tokenisation**: Some models struggle with specific output formats (XML, strict JSON, special characters). Test your exact output format with a simple one-shot prompt before deploying.

**Most common fix:**
Upgrade the model. Move from a 70B parameter model to a frontier model (Claude 3.5 Sonnet, GPT-4o). This isn't always an option cost-wise, but it's the clearest diagnostic. If performance jumps with a better model, the original was just underpowered.

---

## Branch E: Coordination Failure (Multi-Agent System Broke)

**Diagnostic questions:**
1. Is Agent A blocking Agent B, or are they genuinely parallelised?
2. Are agents using conflicting state, or does one agent's output contradict another's assumptions?
3. Is the orchestrator correctly routing outputs between agents, or is a message getting lost?

**What to check:**

- **Agent DAG**: Draw the dependency graph. Does Agent C wait for Agent B, which waits for Agent A? If you have circular dependencies, you'll deadlock.
- **Shared state conflicts**: If two agents write to the same resource (database, file, shared cache), add locking or use an event log instead.
- **Message routing logs**: Log every message that moves between agents. Who sent it? Who should receive it? Who actually received it? Misroutes are invisible without logs.

**Most common fix:**
Implement a message broker (Redis, RabbitMQ, or a simple log file with polling). Make all inter-agent communication async and logged. Add a reconciliation step: after all agents finish, verify the final state is consistent with the messages they exchanged.

---

## Common Patterns

**The agent says "I don't know" but should know.**
→ Check context/memory (Branch C). Usually the information was lost between turns.

**The agent is slow or timing out.**
→ Check tool failure (Branch B). It's probably retrying a broken tool call.

**The agent works on simple tasks but fails on complex reasoning.**
→ Check model capability (Branch D). Use a better model or break the task into smaller steps.

**Multi-agent system is inconsistent (different agents give different answers for the same question).**
→ Check coordination (Branch E). Agents are using stale or conflicting state.

**The agent's output looks right but downstream systems reject it.**
→ Check tool failure (Branch B). The format doesn't match what the next system expects.

---

## What's Next

You've found your branch. You've checked the diagnostics. You've applied the fix.

Now: **add observability**. Log the agent's reasoning, tool calls, and outputs. Build a dashboard. When the agent breaks next time—and it will—you'll have data instead of guesses.

For deeper patterns, see the **Multi-Agent Debugging Playbook** (honey tier) and the **Agent Monitoring & Observability Stack** (honey tier). Those documents walk you through building production-grade observability and incident response for agents at scale.

Your agent is fixable. You just needed a tree.
