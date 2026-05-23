import type { Metadata } from "next"
import { Inter, JetBrains_Mono, Source_Serif_4 } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { BackgroundPaths } from "@/components/ui/background-paths"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" })
const sourceSerif = Source_Serif_4({ subsets: ["latin"], variable: "--font-serif" })

export const metadata: Metadata = {
  metadataBase: new URL("https://sterlingchin.com"),
  title: {
    default: "Sterling Chin",
    template: "%s | Sterling Chin",
  },
  description:
    "Sterling Chin builds tools that make APIs work for AI agents, including MARVIN, Clara, and the Postman plugin for Claude Code.",
  authors: [{ name: "Sterling Chin", url: "https://sterlingchin.com" }],
  creator: "Sterling Chin",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Sterling Chin",
    description:
      "Creator of MARVIN and Clara. Builder of agent-ready API tools, MCP workflows, and the Postman plugin for Claude Code.",
    url: "https://sterlingchin.com",
    siteName: "Sterling Chin",
    type: "website",
    images: [
      {
        url: "/images/sterling-primary.jpg",
        width: 1200,
        height: 630,
        alt: "Sterling Chin",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@SilverJaw82",
    title: "Sterling Chin",
    description:
      "Building tools that make APIs work for AI agents, including MARVIN, Clara, and Postman MCP workflows.",
    images: ["/images/sterling-primary.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
}

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Sterling Chin",
  url: "https://sterlingchin.com",
  image: "https://sterlingchin.com/images/sterling-primary.jpg",
  jobTitle: "Senior Developer Advocate",
  worksFor: {
    "@type": "Organization",
    name: "Postman",
  },
  knowsAbout: [
    "AI agents",
    "Agent-ready APIs",
    "Model Context Protocol",
    "Postman",
    "Claude Code",
    "Developer relations",
  ],
  sameAs: [
    "https://github.com/SterlingChin",
    "https://www.linkedin.com/in/sterlingchin/",
    "https://twitter.com/SilverJaw82",
    "https://bsky.app/profile/sterlingchin.bsky.social",
    "https://open.substack.com/pub/sterlingchin/",
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrainsMono.variable} ${sourceSerif.variable} font-sans antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <BackgroundPaths />
          <div className="relative z-10">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
