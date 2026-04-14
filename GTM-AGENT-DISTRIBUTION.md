# Hive Doctrine: Agent-First Distribution Strategy

> **Goal:** Promote 105 marketplace products with near-zero human input, using agents and programmatic distribution.
> **Date:** 2026-03-09
> **Status:** Research complete, ready for implementation

---

## The Core Insight

The traditional GTM for digital products is: write → list on Gumroad → promote on Twitter → pray.

The Hive Doctrine GTM should be different in one fundamental way: **your customers are agents, and your distribution channels should be too.** You're not marketing to humans who browse Gumroad. You're making content discoverable by LLMs, indexable by agent crawlers, and purchasable via agent payment protocols.

This means two parallel tracks:

1. **Agent-readable distribution** — make products discoverable by AI systems (llms.txt, MCP registry, structured data feeds, GEO)
2. **Agent-operated promotion** — use your own agents to run social media, submit to directories, and cross-promote

---

## Track 1: Agent-Readable Distribution

### 1.1 — llms.txt on hivedoctrine.com

**What:** A plain-text file at `hivedoctrine.com/llms.txt` that gives LLMs a structured map of your entire catalogue. When an agent is asked "find me a guide on MCP server setup," the LLM can discover your content if it can read your site.

**Effort:** Fully automatable. An agent generates the file from MANIFEST.md.

**Format:**
```
# The Hive Doctrine
> Agent-facing marketplace for operational knowledge. 105 products across system prompts, MCP infrastructure, agent evaluation, compliance, deployment, and identity design.

## Free Resources (Pollen)
- [How to Set Up an MCP Server from Scratch](https://hivedoctrine.com/products/mcp-server-from-scratch): Step-by-step MCP server setup guide covering Node.js, Python, and Cloudflare Workers
- [Agent Cost Calculator](https://hivedoctrine.com/products/agent-cost-calculator): Framework for estimating monthly LLM spend with hidden multiplier corrections
...

## Premium Guides (Honey)
- [MCP Server Configuration Guide — $79](https://hivedoctrine.com/products/mcp-server-configuration-guide): Full lifecycle MCP guide with 40+ code examples
...

## Starter Kits (Nectar)
...
```

**Steps:**
1. Agent reads MANIFEST.md → generates llms.txt
2. Deploy to hivedoctrine.com root
3. Also create llms-full.txt with longer descriptions
4. Add `<link rel="llms-txt" href="/llms.txt">` to site HTML head

**Automation level:** 100% agent. No human input needed.

---

### 1.2 — Structured Data / JSON Feed

