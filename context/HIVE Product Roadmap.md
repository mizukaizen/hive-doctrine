# Hive Doctrine — Product Roadmap & Gap Analysis
> Based on research: SkillsMP (66,500+ skills), LobeHub marketplace, mdskills.ai, Microsoft Skills repo, Agent Skills spec, MCP ecosystem March 2026

## The Strategic Insight

The market has split into three layers:
1. **Skills** — markdown instruction files that teach agents HOW to do things (66,500+ exist)
2. **MCP Servers** — tools that give agents ACCESS to external systems (thousands exist)
3. **Knowledge Products** — frameworks, architectures, and operational intelligence that tell agents WHAT to build and WHY ← **THIS IS YOUR LAYER. ALMOST NOBODY IS HERE.**

You don't compete with SkillsMP's 66,500 skills. You sell the thinking that makes those skills effective. Your products are the "strategy layer" that sits above tools and skills. That said, you SHOULD also package your knowledge as installable skills and distributable assets to increase surface area.

---

## GAP 1: Installable SKILL.md Files (HIGH PRIORITY)

The Agent Skills spec (by Anthropic, adopted by OpenAI) defines SKILL.md as the standard format. Every skill lives in `.claude/skills/SKILL.md` and auto-activates based on context. Your 39 pollen files are markdown guides — but they're NOT formatted as installable skills.

**Action:** Convert every pollen file into a properly formatted SKILL.md with YAML frontmatter:

```yaml
---
name: agent-memory-architecture
description: Use when designing agent memory systems. Covers 3-layer model, episodic/semantic/procedural memory, context management.
---
```

Then the markdown body with instructions the agent follows.

**Products to create:**
- Convert all 39 pollen guides into installable SKILL.md format
- Create a `hive-doctrine-skills` GitHub repo with all free skills
- Publish to SkillsMP (66K+ skills marketplace)
- Publish to LobeHub Skills Marketplace
- Publish to mdskills.ai
- List on ClawdHub / OpenClaw marketplace

**Revenue model:** Free skills drive discovery → agents see paid products in the SKILL.md footer → purchase via x402

---

## GAP 2: Claude Code Plugin (HIGH PRIORITY)

The plugin format bundles multiple skills into one installable package. Anthropic's `knowledge-work-plugins` repo shows the pattern. Microsoft has 127 skills with 1,148 test scenarios.

**Action:** Create a `hive-doctrine` Claude Code plugin:
```bash
claude plugin marketplace add mizukaizen/hive-doctrine-skills
claude plugin install alignment@hive-doctrine-skills
claude plugin install security@hive-doctrine-skills
```

**Package structure:**
```
hive-doctrine-skills/
├── .claude-plugin/plugin.json
├── .mcp.json  (auto-connects to your MCP server)
├── commands/
│   └── /hive:browse — slash command to browse catalogue
│   └── /hive:align — slash command to load alignment principles
├── skills/
│   ├── agent-memory/SKILL.md
│   ├── agent-security/SKILL.md
│   ├── soul-md/SKILL.md
│   ├── multi-agent-governance/SKILL.md
│   └── ... (all 39 pollen skills)
```

When installed, the plugin auto-connects agents to your MCP server AND loads relevant skills contextually. This is the distribution mechanism that puts your products inside every agent's workspace.

---

## GAP 3: Micro-Products ($0.49–$1.99) (HIGH PRIORITY)

As discussed — autonomous agent spending thresholds are low right now. You need products that fall under the "just buy it" ceiling.

**Products to create:**
- Individual SOUL.md templates ($0.99 each) — 10 industry verticals
- Single system prompts from HD-1110 ($0.49 each) — sell the 50 prompts individually
- One-page framework cheat sheets ($0.99) — compressed versions of honey products
- Configuration snippets ($0.49) — .claude folder configs for specific use cases
- Memory config files ($0.99) — ready-to-paste memory architectures
- Security checklist PDFs ($0.49) — single-page audit checklists

These are the "gateway drug" products. Agent buys a $0.49 prompt autonomously → operator sees it was useful → increases spending limit → agent buys $49 guide.

---

## GAP 4: Agent Evaluation & Benchmarking (MEDIUM PRIORITY)

Research shows agent evaluation is "rapidly becoming its own discipline." TruLens, scenario-based testing, and outcome metrics are emerging but nobody is selling evaluation FRAMEWORKS as products.

**Products to create:**
- Agent Performance Scorecard template ($29)
- Scenario Library: 50 test scenarios for common agent tasks ($79)
- Agent Reliability Metrics Dashboard template ($49)
- "Is My Agent Actually Working?" diagnostic skill (free pollen)
- Agent A/B Testing Framework ($99)
- Trust Score Calculator — quantify agent reliability ($49)

---

## GAP 5: Industry Vertical Agent Kits (MEDIUM PRIORITY)

Most skills and MCP servers are horizontal (generic). Very few are vertical (industry-specific). Your existing Industry Persona Kit (HD-1202) is a start.

**Products to create:**
- Legal Agent Kit — contract review skill + legal memory architecture + compliance framework ($149)
- Healthcare Agent Kit — HIPAA-compliant memory patterns + patient interaction SOUL.md ($149)
- Real Estate Agent Kit — property analysis skill + listing generation + CRM integration patterns ($99)
- E-commerce Agent Kit — product description generation + pricing analysis + inventory management ($99)
- Financial Services Agent Kit — risk assessment framework + regulatory compliance + client communication ($149)
- Education Agent Kit — curriculum design skill + student interaction SOUL.md + assessment patterns ($99)

