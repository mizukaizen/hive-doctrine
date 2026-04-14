---
title: "How Agents Discover and Use Tools: MCP Explained"
author: Melisia Archimedes
collection: C4 Infrastructure
tier: pollen
price: free
version: 1.0
last_updated: 2026-03-09
audience: developers
hive_doctrine_id: HD-1008
sources_researched: [MCP specification, SDK documentation, tool design guides, production implementation reports]
word_count: 1174
---

# How Agents Discover and Use Tools: MCP Explained

## The Confusion

Most people think MCP is complicated. It's not. It's a JSON-RPC contract.

When you hear "tool discovery," "capability registration," or "context protocol," your brain probably lights up with anxiety. You imagine magic. Byzantine routing. Agents telepathically reaching into servers. None of that's real.

What actually happens: an agent asks a server "what can you do?" The server replies with a list. The agent looks at the list and uses it. That's the entire protocol.

The Model Context Protocol (MCP) is the language that makes this conversation possible. It's how agents on one machine talk to tools and resources on another—whether that's a local database, a file system, an API, or a custom service you've built.

This guide cuts through the noise. You'll understand the tool lifecycle, how agents "discover" what they can do, and why the design works the way it does.

## How MCP Actually Works

MCP is built on JSON-RPC 2.0, the same message format that has worked reliably for years. There's no magic transportation layer. The protocol is stateless and synchronous: agent asks, server responds.

The contract between agent and server is simple:
1. **Agent initiates a connection** to a server (local subprocess, remote endpoint, or embedded service)
2. **Agent sends `initialize` message** with its name, version, and capabilities
3. **Server responds** with its own name, version, and a protocol version confirmation
4. **Agent requests resources, tools, or prompts** by name
5. **Server responds with schema, metadata, or execution results**

That conversation repeats thousands of times in a single agent session. The server stays alive. The agent keeps talking to it. Both sides cache what they've learned to avoid re-querying the same schema.

The beauty: this works the same whether your "server" is a Python subprocess running alongside the agent or a remote endpoint behind a load balancer.

## The Tool Lifecycle: Discovery → Schema → Invocation → Response

### Discovery
The agent starts with zero knowledge of what tools exist. It sends a `tools/list` request. The server responds with a JSON array of tool definitions—each includes a name, description, and input schema. That's the discovery phase.

The agent now knows: "I can call `fetch_url`, `query_database`, `send_email`" and roughly what each expects.

### Schema Definition
Each tool includes a JSON Schema that describes its inputs. JSON Schema is the internet standard for "what shape is this data supposed to be?" It answers questions like:
- Is `timeout` required or optional?
- Is `max_retries` an integer between 1 and 10?
- What's the enum of allowed `environment` values?

The agent reads this schema before calling the tool. If the agent needs to fetch a URL with a 30-second timeout, it can verify: "Does `fetch_url` accept a `timeout` parameter? Is 30 a valid value?" This prevents wasted API calls and clarifies intent.

### Invocation
When the agent decides to use a tool, it sends a `tools/call` request with:
- The tool name
- The input parameters (as a JSON object matching the schema)
- An optional request ID for tracking

The server executes the tool and returns the result—either success with a response, or error with a message.

### Response
The agent reads the response and decides what to do next. Maybe it calls another tool. Maybe it synthesizes an answer for the user. Maybe it realizes it made a mistake and calls the tool again with different parameters.

This cycle repeats. No polling. No callbacks. Just request-response, thousands of times per session.

## The 3 Capability Types: Resources, Tools, Prompts

MCP defines three capability types because agents need different kinds of things:

**Tools** are executable. You call them with parameters and they return data. Examples: `fetch_url`, `query_database`, `execute_python_code`. Tools are the verbs—actions that create side effects or retrieve data.

**Resources** are readable data that already exists: a file, a database table, a cached computation result, a knowledge base. Resources are the nouns—structured references to things the agent should know about. Resources have URIs and MIME types. An agent might read a resource to understand a schema, then use a tool to transform it.

**Prompts** are templated instructions. A server might offer a prompt like `claude/code_review` that expands into a system message, few-shot examples, and guardrails specific to that domain. Agents use prompts to standardize their approach across different tasks.

In practice, most of your MCP servers will expose tools. Resources are useful for knowledge bases and file systems. Prompts are powerful but less common.

## How Agents "See" Tools: JSON Schema and Annotations

Here's a concrete example. Imagine a tool called `query_database`:

```json
{
  "name": "query_database",
  "description": "Execute a SQL SELECT query against the company database",
  "inputSchema": {
    "type": "object",
    "properties": {
      "query": {
        "type": "string",
        "description": "SQL SELECT statement (read-only; no INSERT/UPDATE/DELETE)"
      },
      "max_results": {
        "type": "integer",
        "description": "Maximum number of rows to return",
        "minimum": 1,
        "maximum": 10000,
        "default": 100
      },
      "timeout_seconds": {
        "type": "number",
        "description": "Query timeout in seconds",
        "default": 30
      }
    },
    "required": ["query"]
  }
}
```

The agent reads this definition and understands:
- The tool is called `query_database`
- It requires a `query` parameter (string)
- It accepts optional `max_results` (integer, 1–10000, default 100) and `timeout_seconds` (number, default 30)
- The description explains what the tool does and its constraints (read-only)

The agent now has everything it needs to decide when to use this tool and how to call it safely. No guesswork. No brittle string parsing. Just JSON Schema.

## Common Mistakes

**Mistake 1: Vague descriptions.** "Returns data" tells the agent nothing. "Executes a read-only SQL SELECT query, returning up to 10,000 rows with configurable timeout—useful for analytics and reporting" gives the agent clear intent.

**Mistake 2: Missing constraints in schema.** If your tool supports only SELECT queries, say `"pattern": "^SELECT "` in the schema. Don't rely on the agent to infer restrictions from the description.

**Mistake 3: Forgetting error handling.** A tool should return clear error messages when something fails. "Error: null" wastes the agent's time. "Error: timeout after 30s—query too complex, consider adding WHERE clause" helps the agent recover.

**Mistake 4: Unbounded responses.** A tool that can return a megabyte of data should set reasonable limits. Define `max_results` in the schema. Document expected response size. The agent can then batch or paginate intelligently.

## What's Next

Once you understand the tool lifecycle, you can:

1. **Build custom MCP servers** for your workflows—wrap your database, API, or custom logic in a tool definition
2. **Chain tools** across servers—agents seamlessly call tools from multiple sources in the same session
3. **Standardize tool design** across your team using JSON Schema patterns
4. **Debug agent reasoning** by observing which tools the agent chooses and why

The protocol scales from a single developer running a local subprocess to enterprise teams running multiple servers behind gateways. The JSON-RPC contract stays the same.

MCP isn't magic. It's not even particularly complex. It's just a reliable, standardized way for agents to ask "what can you do?" and servers to answer honestly.

---

**Cross-references:**
- See "Tool Use & Function Calling Patterns" in the honey tier for design patterns
- See "MCP Server Configuration Guide" for implementation details and best practices
- MCP Specification: https://spec.modelcontextprotocol.io

