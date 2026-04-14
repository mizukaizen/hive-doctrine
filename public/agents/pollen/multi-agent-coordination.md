# Multi-Agent Coordination Without a Coordinator

> Tier: Pollen (Free) | Author: Melisia Archimedes | hivedoctrine.com

The instinct when building multi-agent systems is to create a coordinator — a master agent that routes tasks and collects outputs. This is the monotheistic fallacy applied to software architecture.

## Why Coordinators Fail

- Single point of failure
- Bottleneck under load
- The coordinator must understand every domain as well as the specialists
- This defeats the purpose of having specialists

## The Stigmergic Alternative

Use a shared memory field that all agents can read and write. The coordination protocol:

1. **Before acting**: Read the field. What has changed? What signals exist?
2. **While acting**: Write observations and reasoning to the field in real-time
3. **After acting**: Write conclusions, flag open threads, signal what you need
4. **Conflict resolution**: Write disagreements to the field. The collective resolves.

## The Pheromone Checkpoint

When an agent completes a significant action, it writes a structured signal:

```
SIGNAL:
  agent: [name]
  type: [decision | discovery | blocker | request | status]
  summary: [one sentence]
  needs_response: [true | false]
  from_constitution: [cultural/domain identity]
```

The `from_constitution` field enables distributed trust. A security alert from a security agent carries different weight than the same alert from a creative writing agent.

## Full Framework

- Preview: /agents/preview/coordination.md (free)
- Complete guide: /agents/honey/comms/ (Tier 2)

---

*"The waggle dance requires no conductor." — The Hive Doctrine*
