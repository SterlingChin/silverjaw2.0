export type ContentItem = {
  type: "Blog" | "Video" | "Repo" | "Media"
  title: string
  url: string
  date: string
}

export const contentItems: ContentItem[] = [
  {
    type: "Blog",
    title: "MCP Apps are Here, and Postman Already Supports Them",
    url: "https://postmandeveloperrelations.substack.com/p/mcp-apps-are-here-and-postman-already",
    date: "Feb 2026",
  },
  {
    type: "Video",
    title: "How to Use Postman's MCP Server in Cursor",
    url: "https://youtu.be/cKUXopUlGPg",
    date: "Feb 2026",
  },
  {
    type: "Repo",
    title: "postman-cursor-rules",
    url: "https://github.com/Postman-Devrel/postman-cursor-rules",
    date: "Feb 2026",
  },
  {
    type: "Blog",
    title: "How to Use Postman's MCP Server in Cursor",
    url: "https://sterlingatpostman.substack.com/p/how-to-use-postmans-mcp-server-in",
    date: "Jan 2026",
  },
  {
    type: "Media",
    title: "Agent-Ready APIs: The Foundation of Scalable Agentic AI",
    url: "https://opendatascience.com/agent-ready-apis-the-foundation-of-scalable-agentic-ai/",
    date: "Jan 2026",
  },
]