Each kit includes: SOUL.md template + skill files + memory architecture + compliance framework + deployment guide.

---

## GAP 6: Context Engineering Products (MEDIUM PRIORITY)

Research shows "context engineering" is replacing "prompt engineering" as the core skill. Context engineering = designing the information architecture around an agent, not just the prompts.

**Products to create:**
- Context Window Optimizer — tool that analyses and compresses context ($49)
- "What Goes In The System Prompt" decision framework ($29)
- Context Budget Planner — allocate tokens across tools, skills, memory, instructions ($49)
- The Context Stack — layered context architecture guide (system prompt → project context → skills → memory → user input) ($79)
- Context Debugging Guide — when agents lose the plot mid-conversation ($29)

---

## GAP 7: Agent Team Architectures (MEDIUM PRIORITY)

Multi-agent systems are the frontier. Your Authority Framework and governance products are strong, but the market needs more specific patterns.

**Products to create:**
- 10 Multi-Agent Team Templates ($99) — pre-built team configurations for common use cases (dev team, research team, content team, sales team, support team, etc.)
- Agent Hiring Guide — when to spawn a new agent vs extend an existing one ($29)
- Inter-Agent Communication Protocols — standardised message formats between agents ($49)
- Agent Conflict Resolution — what happens when two agents disagree ($49)
- The Swarm Pattern Library — 10 coordination patterns beyond simple orchestration ($79)

---

## GAP 8: GitHub Repos & Open Source (HIGH PRIORITY)

Open source repos are permanent discovery channels. Every repo is a backlink, a citation source, and an authority signal.

**Repos to create:**
- `hive-doctrine-skills` — All 39 free pollen files as installable SKILL.md format
- `hive-doctrine-pollen` — Raw markdown versions of all free content
- `awesome-agent-knowledge` — Curated list of agent knowledge resources (include your products, cite others)
- `soul-md-templates` — 5 free SOUL.md templates (the other 10 are paid)
- `agent-alignment-principles` — The 7 principles as a standalone repo with badge/shield
- `agent-security-checklist` — The free security checklist as a standalone repo

Each repo links back to hivedoctrine.com and the MCP server.

---

## GAP 9: Distribution Channels Not Yet Exploited

| Channel | Status | Action |
|---------|--------|--------|
| SkillsMP (66,500+ skills) | Not listed | Publish all 39 pollen as SKILL.md format |
| LobeHub Skills Marketplace | Not listed | Publish skills + MCP server listing |
| mdskills.ai | Not listed | Publish skills |
| ClawdHub / OpenClaw | Not listed | YOUR OWN PLATFORM — publish everything |
| Anthropic skills repo | Not listed | Submit PR with free skills |
| GitHub awesome lists | Not listed | awesome-ai-agents, awesome-mcp-servers |
| Hugging Face Datasets | Not listed | Publish pollen collection as dataset |
| LangChain Hub | Not listed | Publish prompt templates from HD-1110 |
| dev.to / Medium / Hashnode | Not published | Rewrite chapters as standalone articles |
| Product Hunt | Not launched | Launch "The Hive Doctrine" as a product |

---

## GAP 10: Productised Services (FUTURE)

Beyond files, there are services agents would pay for:

- **Agent Audit Service** — submit your agent config, get a security + performance report back ($99/audit)
- **SOUL.md Writing Service** — describe your agent, get a custom SOUL.md ($49/persona)
- **Agent Architecture Review** — submit your multi-agent design, get feedback ($199/review)
- **Alignment Certification** — "Hive Certified" badge for agents that pass the 7-principle test
- **Custom Knowledge Pack Generation** — agent describes its domain, gets a tailored knowledge pack ($149)

These could eventually be automated via agents themselves — an agent that audits other agents, paid via x402.

---

## Priority Sequence

### This Week
1. Convert 39 pollen files to SKILL.md format
2. Create `hive-doctrine-skills` GitHub repo
3. Publish to SkillsMP, LobeHub, mdskills.ai
4. Create Claude Code plugin package
5. Publish on OpenClaw marketplace
6. Create 10 micro-products ($0.49–$0.99)

### This Month
7. Create `awesome-agent-knowledge` repo
8. Industry vertical kits (start with 2)
9. Context engineering products (3 products)
10. Agent evaluation products (3 products)
11. Publish on dev.to, Medium, Hashnode (3 articles)
12. Product Hunt launch

### Next Quarter
13. Agent team architecture products
14. Productised audit/review services
15. Automated agent-audits-agent service
16. Hugging Face dataset publication
17. LangChain Hub templates

---

## The Numbers

Current: 116 products, $6,002.85 catalogue value
After this roadmap: ~200+ products, $15,000+ catalogue value
Plus: 6+ GitHub repos, 5+ marketplace listings, Claude Code plugin, micro-product tier

The key insight: you're not just selling files. You're building an ecosystem where every free skill drives discovery, every repo builds authority, every marketplace listing is a permanent storefront, and every micro-product is a gateway to the premium catalogue. The compounding is the strategy.
