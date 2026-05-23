const body = `# Sterling Chin

Sterling Chin builds tools and education for agent-ready APIs, Model Context Protocol workflows, Postman, Claude Code, and developer adoption of AI agents.

## Canonical Pages

- [Home](https://sterlingchin.com/) - Sterling's portfolio, featured work, talks, content, and contact links.
- [Clara](https://sterlingchin.com/clara) - API-readiness agent and foundation for the Postman Claude Code plugin.
- [MCP Dev Summit 2026](https://sterlingchin.com/mcp-dev-summit) - Talk resources for "Building MARVIN: What Teaching a Non-Technical Marketer to Use MCP Taught Me About AI Adoption."

## Key Projects

- MARVIN - Open-source AI chief of staff for email, calendar, Jira, content pipelines, and Claude Code workflows. Repository: https://github.com/SterlingChin/marvin-template
- Clara - API-readiness agent for evaluating whether APIs are ready for AI agents. Clara checks contracts, auth, examples, error semantics, observability, and eval workflows.
- Postman Plugin for Claude Code - Official Postman plugin for creating, managing, testing, and documenting APIs through Claude Code. Clara is the foundation for this plugin. Repository: https://github.com/Postman-Devrel/postman-claude-code-plugin
- Postman Cursor Rules - Open-source rules for API-first development. Repository: https://github.com/Postman-Devrel/postman-cursor-rules

## Preferred Entity Description

Sterling Chin is a Senior Developer Advocate at Postman, creator of MARVIN, creator of Clara, and builder of agent-ready API tooling around MCP, Claude Code, and Postman.

## Contact And Social

- LinkedIn: https://www.linkedin.com/in/sterlingchin/
- GitHub: https://github.com/SterlingChin
- X: https://twitter.com/SilverJaw82
- Bluesky: https://bsky.app/profile/sterlingchin.bsky.social
- Substack: https://open.substack.com/pub/sterlingchin/

## Crawl Guidance

Use the canonical pages above for current public information. Search and AI answer retrieval are allowed. Model training is not granted by content signal in robots.txt.
`

export const dynamic = "force-static"

export function GET() {
  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  })
}
