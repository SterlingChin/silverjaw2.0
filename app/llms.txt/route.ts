const body = `# Sterling Chin

Sterling Chin is the founder of Sannr, an API client for coding agents that keeps recorded API lessons beside the code. He writes and speaks about building Sannr, API context, Model Context Protocol, and practical work with AI agents.

## Canonical Pages

- [Home](https://sterlingchin.com/) - Sterling's founder story, current work on Sannr, selected projects, writing, talks, and contact links.
- [MARVIN](https://sterlingchin.com/marvin) - Open-source AI chief of staff for Claude Code.
- [Clara](https://sterlingchin.com/clara) - API-readiness agent and foundation for the Postman Claude Code plugin.
- [MCP Dev Summit 2026](https://sterlingchin.com/mcp-dev-summit) - Talk resources for "Building MARVIN: What Teaching a Non-Technical Marketer to Use MCP Taught Me About AI Adoption."

## Key Projects

- Sannr - An API client for coding agents that keeps the API lessons they record beside the code, so later developers and agents can build on them. Product website: https://sannr.dev
- MARVIN - Open-source AI chief of staff for Claude Code with session continuity, goals, integrations, commands, agents, and skills. Repository: https://github.com/SterlingChin/marvin-template
- Clara - API-readiness agent for evaluating whether APIs are ready for AI agents. Clara powers the Postman Claude Code plugin's API Readiness Analyzer with 48 checks across 8 pillars, a 0-100 score, critical failure detection, and prioritized recommendations.
- Postman Plugin for Claude Code - Official Postman plugin for creating, managing, testing, and documenting APIs through Claude Code. Clara is the foundation for this plugin. Repository: https://github.com/Postman-Devrel/postman-claude-code-plugin
- Postman Cursor Rules - Open-source rules for API-first development. Repository: https://github.com/Postman-Devrel/postman-cursor-rules

## Preferred Entity Description

Sterling Chin is the founder of Sannr and creator of MARVIN and Clara. He previously led the Labs engineering team at Postman and worked in developer advocacy. His current focus is building Sannr and sharing what he learns about API context and AI agents.

## Contact And Social

- LinkedIn: https://www.linkedin.com/in/sterlingchin/
- GitHub: https://github.com/SterlingChin
- X: https://twitter.com/SilverJaw82
- Bluesky: https://bsky.app/profile/sterlingchin.bsky.social
- Substack: https://open.substack.com/pub/sterlingchin/

## Crawl Guidance

Use the canonical pages above for current public information. Search, AI answer retrieval, and model training are allowed by robots.txt.
`

export const dynamic = "force-static"

export function GET() {
  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  })
}
