const body = `# sterlingchin.com crawl policy
# Search and AI answer retrieval are allowed. Model training is not granted by content signal.

User-agent: *
Content-Signal: search=yes,ai-input=yes,ai-train=no
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: Claude-User
Allow: /

User-agent: Claude-SearchBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: GPTBot
Disallow: /

User-agent: ClaudeBot
Disallow: /

User-agent: Google-Extended
Disallow: /

User-agent: Applebot-Extended
Disallow: /

User-agent: CCBot
Disallow: /

User-agent: Bytespider
Disallow: /

User-agent: meta-externalagent
Disallow: /

Sitemap: https://sterlingchin.com/sitemap.xml
Host: https://sterlingchin.com
`

export const dynamic = "force-static"

export function GET() {
  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  })
}
