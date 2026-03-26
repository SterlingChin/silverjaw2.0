// data/talks.ts

export type TalkResource = {
  label: string
  url: string | null
  icon: string
}

export type Talk = {
  slug: string
  title: string
  event: string
  date: string
  location: string
  description?: string
  status: "upcoming" | "past"
  links: {
    feedback: string | null
    repo: { label: string; url: string } | null
  }
  resources: TalkResource[]
}

export const talks: Talk[] = [
  {
    slug: "mcp-dev-summit",
    title:
      "Building MARVIN: What Teaching a Non-Technical Marketer to Use MCP Taught Me About AI Adoption",
    event: "MCP Dev Summit North America 2026",
    date: "April 2, 2026",
    location: "New York",
    status: "upcoming",
    links: {
      feedback: "https://sfeedback.com/bB4JAV",
      repo: {
        label: "MARVIN Template on GitHub",
        url: "https://github.com/SterlingChin/marvin-template",
      },
    },
    resources: [
      { label: "Slides", url: null, icon: "📄" },
      { label: "Video", url: null, icon: "🎥" },
      { label: "Blog", url: null, icon: "📝" },
    ],
  },
]

export function getTalkBySlug(slug: string): Talk | undefined {
  return talks.find((t) => t.slug === slug)
}
