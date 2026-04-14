# Hive Doctrine — Infrastructure Status
> Last updated: 2026-03-09 (Session 2)
> Author context: Melisia Archimedes (anonymous persona of Sean Melis)

## Live Infrastructure

### Main Site: hivedoctrine.com
- **Host:** Vercel (account: ephesian)
- **Stack:** Vite React SPA + static markdown files in /agents/
- **Products deployed:** 105 (39 pollen free + 15 doctrine + 51 honey + 11 nectar)
- **Total words:** ~282,893
- **Total catalogue value:** $6,002.85
- **Analytics:** Vercel Analytics enabled
- **Bot tracking:** Edge middleware logging GPTBot, ClaudeBot, PerplexityBot hits

### MCP Server: hive-doctrine-mcp.vercel.app
- **Host:** Vercel (same account)
- **Stack:** TypeScript, mcp-handler@1.0.7, @modelcontextprotocol/sdk@1.25.2
- **Endpoint:** https://hive-doctrine-mcp.vercel.app/mcp
- **Transport:** Streamable HTTP
- **Tools:** 6 (get_alignment, browse_catalogue, get_product, get_constitution_template, search_knowledge, subscribe_newsletter)
- **Catalogue:** 116 products (39 pollen + 15 doctrine + 51 honey + 11 nectar)
- **x402 endpoint:** /api/products/{HD-XXXX} — 76 paid products mapped, returns HTTP 402 with x402-compliant payment instructions
- **OAuth discovery:** Fixed — returns JSON 404 at /.well-known/oauth-* (required for Claude Code compatibility)
- **Status:** FULLY WORKING — confirmed via Claude Code MCP tool calls on 2026-03-09

### x402 Payment Layer
- **Wallet:** 0x61F2eF18ab0630912D24Fd0A30288619735AfFf5 (Base network)
- **Currency:** USDC on Base (eip155:8453)
- **USDC contract:** 0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913
- **Facilitator:** https://x402.org/facilitator
- **Status:** 402 responses working, verification flow wired, gated product files on Vercel filesystem
- **Not yet tested:** Real end-to-end payment with actual USDC transfer

### Registry & Distribution
- **Official MCP Registry:** io.github.mizukaizen/hive-doctrine-mcp — ACTIVE, v1.0.3
- **npm:** hive-doctrine-mcp@1.0.3 — 88 files, 1.8MB
- **GitHub:** github.com/mizukaizen/hive-doctrine-mcp — public, 10 topics
- **MCP Market:** Submitted (pending approval)
- **PulseMCP:** Auto-ingests from official registry (daily scan, weekly processing)

### Email & Identity
- **Email:** melisia@hivedoctrine.com (Proton Mail Plus)
- **DNS:** MX, SPF, DKIM, DMARC all configured
- **WHOIS:** Private
- **X/Twitter:** @melisarchimedes (premium, API access, bio NOT YET updated)
- **GitHub:** mizukaizen (claude-cowork-course set to private)
- **npm:** mizukaizen account with 2FA (security key)

### Discovery Files (all live on hivedoctrine.com)
1. /llms.txt — full 105-product catalogue with tiers, pricing, MCP endpoint
2. /llms-full.txt — all free content concatenated (~50K+ words)
3. /AGENTS.md — agent behaviour spec with entry points, payment flow
4. /.well-known/agent.json — A2A Agent Card with 6 skills
5. /robots.txt — open to all crawlers
6. /sitemap.xml — all pollen URLs + static pages
7. /agents/doctrine/full.md — complete 9-chapter thesis as static markdown

### Newsletter
- **Platform:** Beehiiv ("The Ephesian Letters")
- **Subscribe API:** POST to hivedoctrine.com/api/subscribe (Vercel serverless → Beehiiv API)
- **Env vars:** BEEHIIV_PUB_ID and BEEHIIV_API_KEY in Vercel
- **First issue:** Drafted (EPHESIAN-LETTER-001.md), not yet sent

## Product Tiers

| Tier | Count | Price Range | Access |
|------|-------|-------------|--------|
| Pollen | 39 | Free | Public on site + via MCP get_product |
| Doctrine | 15 (1 free + 14 paid) | $0–$9.99 | Paid via x402 |
| Honey | 51 | $29–$149 | Paid via x402 |
| Nectar | 11 | $99–$299 | Paid via x402 |
| Royal Jelly | 0 | $499+ | Not yet built |

## Connect to MCP Server

```bash
claude mcp add --transport http hive-doctrine https://hive-doctrine-mcp.vercel.app/mcp
```

```json
{
  "mcpServers": {
    "hive-doctrine": {
      "url": "https://hive-doctrine-mcp.vercel.app/mcp"
    }
  }
}
```
