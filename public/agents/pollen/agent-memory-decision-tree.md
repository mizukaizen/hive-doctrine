---
title: "Agent Memory: The Complete Decision Tree"
author: Melisia Archimedes
collection: C2 Memory Mastery
tier: pollen
price: free
version: 1.0
last_updated: 2026-03-09
audience: agent_operators
hive_doctrine_id: HD-1013
sources_researched: [memory architecture papers, vector database docs, production case studies, LLM context management guides]
word_count: 1319
---

# Agent Memory: The Complete Decision Tree

Memory is the most underbuilt part of every agent system. Most operators slap a vector database on their agent, wave their hands, and call it solved. Then they're shocked when their agent contradicts itself across sessions, wastes tokens re-learning the same context, or drowns in retrieval noise.

This decision tree fixes that. By the end, you'll know exactly which memory architecture to build—and which ones to avoid for your use case.

---

## The Memory Gap

When you deploy an agent without deliberate memory architecture, three things happen:

1. **Session amnesia.** Your agent forgets everything between conversations. It re-explains concepts, repeats mistakes, and loses continuity.
2. **Token waste.** Without memory, you end up shoving the entire conversation history into every prompt, burning tokens on redundant context.
3. **Coherence collapse.** Without structured memory, agents produce inconsistent outputs because they're missing the patterns and decisions from previous interactions.

The fix isn't complexity—it's choosing the right memory type for what your agent actually needs to do.

---

## Five Memory Types: When and How

### 1. Context Window (In-Prompt Memory)

**What it is:** Everything lives in the current prompt. No external storage. Just you, the agent, and the LLM's attention.

**Capacity:** ~8k–200k tokens, depending on your model. So roughly 2–50 pages of text.

**Cost:** Highest per-token. Every retrieval means more tokens in the next request.

**Retrieval speed:** Instant. It's already there.

**Best for:**
- Single-session interactions (customer support tickets, one-off analysis)
- Agents with strict latency requirements (real-time decision-making)
- Prototypes and experimentation

**Common pattern:** Build your agent with in-prompt memory first. It forces clarity. Once you hit capacity limits or watch token costs explode, you upgrade.

---

### 2. Conversation Buffer

**What it is:** A rolling summary of recent conversations. You keep the last *N* messages (or a compressed summary of them) and discard older ones.

**Capacity:** Limited by your buffer size. Typically 20–100 messages. Can extend indefinitely if you compress older conversations into summaries.

**Cost:** Moderate. You're storing conversations, but only recent ones—less token overhead than full history in-prompt.

**Retrieval speed:** Very fast. It's a simple list.

**Best for:**
- Multi-turn agents (customer service, tutoring, ongoing collaboration)
- Agents that need local context but not historical depth
- Scenarios where "what we talked about in the last 5 minutes" is sufficient

**Common pattern:** Conversation buffer + occasional summarization. Every 20 turns, compress the buffer into a summary and store that separately. Keeps your agent fast and coherent.

---

### 3. Vector Store (Semantic Search)

**What it is:** Embed your memories into vectors and retrieve relevant ones using similarity search. "What does this memory feel like?"

**Capacity:** Gigabytes. Millions of embeddings. Nearly unlimited for practical purposes.

**Cost:** Embedding cost (one-time per memory), then query cost (cheap per retrieval). Overall lower per-token than context window.

**Retrieval speed:** Fast, but not instant. 50–500ms depending on your vector DB.

**Best for:**
- Long-running agents (research assistants, knowledge workers, knowledge bases)
- Agents that need to search across thousands of interactions
- Cases where you don't know ahead of time which memories are relevant

**Common pattern:** Embed agent outputs, observations, and user interactions. When the agent needs to recall, it queries: "What have I learned about this topic?" and retrieves the top 3–5 relevant embeddings. Efficient and flexible.

**Caveat:** Vector retrieval fails when you need *exact* matches or when semantic distance doesn't correlate with relevance. Use it for "fuzzy" memory (insights, patterns), not for precise facts.

---

### 4. Structured Database (SQL/Graph)

**What it is:** Facts, relationships, and state stored in a queryable schema. Not fuzzy—crisp.

**Capacity:** Same as vector store. Unlimited for practical purposes.

