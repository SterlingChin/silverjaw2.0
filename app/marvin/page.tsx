import type { Metadata } from "next"
import { Footer } from "@/components/footer"
import { MarvinPage } from "@/components/marvin-page"
import { Nav } from "@/components/nav"

const pageUrl = "https://sterlingchin.com/marvin"

export const metadata: Metadata = {
  title: "MARVIN AI Chief of Staff",
  description:
    "MARVIN is Sterling Chin's open-source AI chief of staff for Claude Code, with session continuity, goals, integrations, commands, agents, and skills.",
  alternates: {
    canonical: "/marvin",
  },
  openGraph: {
    title: "MARVIN AI Chief of Staff",
    description:
      "Open-source AI chief of staff for Claude Code with goals, session continuity, integrations, commands, agents, and skills.",
    url: pageUrl,
    type: "website",
    images: [
      {
        url: "/images/home-studio.jpg",
        width: 1920,
        height: 1080,
        alt: "MARVIN AI chief of staff workflow",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MARVIN AI Chief of Staff",
    description:
      "Open-source AI chief of staff for Claude Code with session continuity, goals, integrations, and extensible skills.",
    images: ["/images/home-studio.jpg"],
  },
}

const marvinJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "MARVIN",
  alternateName: "Manages Appointments, Reads Various Important Notifications",
  url: pageUrl,
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Claude Code",
  creator: {
    "@type": "Person",
    name: "Sterling Chin",
    url: "https://sterlingchin.com",
  },
  sameAs: ["https://github.com/SterlingChin/marvin-template"],
  subjectOf: {
    "@type": "SoftwareSourceCode",
    name: "marvin-template",
    codeRepository: "https://github.com/SterlingChin/marvin-template",
    programmingLanguage: ["Markdown", "Shell", "Python", "TypeScript"],
  },
  description:
    "MARVIN is an open-source AI chief of staff for Claude Code that manages goals, sessions, integrations, commands, agents, and skills.",
}

export default function MarvinRoute() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(marvinJsonLd) }}
      />
      <Nav />
      <MarvinPage />
      <Footer />
    </>
  )
}
