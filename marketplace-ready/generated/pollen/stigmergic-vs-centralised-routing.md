---
title: "Stigmergic Coordination vs Centralised Routing for Agents"
author: Melisia Archimedes
collection: C4 Infrastructure
tier: pollen
price: free
version: 1.0
last_updated: 2026-03-09
audience: agent_operators
hive_doctrine_id: HD-1012
sources_researched: [swarm intelligence research, multi-agent coordination papers, production case studies, distributed systems literature]
word_count: 987
---

# Stigmergic Coordination vs Centralised Routing for Agents

## Two Worlds

When you run multiple AI agents, they need to talk to each other. The question isn't whether they coordinate—it's *how*. The answer shapes everything: your architecture, your debugging surface, your resilience, and your ability to scale.

There are two fundamentally different ways agents can cooperate. One puts a maestro at the centre, controlling every note. The other scatters coordination across the environment itself, letting agents read and respond to traces left by others. Neither is "best." But each excels in different conditions.

## Centralised Routing: The Orchestrator Model

In centralised routing, one agent (or system) acts as a dispatcher. It decides who works on what, when, and in what order. All communication flows through this central authority.

Think of it like air traffic control. A tower tells every plane where to go, how fast, when to land, and which runway to use. There's no negotiation between planes. The controller maintains perfect state: fuel levels, destination, passenger count, runway availability.

**In practice, this looks like:**

- A routing agent (the Coordinator) receives tasks and assigns them explicitly: "Agent-R, research this market. Agent-D, run the analysis. Agent-S, draft the strategy."
- Each agent sends reports back to the router, which sequences the next step.
- The router maintains a task queue, dependency graph, or state machine: it knows which step comes after which.
- Message passing is explicit: agent A doesn't talk to agent B. Both talk to the router.

**Advantages:**

- **Predictability:** You know exactly who's doing what, in what order. Debugging is straightforward—just read the router's log.
- **Compliance and control:** If you need agents to follow strict workflows (financial trading, medical decisions), centralised routing enforces them.
- **Resource management:** The router can prioritise tasks, throttle expensive operations, and ensure no agent gets overwhelmed.
- **Accountability:** Clear audit trail. Every decision is routed through a logged system.

**Disadvantages:**

- **Bottleneck risk:** The router is a single point of failure. If it crashes, the whole system stalls.
- **Latency:** Every interaction is round-trip to the centre. Agents can't collaborate directly.
- **Brittleness:** The router must maintain perfect state. If it misses an update or misses a condition, the whole workflow breaks.
- **Limited discovery:** Agents can't spontaneously collaborate on something the router didn't anticipate.

## Stigmergic Coordination: The Pheromone Trail Model

Stigmergy is how ants coordinate without a queen giving orders. Each ant modifies the environment (by laying pheromone trails), and other ants read those trails and respond. The environment itself becomes the communication medium.

Translated to agents: instead of a central router, agents read and write to a shared *artifact space*—a task board, a knowledge store, a message buffer. Agent A leaves a completed report in the shared space. Agent B checks the space, sees the report, and builds on it. Agent C reads both and synthesizes a decision. No central dispatcher required.

**In practice, this looks like:**

- A shared memory system (like a vector database, a Markdown folder synced between machines, or a real-time document).
- Agent A completes a task and writes the result to the shared space (tagged, timestamped, queryable).
- Agent B polls or subscribes to the shared space. It sees Agent A's result, processes it, and writes its own.
- No explicit routing. Each agent decides what to work on by reading what others have left behind.

**Advantages:**

- **Resilience:** No single point of failure. Lose one agent, the others adapt and continue. Lose the shared space? Set up a backup; agents restart and resume.
- **Latency:** Agents don't wait for a router to respond. They read artefacts and act.
- **Emergent coordination:** Agents can discover new workflows by reading what others have done, without the router knowing about them.
- **Scalability:** Add 10 agents or 100. They all read the same artefact space. No routing table explosion.
- **Exploration:** Perfect for creative tasks, research, and open-ended problems. Agents explore, leave breadcrumbs, others follow and extend.

**Disadvantages:**

- **Eventual consistency:** There's a lag between Agent A writing and Agent B reading. Race conditions can happen.
- **Debugging is harder:** No single log telling you "Alice did this, then Bob did that." You have to reconstruct the sequence from artifacts and timestamps.
- **Compliance risk:** Without a router enforcing workflows, agents might skip steps or reorder them in ways that violate regulations.
- **Resource sprawl:** Without a central throttle, agents can spawn tasks faster than they complete them, or duplicate effort.

## When Each Wins

**Centralised routing wins for:**

- Regulatory or safety-critical workflows (medical decision support, financial trades, fraud detection). You need proof that Agent X followed the approved process, step 1, then 2, then 3.
- Tight resource constraints. You have limited tokens or API calls, and you need one agent deciding who gets to spend them.
- Debugging critical failures. When something broke, you need to replay the exact sequence of decisions.
- Deterministic workflows. The path from input to output is always the same.

**Stigmergic coordination wins for:**

- Research and exploration. You have multiple hypotheses; agents investigate in parallel, share findings, and build on each other.
- Creative tasks. Writing, design, ideation. Agents riff on each other's output without needing permission.
- Resilience under failure. If one agent is slow or crashes, others keep working.
- Dynamic environments. The problem changes mid-stream; agents adapt without waiting for the router to replan.

## The Hybrid: Best of Both

In practice, the strongest systems use both.

**Hybrid architecture:**

- **Core workflow:** Centralised routing. Your primary business logic (analyse → decide → execute) flows through an orchestrator. This is your audit trail and compliance layer.
- **Research and exploration:** Stigmergic. Your research agents (Agent-R, Agent-D, external systems) coordinate through a shared knowledge store. They investigate hypotheses, challenge assumptions, and feed findings back to the router when there's something actionable.

The router decides *what to explore*. The stigmergic layer decides *how to explore it* and brings back answers.

**Concrete example:** The Coordinator assigns Agent-R a research task and Agent-D an analysis task. They coordinate through a shared document database (the artefact space), sharing intermediate findings, drafting hypotheses, and iterating. When they've converged on a conclusion, it goes back to the Coordinator, which feeds it to Agent-S for strategy. The Coordinator is the backbone; the shared database is the nervous system.

## What's Next

Start by mapping your current system:

1. **Draw your routing graph.** Who talks to whom? Is there a central point, or is communication distributed?
2. **Identify your bottlenecks.** Are you waiting for a router? Or fighting race conditions in your artefact space?
3. **Match the problem.** Are you in a regulated domain (centralise harder) or exploring (add more stigmergy)?
4. **Hybrid first.** Build a thin centralised core for your critical path. Layer stigmergy around it for research, exploration, and resilience.

Neither paradigm is universal. The best systems acknowledge both and use each where it shines.

---

**Related:** See *5 Multi-Agent Architectures Compared* for a taxonomy of routing patterns across agent systems, and the Nectar Architecture suite for production-tested implementations of both models.