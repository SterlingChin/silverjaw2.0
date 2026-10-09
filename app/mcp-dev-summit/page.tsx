// app/mcp-dev-summit/page.tsx
import type { Metadata } from "next"
import { getTalkBySlug } from "@/data/talks"
import { TalkLanding } from "@/components/talk-landing"
import { notFound } from "next/navigation"

export const metadata: Metadata = {
  title: "Building MARVIN | MCP Dev Summit 2026",
  description:
    "Talk resources, session feedback, and links from Sterling Chin's MCP Dev Summit 2026 session.",
  alternates: {
    canonical: "/mcp-dev-summit",
  },
  openGraph: {
    title: "Building MARVIN | MCP Dev Summit 2026",
    description:
      "What Teaching a Non-Technical Marketer to Use MCP Taught Me About AI Adoption",
    url: "https://sterlingchin.com/mcp-dev-summit",
    type: "website",
    images: [{
      url: "/images/conference-crowd.jpg",
      width: 1200,
      height: 800,
      alt: "Sterling Chin speaking at POST/CON",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Building MARVIN | MCP Dev Summit 2026",
    description:
      "Talk resources from Sterling Chin’s session on MARVIN, MCP, and AI adoption.",
    images: ["/images/conference-crowd.jpg"],
  },
}

export default function MCPDevSummitPage() {
  const talk = getTalkBySlug("mcp-dev-summit")
  if (!talk) notFound()
  return <TalkLanding talk={talk} />
}