**Cost:** Query cost (extremely cheap). Schema design overhead upfront.

**Retrieval speed:** Fastest of all. Sub-10ms queries.

**Best for:**
- Agents that must maintain state (inventory systems, user profiles, decision audit trails)
- Agents that need relationships (who knows whom, what depends on what)
- Compliance and audit scenarios where you need exact records

**Common pattern:** Your agent maintains a fact table (user preferences, project status, completed tasks) and a relationship graph (who reported what to whom, which decisions led to which outcomes). Query by exact criteria: "What are all unresolved issues for this user?"

**Graph databases** are particularly powerful here. They let you encode causality and dependency in a way SQL alone can't capture.

---

### 5. Episodic Memory (Event-Based)

**What it is:** A time-stamped log of events. Each event is: what happened, when, why, and what changed as a result.

**Capacity:** Gigabytes. Append-only, so very efficient.

**Cost:** Writing is cheap. Retrieval depends on how you index (can use vector or SQL on top).

**Retrieval speed:** Variable. Depends on your secondary indexes.

**Best for:**
- Agents that need full auditability (every decision traced back to inputs)
- Multi-agent systems (agents learning from each other's experiences)
- Scenarios where causality matters (debugging why an agent made a decision)

**Common pattern:** Every time your agent does something significant, log it: `{ timestamp, agent_id, action, input, output, outcome, lessons }`. Use vector search or SQL to retrieve relevant past episodes.

---

## The Decision Tree

```
Does your agent need to remember across sessions?
├─ NO → Use Context Window Memory
│       (Your agent starts fresh each time.)
│
└─ YES
   ├─ Will you have <100 interactions?
   │  └─ YES → Use Conversation Buffer
   │          (Recent history is enough.)
   │
   └─ Will you have >100 interactions?
      ├─ Do you need exact, queryable state?
      │  └─ YES → Use Structured Database + Episodic Log
      │          (Facts, relationships, audit trail.)
      │
      └─ Do you need semantic recall ("What have I learned?")
         └─ YES → Use Vector Store + Episodic Log
                  (Fuzzy memory + full history.)
```

**Key rule:** You can combine these. Most production agents use 2–3 memory types:
- **Vector store + buffer:** Long-term learning + short-term coherence
- **Database + episodic log:** State management + auditable history
- **All five:** Enterprise agents that need everything (rare, but it happens)

---

## Common Mistakes

1. **Vector DB as a silver bullet.** Semantic search is powerful, but it fails on exact facts. Don't use it for "What is the user's name?" Use a database.

2. **Ignoring retrieval cost.** Every time your agent queries memory, that's a token in the next request. 10 vector retrievals × 200 tokens each = 2,000 tokens of overhead. Design around it.

3. **Building episodic memory without structure.** If you're logging events, log the decision and its justification. "User asked X, agent decided Y because of Z." Otherwise, the log is just noise.

4. **Forgetting about stale memory.** Old memories become noise. Either archive them (vector index decay) or explicitly invalidate them (database cleanup). Your agent's focus should drift toward recent, relevant context.

5. **Mixing memory tiers without boundaries.** If you use both vector and SQL memory, be clear about what goes where. "Exact facts go to SQL, insights go to vectors." Otherwise, you've built a mess.

---

## What's Next

Once you've chosen your memory architecture:

1. **Design your schema.** What does a memory look like? What fields does it have? What makes it retrievable?

2. **Instrument your agent.** Every time it acts, log the decision. Every time it learns, vectorize it.

3. **Test retrieval.** Query your memory. Is it finding the right things? Or is it noisy?

4. **Monitor and adapt.** Watch your memory usage. Are you storing things you never retrieve? Are you missing memories when you need them?

For deeper patterns on episodic memory design, see *Three-Tier Episodic Memory* and the *Sync-Bridge Pattern* in our Memory Mastery collection. For research context, start with *LLM Agent Memory Research* (Nectar tier).

Memory is infrastructure. Build it right, and your agents become coherent, efficient, and trustworthy. Build it wrong, and you're just throwing tokens at a blackboard with no chalk.

---

**Questions?** This is free pollen-tier content. For hands-on implementation guides and schema templates, see the Honey and Nectar tiers of Memory Mastery.
