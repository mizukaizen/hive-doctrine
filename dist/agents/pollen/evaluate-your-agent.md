---
title: "How to Evaluate If Your Agent Is Actually Working"
author: Melisia Archimedes
collection: C9 Diagnostic Patterns
tier: pollen
price: free
version: 1.0
last_updated: 2026-03-09
audience: agent_operators
hive_doctrine_id: HD-1015
sources_researched: [agent evaluation frameworks, benchmark methodologies, production monitoring guides, quality assurance research]
word_count: 956
---

## The Vibe Check Problem

You're running an agent. It seems to be working. Your team says it's fine. You feel good about it. But do you actually know?

If you can't measure it, you can't improve it. And right now, most of you can't measure it.

This is the vibe check problem. It's how every operator I've talked to evaluates their agents. It's also how every operator gets surprised when something breaks in production, or discovers six months too late that the agent is hallucinating 30% of its outputs.

The vibe check is comfortable. You don't have to build infrastructure. You don't have to maintain spreadsheets. You just run the agent, watch it work, feel like it's working, and move on. That works until it doesn't.

Switching from gut feel to data is the difference between operating an agent and actually understanding one.

## The Five Metrics That Matter

You need to track five things. These aren't fancy. They're not novel. They're the foundational metrics that separate agents that work from agents that look like they work.

### 1. Task Completion Rate

**What it measures:** How often does your agent actually finish what you asked it to do, without timing out, crashing, or producing a non-response?

**How to measure it:** Count the total number of tasks you send to the agent. Count how many actually return a usable response. Divide.

```
Completion Rate = (Completed Tasks / Total Tasks) × 100
```

**What good looks like:** 95%+. Anything below 90% means your infrastructure is fragile, your prompts are unclear, or your agent is hitting limits it can't handle.

**Red flags:**
- Completion rate dropping over time (sign of degradation or drift)
- Completion rate correlating with task complexity (agent fails on hard tasks)
- Different completion rates for different task types (some domains are broken)

### 2. Accuracy / Correctness

**What it measures:** Of the tasks that complete, how many are actually correct?

**How to measure it:** Define correctness for your use case. For factual tasks: does the answer match ground truth? For creative tasks: does a domain expert approve? For analytical tasks: can you reproduce the calculation?

Pick a sample of completed tasks (aim for at least 50). Score each as correct or incorrect. Calculate the rate.

```
Accuracy = (Correct Outputs / Sample Size) × 100
```

**What good looks like:** 85%+. Anything below 80% means your agent needs better prompts, better context, or better guardrails.

**Red flags:**
- Accuracy dropping as task complexity increases (model is out of depth)
- Accuracy varying by topic (knowledge gaps in specific domains)
- Accuracy recovering after you add examples or constraints (poor baseline prompt engineering)

### 3. Cost Per Task

**What it measures:** How much does it cost to run one task through your agent, including API calls, compute, storage, and overhead?

**How to measure it:** Track the total cost of your agent operation (API tokens, infrastructure, bandwidth). Divide by the number of tasks completed in that period.

```
Cost Per Task = Total Operating Cost / Tasks Completed
```

**What good looks like:** This depends on your use case. If you're using GPT-4o at scale, you should expect $0.01–$0.10 per task. If you're running smaller models, $0.001–$0.01. If you're optimizing aggressively, you can go lower.

**Red flags:**
- Cost per task increasing despite no change in complexity (inefficient token usage, retry loops)
- Cost far higher than your benchmarks (missing caching, redundant calls, wrong model choice)
- Cost not correlating with accuracy (expensive but wrong agent)

### 4. Latency (Time to Complete)

**What it measures:** How long does it take from task submission to result delivery?

**How to measure it:** Timestamp when the task enters your system. Timestamp when the result exits. Calculate the difference. Track the distribution (median, 95th percentile, worst case).

```
Latency = Task Completion Time - Task Submission Time
```

**What good looks like:** This depends on your use case. Real-time applications need sub-second or single-digit second latency. Batch operations can tolerate minutes. Know your SLA and measure against it.

**Red flags:**
- Latency increasing over time (system is degrading, load building up)
- Latency spiking for specific task types (bottleneck in your architecture)
- Latency not matching your upstream requirements (users are timing out waiting for your agent)

### 5. User/Operator Satisfaction

**What it measures:** Are the people using or depending on the agent actually happy with it?

**How to measure it:** Ask them. Directly. Simple scale: 1–10, or binary thumbs-up/thumbs-down. Collect feedback on a regular cadence (after every 10 tasks, or weekly, depending on volume).

```
Satisfaction Score = (Positive Responses / Total Feedback) × 100
```

**What good looks like:** 80%+. Anything below 70% is a warning sign that either your agent isn't delivering what was promised, or your users don't trust it yet.

**Red flags:**
- Satisfaction dropping despite stable metrics elsewhere (you've changed something users don't like)
- Satisfaction high but accuracy low (users haven't noticed the problem yet)
- Satisfaction varying by user type (some use cases are better supported than others)

## The Evaluation Protocol

You don't need fancy tooling. You need discipline.

1. **Pick 50 tasks** that represent the full spectrum of what you ask your agent to do.
2. **Score each task** on all five metrics. Create a simple spreadsheet:
   - Column A: Task ID
   - Column B: Completed? (Yes/No)
   - Column C: Correct? (Yes/No)
   - Column D: Cost in dollars
   - Column E: Latency in seconds
   - Column F: Satisfaction (1–10)
3. **Calculate the rates** for metrics 1, 2, and 5. Calculate the averages for metrics 3 and 4.
4. **Composite score:** If you want a single number, weight them: 25% completion, 25% accuracy, 20% cost efficiency, 15% latency, 15% satisfaction. Adjust weights to match what matters in your operation.
5. **Set thresholds.** Decide what "good" means for each metric. When you cross the threshold, something changes: you investigate, you retrain, you retune, you escalate.
6. **Run this quarterly.** At minimum. More often if you're in active optimization.

## What's Next

Once you have data, you have leverage. You can see which tasks are failing. You can see which model choice is breaking your cost budget. You can see exactly where your agent is leaking value.

You can also make trade-offs intentionally. Maybe you cut accuracy slightly to hit a latency target. Maybe you increase cost to improve reliability. The point is: you'll know what you're trading.

This is how you move from operating on feel to operating on fact. It's also the foundation for the deeper diagnostic work in our nectar-tier **Agent Evaluation Framework**, which covers advanced topics like drift detection, adversarial testing, and multi-agent choreography.

For now: pick a metric. Start measuring. One week from now, you'll know your agent better than you do today.

If you can't measure it, you can't improve it.

---

**Related resources:**
→ Nectar: Agent Evaluation Framework (HD-1016)
→ Honey: Monitoring Stack for Production Agents (HD-2001)
→ Pollen: Prompt Engineering Diagnostics (HD-1012)