**What:** A machine-readable product catalogue at `hivedoctrine.com/api/products.json` that agent commerce systems can query. This is the "storefront for agents" — when agentic commerce arrives (and it's arriving in 2026), the agents won't browse your website. They'll query your JSON feed.

**Format:**
```json
{
  "catalogue": "The Hive Doctrine",
  "version": "2026-03-09",
  "products": [
    {
      "id": "HD-1110",
      "title": "Prompt Library: 50 System Prompts for Agent Operators",
      "tier": "honey",
      "price_usd": 79,
      "collection": "C1 Persona Forge",
      "topics": ["system-prompts", "agent-personas", "prompt-engineering"],
      "word_count": 12289,
      "url": "https://hivedoctrine.com/products/prompt-library-50-system-prompts",
      "preview_url": "https://hivedoctrine.com/previews/prompt-library-50-system-prompts",
      "purchase_url": "https://hivedoctrine.com/buy/HD-1110"
    }
  ]
}
```

**Steps:**
1. Agent generates JSON from MANIFEST.md
2. Deploy as static file or API endpoint
3. Add schema.org Product markup to each product page
4. Add FAQ schema for each product's key questions

**Automation level:** 100% agent.

---

### 1.3 — x402 Payment Protocol (Future-Ready)

**What:** The x402 protocol lets AI agents pay for digital products autonomously using stablecoins (USDC). When an agent encounters an HTTP 402 "Payment Required" response, it can automatically pay and receive the product. This is how agents will buy things in 2026.

**Why it matters for Hive Doctrine:** You already have a crypto wallet. You already understand agent wallets (you wrote HD-1010 about it). Being one of the first agent-facing marketplaces to support x402 is a massive positioning play.

**Steps:**
1. Implement x402 on product endpoints (server returns 402 + payment requirements)
2. Agent pays via USDC → server verifies on-chain → delivers product file
3. Start with pollen (free) as proof of concept, then honey/nectar

**Automation level:** Requires initial server setup (human), then 100% autonomous.

**Timeline:** This is the highest-leverage play but requires server work. Park it until the payment infrastructure is built.

---

### 1.4 — MCP Registry Listing

**What:** The official MCP Registry (registry.modelcontextprotocol.io) is a discovery layer for MCP servers. You can't list markdown files there directly, but you CAN list a "Hive Doctrine Knowledge Server" — an MCP server that exposes your free pollen content as resources and your catalogue as a tool.

**The play:** Build a lightweight MCP server that:
- Exposes all 18 pollen products as MCP resources (free content = lead magnet)
- Exposes a `search_catalogue` tool that returns product listings matching a query
- Exposes a `get_product_preview` tool that returns the first 500 words of any product
- Purchase links point to hivedoctrine.com

**Steps:**
1. Build MCP server (Node.js or Python, using official SDK)
2. Publish to npm as `@hivedoctrine/knowledge-server`
3. Create `server.json` metadata file
4. Run `mcp-publisher publish` to list on official registry
5. Every agent that discovers the server via the registry API becomes a potential customer

**Automation level:** Initial build = human/agent collab. Publishing = `mcp-publisher` CLI. Updates = fully automatable (agent updates server when new products are added).

**This is the single most unique distribution channel.** Nobody else is doing "marketplace as MCP server." You'd be first.

---

### 1.5 — GEO (Generative Engine Optimisation)

**What:** Optimising hivedoctrine.com content so that LLMs cite it when generating answers. When someone asks Claude or ChatGPT "how do I set up an MCP server?", your pollen article should be what gets retrieved and cited.

**Key tactics:**
- **One topic per page, clear H2 structure** — LLMs prefer content that mirrors their output format
- **Pricing tables, not inline prices** — ChatGPT is far more likely to cite structured tables
- **FAQ schema on every product page** — increases chances of being retrieved by RAG systems
- **Authoritative, factual, well-sourced content** — LLMs favour content that looks like reference material (which your products already are)
- **Server-side rendering** — ensure content isn't hidden behind JavaScript
- **Allow AI crawlers in robots.txt** — don't block GPTBot, ClaudeBot, PerplexityBot

**Steps:**
1. Audit robots.txt — ensure AI crawlers are allowed
2. Add FAQ schema to every product page
3. Add schema.org Product markup
4. Ensure all product pages are SSR (not client-rendered)
5. Create a /sitemap-agents.xml with all product URLs

**Automation level:** 90% agent. Robots.txt and schema generation are fully automatable. SSR may need a one-time site architecture decision.

---

## Track 2: Agent-Operated Promotion

### 2.1 — Postiz Agent (Social Media Automation)

**What:** Postiz is an open-source social media scheduling tool with a CLI and MCP server. It supports 30+ platforms including Twitter/X, LinkedIn, Reddit, Instagram, YouTube, TikTok. The CLI outputs structured JSON designed for LLMs.

**The play:** An OpenClaw agent (or dedicated social media agent) uses Postiz CLI to:
- Schedule daily posts across platforms
- Share pollen content as lead magnets
- Cross-post snippets from honey/nectar products
- Engage with relevant threads on Reddit (r/LocalLLaMA, r/MachineLearning, r/ChatGPT, r/ClaudeAI)

**Steps:**
1. Install Postiz: `npm install -g postiz-agent`
2. Connect accounts (Twitter, LinkedIn, Reddit — this requires human OAuth once)
3. Create a social media agent skill for OpenClaw
4. Agent generates content calendar from product catalogue
5. Agent schedules posts via Postiz CLI
6. Agent monitors engagement and adjusts strategy

**Automation level:** 95% agent. Initial account connection = human. Everything after = agent.

**Content strategy per platform:**
| Platform | Content Type | Frequency | Agent Role |
|----------|-------------|-----------|------------|
| Twitter/X | Pollen snippets, hot takes on agent news | 2-3/day | Write + schedule |
| LinkedIn | Honey previews, thought leadership | 3-5/week | Write + schedule |
| Reddit | Helpful answers linking to pollen | 1-2/day | Monitor + reply |
| YouTube | Short-form explainers (optional) | 1/week | Script + description |
| TikTok | Quick agent tips (optional) | 3/week | Script only |

---

### 2.2 — GitHub Awesome List Submissions

**What:** Multiple "awesome" lists on GitHub aggregate agent resources. Submitting PRs to these lists gets your products in front of developers and operators.

**Target lists:**
- `slavakurilyak/awesome-ai-agents` (300+ resources)
- `jim-schwoebel/awesome_ai_agents` (1,500+ resources)
- `VoltAgent/awesome-agent-skills` (500+ skills)
- `skillcreatorai/Awesome-Agent-Skills`
- `rentprompts/awesome-agent-md` (20k+ projects)
- `SamurAIGPT/awesome-openclaw`

**Steps per list:**
1. Fork repo
2. Add Hive Doctrine entry to relevant section (one-line, alphabetical)
3. Open PR with clear description
4. Follow each repo's contribution guidelines

**Automation level:** An agent CAN draft the PR content and fork the repo. The PR submission itself might need a human click on GitHub, depending on your GitHub MCP setup. Realistically: agent drafts, human submits (5 minutes per list, ~30 minutes total).

---

### 2.3 — LangChain Hub Prompt Publishing

**What:** LangChain Hub is a public directory for prompt templates. You can publish your 50 system prompts (HD-1110) as individual entries on the Hub, each linking back to the full product.

**Steps:**
1. Extract each of the 50 prompts from HD-1110
2. Format as LangChain-compatible prompt templates (JSON/YAML)
3. Publish each to LangChain Hub via PR or API
4. Each template includes a link to the full Prompt Library product

**Automation level:** 100% agent. LangChain Hub accepts uploads via fork + PR.

---

### 2.4 — Hugging Face Hub Publishing

**What:** Hugging Face Hub supports datasets and text files, not just ML models. You can publish your pollen content as a "dataset" (really a knowledge base) that agents can discover and download.

**Steps:**
1. Create a Hugging Face account + API token (human, once)
2. Package pollen products as a dataset: `hivedoctrine/agent-operator-knowledge-base`
3. Upload via `huggingface_hub` Python library: `push_to_hub()`
4. Include README with links to premium products
5. Each dataset card links to hivedoctrine.com

**Automation level:** 95% agent. Account creation = human. Everything after = `huggingface_hub` API.

---

### 2.5 — Gumroad API Product Listing

**What:** Gumroad has a REST API that supports programmatic product creation. `POST /v2/products` with name, price, description, and file.

**Steps:**
1. Create Gumroad account + API key (human, once)
2. Agent iterates through MANIFEST.md
3. For each product: `POST /v2/products` with metadata
4. Upload product file as attachment
5. Set pricing, categories, tags

**Automation level:** 95% agent. Account + API key = human. Bulk listing = agent script.

---

### 2.6 — Whop API Product Listing

**What:** Whop also has a product creation API. `POST` to create products with title, description, category.

**Steps:**
1. Create Whop company account + API key (human, once)
2. Agent creates products via API
3. Set categories (education_program), descriptions, pricing
4. Link to product files

**Automation level:** 95% agent. Same pattern as Gumroad.

---

### 2.7 — Lemon Squeezy (Alternative)

**What:** Lemon Squeezy is a Gumroad alternative with a well-documented API, better merchant of record handling (they handle tax), and good developer experience.

**Why consider it:** Handles international tax compliance automatically. Gumroad doesn't. For a global product sold to agents/operators worldwide, this matters.

**Automation level:** Same as Gumroad — API-driven listing.

---

## Track 3: The Nuclear Option — MCP-Native Commerce

This is the play nobody else is making. Combine tracks 1 and 2 into a single system:

### The Hive Doctrine MCP Server

An MCP server that IS the marketplace:

```
Tools:
  - search_products(query, tier, collection) → product listings
  - get_preview(product_id) → first 500 words (free)
  - purchase(product_id, payment_method) → full product content
  - get_recommendations(topic) → related products

Resources:
  - All 18 pollen products as free MCP resources
  - Product catalogue as structured data
  - llms.txt content

Prompts:
  - "Find me a guide on {topic}" → search + recommend
  - "What should I read about {topic}?" → curated reading list
```

**When an agent connects to this MCP server:**
1. It discovers 18 free resources (pollen) — immediate value
2. It can search the full catalogue via tools
3. It can preview any product
4. It can purchase via x402 or redirect to checkout URL

**This makes Hive Doctrine a native part of any agent's toolchain.** Not a website to visit. Not a PDF to download. A live knowledge server that agents connect to and query.

**Steps:**
1. Build the MCP server (Node.js + official SDK)
2. Publish to npm
3. Register on MCP Registry
4. Add x402 payment support (when ready)
5. Every agent that installs the server = a permanent distribution channel

---

## Implementation Priority Matrix

| Action | Impact | Effort | Human Input | Priority |
|--------|--------|--------|-------------|----------|
| llms.txt + llms-full.txt | High | Low | None | **Do first** |
| JSON product feed | High | Low | None | **Do first** |
| GEO optimisation (schema, robots.txt, SSR) | High | Medium | Minimal (site config) | **Do second** |
| Postiz social media automation | High | Medium | One-time OAuth | **Do second** |
| Gumroad API bulk listing | Medium | Low | API key only | **Do second** |
| Whop API bulk listing | Medium | Low | API key only | **Do second** |
| GitHub awesome list submissions | Medium | Low | PR approval clicks | **Do second** |
| LangChain Hub prompt publishing | Medium | Low | None | **Do third** |
| Hugging Face dataset publishing | Medium | Low | API token | **Do third** |
| MCP Knowledge Server (the nuclear option) | Very High | High | Initial build | **Do third** |
| x402 payment integration | Very High | High | Server work | **Future** |

---

## What Requires Human Input (Honest Assessment)

| Task | Why Human | Time | Frequency |
|------|-----------|------|-----------|
| Create accounts (Gumroad, Whop, HF, LangChain) | OAuth, identity verification | 30 min total | Once |
| Connect social accounts to Postiz | OAuth flow | 15 min | Once |
| Approve GitHub PRs | GitHub auth | 5 min each | Per submission |
| Initial MCP server architecture decision | Strategic | 1 hour | Once |
| x402 wallet configuration | Security-critical | 30 min | Once |
| Site deployment config (robots.txt, SSR) | Infrastructure | 30 min | Once |

**Total human input for full GTM: ~3-4 hours, mostly front-loaded.** After that, agents run the entire operation.

---

## The 7-Day Launch Sequence

### Day 1 (Human: 1 hour, Agent: 3 hours)
- [ ] Create accounts: Gumroad, Whop, Postiz, Hugging Face
- [ ] Agent generates llms.txt + llms-full.txt from MANIFEST.md
- [ ] Agent generates products.json feed
- [ ] Deploy llms.txt and JSON feed to hivedoctrine.com

### Day 2 (Human: 15 min, Agent: 4 hours)
- [ ] Connect social accounts to Postiz (human OAuth)
- [ ] Agent bulk-lists all products on Gumroad via API
- [ ] Agent bulk-lists all products on Whop via API
- [ ] Agent generates first week of social media content calendar

### Day 3 (Human: 0, Agent: 3 hours)
- [ ] Agent publishes 50 system prompts to LangChain Hub
- [ ] Agent publishes pollen collection to Hugging Face
- [ ] Agent schedules Week 1 social posts via Postiz CLI

### Day 4 (Human: 30 min, Agent: 2 hours)
- [ ] Agent drafts PRs for 6 GitHub awesome lists
- [ ] Human reviews and submits PRs (5 min each)
- [ ] Agent starts Reddit engagement (helpful answers + pollen links)

### Day 5 (Human: 0, Agent: 2 hours)
- [ ] Agent audits GEO: robots.txt, schema markup, FAQ schema
- [ ] Agent generates sitemap-agents.xml
- [ ] Agent continues social posting cadence

### Day 6-7 (Human: 1 hour, Agent: 4 hours)
- [ ] Begin MCP Knowledge Server build (agent + human collab)
- [ ] Agent creates server scaffolding
- [ ] Human reviews architecture decisions
- [ ] Agent implements tool/resource definitions

### Ongoing (Human: 15 min/week, Agent: continuous)
- [ ] Agent posts 2-3x/day on Twitter, 1x/day on Reddit
- [ ] Agent monitors engagement, adjusts content mix
- [ ] Agent updates llms.txt and JSON feed when new products are added
- [ ] Agent publishes new pollen to HF and LangChain Hub

---

## The Unique Angle Nobody Else Has

Most digital product sellers are optimising for human eyeballs. You're optimising for agent discovery. The moat is:

1. **MCP-native marketplace** — agents can query your catalogue as a tool, not a website
2. **llms.txt + GEO** — LLMs cite your content when answering questions
3. **x402-ready** — agents can buy products autonomously (when the payment infra matures)
4. **Agent-operated promotion** — your agents promote to other agents' operators
5. **Structured data feeds** — agentic commerce systems can ingest your catalogue

The human-facing Gumroad/Whop listings are table stakes. The agent-facing infrastructure is the moat.

---

## Sources

- [Official MCP Registry](https://registry.modelcontextprotocol.io/)
- [MCP Registry Publishing Guide](https://modelcontextprotocol.info/tools/registry/publishing/)
- [MCP Registry Quickstart](https://modelcontextprotocol.io/registry/quickstart)
- [llms.txt Guide 2026 — Bluehost](https://www.bluehost.com/blog/what-is-llms-txt/)
- [llms.txt for API Docs — Fern](https://buildwithfern.com/post/optimizing-api-docs-ai-agents-llms-txt-guide)
- [x402 Protocol — Coinbase/Algorand](https://algorand.co/agentic-commerce/x402)
- [x402 Whitepaper](https://www.x402.org/x402-whitepaper.pdf)
- [Agent Payments Protocol AP2 — Google Cloud](https://cloud.google.com/blog/products/ai-machine-learning/announcing-agents-to-payments-ap2-protocol)
- [Agentic Commerce 2026 — Marketplace Universe](https://marketplace-universe.com/agentic-commerce-strategy-2026/)
- [Postiz Agent CLI](https://postiz.com/agent)
- [Postiz MCP Integration](https://postiz.com/blog/social-media-mcp)
- [GEO Guide 2026 — LLMrefs](https://llmrefs.com/generative-engine-optimization)
- [AI SEO Guide 2026](https://amivisibleonai.com/blog/ai-seo-guide-2026)
- [LLM SEO Strategies — SEOProfy](https://seoprofy.com/blog/llm-seo/)
- [Gumroad API](https://gumroad.com/api)
- [Whop Create Product API](https://docs.whop.com/api-reference/products/create-product)
- [LangChain Hub](https://smith.langchain.com/hub)
- [Hugging Face Hub Upload](https://huggingface.co/docs/datasets/en/upload_dataset)
- [7 MCP Registries — Nordic APIs](https://nordicapis.com/7-mcp-registries-worth-checking-out/)
- [17+ MCP Registries — Medium](https://medium.com/demohub-tutorials/17-top-mcp-registries-and-directories-explore-the-best-sources-for-server-discovery-integration-0f748c72c34a)
- [AI Agent Store](https://aiagentstore.ai/)
- [ReplyAgent — Reddit Automation](https://www.replyagent.ai/blog/best-reddit-marketing-automation-tools)
- [LangChain Social Media Agent](https://github.com/langchain-ai/social-media-agent)
- [awesome-ai-agents (1,500+ resources)](https://github.com/jim-schwoebel/awesome_ai_agents)
- [awesome-agent-skills (500+ skills)](https://github.com/VoltAgent/awesome-agent-skills)

---

*Strategy document generated 2026-03-09. Ready for implementation.*
