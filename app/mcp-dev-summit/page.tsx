// app/mcp-dev-summit/page.tsx
import { getTalkBySlug } from "@/data/talks"
import { TalkLanding } from "@/components/talk-landing"
import { notFound } from "next/navigation"

export const metadata = {
  title: "Building MARVIN | MCP Dev Summit 2026 - Sterling Chin",
  description:
    "Talk resources, session feedback, and links from Sterling Chin's MCP Dev Summit 2026 session.",
  openGraph: {
    title: "Building MARVIN | MCP Dev Summit 2026",
    description:
      "What Teaching a Non-Technical Marketer to Use MCP Taught Me About AI Adoption",
  },
}

export default function MCPDevSummitPage() {
  const talk = getTalkBySlug("mcp-dev-summit")
  if (!talk) notFound()
  return <TalkLanding talk={talk} />
}
