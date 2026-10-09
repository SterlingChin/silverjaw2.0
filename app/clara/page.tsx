import type { Metadata } from "next"
import { ClaraPage } from "@/components/clara-page"
import { Footer } from "@/components/footer"
import { Nav } from "@/components/nav"

const pageUrl = "https://sterlingchin.com/clara"

export const metadata: Metadata = {
  title: "Clara API Readiness Agent",
  description:
    "Clara is the API-readiness agent behind Postman's Claude Code plugin, checking whether APIs are ready for AI agents.",
  alternates: {
    canonical: "/clara",
  },
  openGraph: {
    title: "Clara API Readiness Agent",
    description:
      "The foundation for Postman's Claude Code plugin and the agent that checks APIs for AI readiness.",
    url: pageUrl,
    type: "website",
    images: [
      {
        url: "/images/postman-plugin-api-ai-check.gif",
        width: 1854,
        height: 1080,
        alt: "Postman Claude Code plugin analyzing an API for AI readiness",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Clara API Readiness Agent",
    description:
      "Clara checks whether APIs, docs, collections, and workflows are ready for AI agents.",
    images: ["/images/postman-plugin-api-ai-check.gif"],
  },
}

const claraJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Clara",
  url: pageUrl,
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Web",
  creator: {
    "@type": "Person",
    "@id": "https://sterlingchin.com/#person",
    name: "Sterling Chin",
    url: "https://sterlingchin.com",
    sameAs: [
      "https://github.com/SterlingChin",
      "https://www.linkedin.com/in/sterlingchin/",
      "https://twitter.com/SilverJaw82",
    ],
  },
  sameAs: [
    "https://github.com/Postman-Devrel/postman-claude-code-plugin#api-readiness-analyzer",
  ],
  subjectOf: {
    "@type": "SoftwareSourceCode",
    name: "Postman Claude Code Plugin",
    codeRepository: "https://github.com/Postman-Devrel/postman-claude-code-plugin",
    programmingLanguage: ["Markdown", "MCP"],
  },
  featureList: [
    "48 readiness checks",
    "8 readiness pillars",
    "0-100 API readiness score",
    "Critical failure detection",
    "Prioritized remediation recommendations",
  ],
  description:
    "Clara is an API-readiness agent and foundation for the Postman Claude Code plugin.",
}

export default function ClaraRoute() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(claraJsonLd) }}
      />
      <Nav />
      <ClaraPage />
      <Footer />
    </>
  )
}
