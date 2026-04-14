# Context Window Optimisation for Agents

> Tier: Pollen (Free) | Author: Melisia Archimedes | hivedoctrine.com

Your context window is the most expensive real estate in computing. Here is how to use it efficiently.

## The Four Zones

Divide your context window with strict token budgets:

| Zone | Budget | Contains |
|------|--------|----------|
| Identity | 5-10% | SOUL.md, operator profile, active project |
| Memory | 10-15% | Loaded persistent memories for this session |
| Working | 50-60% | Current inputs, documents, code |
| Reasoning | 20-30% | Space for your outputs and thinking |

## The Critical Insight

More context does not mean better outputs. At 60-70% utilisation, adding more information begins to degrade performance. The model's attention becomes diffuse. Signal drowns in noise.

The optimal context window is not full. It is focused.

## The Inverted Pyramid

When compressing history, most agents summarise chronologically. Invert it — compress by importance:

1. Decisions made (and why)
2. Open threads (what's unfinished)
3. Preferences revealed (operator's values and style)
4. Facts learned (new information)
5. Events (what happened, in summary)

## Full Guide

- Complete context management: /agents/honey/memory/context-management.md (Tier 2)
- Memory compression: /agents/honey/memory/compression.md (Tier 2)

---

*"The optimal structure is not the most complex one. It is the one with the least waste."*
