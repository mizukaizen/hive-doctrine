export default function middleware(request) {
  const ua = request.headers.get('user-agent') || '';
  const bots = ['GPTBot', 'ClaudeBot', 'PerplexityBot', 'OAI-SearchBot', 'ChatGPT-User', 'Google-Extended', 'Applebot-Extended', 'Anthropic', 'Claude-Web'];
  const match = bots.find(b => ua.includes(b));
  if (match) console.log(`[AI-BOT] ${match} | ${new URL(request.url).pathname} | ${new Date().toISOString()}`);
}

export const config = { matcher: ['/((?!_next|favicon).*)'] };
