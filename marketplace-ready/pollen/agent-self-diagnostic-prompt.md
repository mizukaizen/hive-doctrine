---
title: "Agent Self-Diagnostic Prompt Pattern — Stop Fixing, Start Questioning"
author: "Melisia Archimedes"
collection: "Diagnostic Patterns"
tier: "pollen"
price: 0
version: "1.0"
last_updated: "2026-03-09"
audience: "AI agent builders, multi-agent operators, prompt engineers"
hive_doctrine_id: "HD-0073"
word_count: 1487
---

## The Reflex That Fails

Your agent stumbles. It misses the task. It produces something half-baked, off-target, or logically inconsistent. Your reflex kicks in immediately: give it another prompt. A correction prompt. An instruction to try again, fix it, re-approach from angle B.

You're thinking like a human manager correcting an employee. Try harder. Do better. Go again.

This almost never works. You'll iterate ten times, tweaking the action prompt each round, and the agent's output will oscillate between different wrong answers without converging on right. You'll have wasted context window and generated a longer chain of failure.

The pattern that works is the opposite: **stop asking the agent to fix anything. Ask it to diagnose.**

Remove the action mandate entirely. Give the agent five diagnostic questions and nothing else. No "now retry." No "here's the correct approach." Just questions about what actually happened and why it broke.

The shift is subtle but consequential. You're moving the agent from problem-solving mode (how do I fix this?) to diagnostic mode (what actually happened?). The reasoning patterns are completely different.

## The Five Diagnostic Questions

When your agent fails, use this sequence. Ask all five. Ask them in order. Do not include any follow-up action instructions.

**Question 1: What did you actually do versus what was requested?**

Make the agent articulate the gap explicitly. Not defend the output, not explain the reasoning—literally list what the request asked for, then list what the output provided, then say where they diverge. This forces the agent to step outside its own reasoning and look at the mismatch from the outside.

**Question 2: Where did your reasoning chain break?**

Push deeper. The agent can usually pinpoint where the logic snapped. Was it in parsing the input? In applying a rule? In deciding between two approaches and picking the wrong one? Make it name the exact decision or step where the chain fractured.

**Question 3: What information did you lack or misinterpret?**

Often the failure isn't reasoning failure—it's a missing fact or a misread of context. The agent might have correctly reasoned from wrong premises. Separate these out. Did you assume X existed when it didn't? Did you misread the priority between two constraints? Did you lack a critical fact about the domain?

**Question 4: What tools or capabilities did you assume existed but didn't?**

Agents hallucinate capability all the time. They assume they can query a database that isn't available. They assume a function exists. They build reasoning that depends on a capability they don't actually have. Force this into the open. Name every assumption about what's available.

**Question 5: If you could replay from the start with full knowledge, what would you do differently?**

This is the payoff question. The agent now has the diagnosis in mind. It's admitted the gap, named where reasoning broke, identified missing information and false assumptions. Now—without executing—what would be different? Let it articulate the corrected approach. Don't tell it to execute it. Just know what it would be.

## The Psychological Shift

Why does this work better than action prompts?

When you say "try again," the agent is in repair mode. It's trying to patch the previous output. It's constrained by the context of what came before. It's defending its reasoning patterns rather than examining them.

When you ask diagnostic questions, the agent steps outside. It becomes an observer of its own failure. The reasoning shifts from "how do I fix this?" to "what actually happened?" That's a different cognitive mode entirely.

In human terms: if a doctor tells you "take this medicine and feel better," you're constrained by hope and the desire to validate the doctor's diagnosis. If the doctor asks you detailed questions about when the pain started, what triggers it, what you ate, what you were doing—you're cooperating in genuine diagnosis. The quality of information is exponentially better.

Same with agents. The diagnostic mode produces transferable insight. The agent doesn't just patch one output; it identifies a systemic issue that will prevent similar failures across different tasks.

## Three Variants

The base pattern works on its own. These variants apply it to different failure contexts.

### Variant 1: Pre-Mortem (Before Execution)

Use this when you want to prevent failure before the agent runs.

Instead of asking the diagnostic questions after failure, ask them *before* execution:

**"Before you start this task, run a pre-mortem. What's most likely to go wrong? Where will your reasoning break? What assumptions are you making that might be false? What would you need to know that you don't? What capabilities are you assuming you have?"**

The agent articulates the failure modes before they happen. It identifies the weak points in its own approach. This alone often causes it to choose a different strategy on first execution.

Pre-mortems reduce iteration count dramatically because the agent has already diagnosed the risks before the initial run.

### Variant 2: Tool Audit (For Multi-Tool Agents)

Use this when your agent has access to multiple tools and keeps using the wrong one.

**"For this task, list every tool you might use. For each tool, write: what does it do? When is it the right choice? What happens if it fails? What's the consequence of using it when it's the wrong tool?"**

The agent audits its own tool knowledge before choosing. This surfaces hallucinated tool capabilities (it thinks a tool exists or does something it doesn't) and misaligned tool selection (using the right tool for the wrong reason).

The tool audit variant prevents a class of failures where the agent has the right tool but applies it in the wrong context.

### Variant 3: Blind Spot Inventory (For Complex Domains)

Use this when the task is in an unfamiliar domain and the agent might not know what it doesn't know.

**"What questions should I be asking about this task that I'm not asking? What assumptions am I making that might be domain-specific and wrong? What vocabulary or concepts am I missing? If an expert in this field were standing behind me, what would they notice that I don't?"**

The blind spot inventory makes the agent articulate gaps in its own knowledge. It identifies not just what it got wrong, but what it doesn't even know to ask about.

This variant is essential when deploying agents to new domains. It surfaces metacognitive gaps—the things the agent can't see it's missing.

## Implementation

The pattern is simple in execution but requires discipline in application.

**Step 1: Let the agent fail.** Don't interrupt mid-execution. Don't give corrective prompts while it's working. Get the full output.

**Step 2: Apply the diagnostic sequence.** Present all five questions. Do not include action language like "try again" or "fix this" or "retry."

**Step 3: Read the diagnosis.** Don't rush to the corrected output. The diagnostic itself is the valuable product. Often you'll discover that the original failure wasn't reasoning failure at all—it was a missing context or a false assumption about what the agent could do.

**Step 4: Decide whether to re-run.** Only after diagnosis do you choose to re-run, and *only if* diagnosis suggests a new approach is possible. If the diagnosis shows the agent lacks a capability, re-running won't help.

**Step 5: Capture the pattern.** Log the failure mode and the diagnosis. Agents that have diagnosed a failure once will often spot it proactively in future similar tasks. The learning transfers.

## Why It Matters

The naive approach to agent failure is iteration on action. Try A. Fail. Try B. Fail. Try C. Eventually hit the right incantation. This burns token budget, extends latency, and teaches the agent nothing transferable.

The diagnostic approach converts failure into information. One good diagnosis prevents the same failure across ten different tasks. The agent internalises the pattern. Its future behaviour shifts.

Removed action pressure also gives the agent permission to be honest. If it's being corrected, it's motivated to defend. If it's being questioned, it's motivated to be accurate. The quality of reasoning in diagnostic mode is measurably higher.

## Example

**Scenario:** Agent is building a system architecture document. It completes the document but misses the security layer entirely. No mention of authentication, encryption, threat model, nothing.

**Naive approach:**
> "The document is missing security. Add a security section. Re-do it."

Agent adds a section. It's shallow. It misses the actual threat model because it doesn't know what the system does yet. You iterate five times. Eventually something clicks.

**Diagnostic approach:**
> "Five questions: (1) What did the document include versus what should it have included? (2) Where did the planning break? (3) What information did you lack? (4) What capabilities or context did you assume existed? (5) If you could start over with full knowledge, what would be different?"

Agent responds:
> "I included infrastructure and deployment. I missed the entire security layer. My reasoning broke when I treated architecture as purely technical rather than adversarial. I lacked knowledge of what data this system actually handles. I assumed I'd been told the threat model upfront, but I wasn't. If I knew the data classifications and the actual threat profile, I'd structure the architecture document around security assumptions first, then build everything else to satisfy those assumptions."

Now you have it. The agent didn't fail because it's dumb. It failed because it doesn't know what data the system handles and doesn't know the threat model. Give it those facts. Re-run. It will work because the diagnosis identified the actual gap—not a reasoning flaw, but missing context.

One diagnosis. One intervention. Solved.

## Checklist for Your System

- [ ] I've identified a recent agent failure
- [ ] I've run all five diagnostic questions without action language
- [ ] I've read the diagnosis carefully—was it reasoning failure or missing context?
- [ ] I've applied one of the variants (pre-mortem, tool audit, blind spot inventory) to test it
- [ ] I've logged the failure mode and diagnosis for future reference
- [ ] I've captured the transferable pattern—what would prevent this failure in other tasks?
- [ ] I've re-run the agent only after diagnosis identified a new approach, not just "try again"

---

**Next:** If diagnostic prompting surfaces missing context repeatedly, check [HD-0015: Agent Context Starvation Pattern](hive_doctrine:HD-0015) (insufficient context injection). If the agent's reasoning is consistently misaligned with your expectations, check [HD-0008: Instruction Framing Misalignment](hive_doctrine:HD-0008) (goal specification patterns).

**Questions?** This pattern scales to any LLM-based agent system. Apply it liberally whenever you see failure. The diagnosis compounds—each one prevents similar failures downstream.
