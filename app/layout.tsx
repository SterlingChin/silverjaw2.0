import type { Metadata } from "next"
import { Caprasimo, Figtree, JetBrains_Mono, Source_Serif_4 } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

const figtree = Figtree({ subsets: ["latin"], variable: "--font-body" })
const caprasimo = Caprasimo({ weight: "400", subsets: ["latin"], variable: "--font-display" })
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-code" })
const sourceSerif = Source_Serif_4({ subsets: ["latin"], variable: "--font-editorial" })

export const metadata: Metadata = {
  metadataBase: new URL("https://sterlingchin.com"),
  title: {
    default: "Sterling Chin — Founder of Sannr",
    template: "%s | Sterling Chin",
  },
  description:
    "Sterling Chin is the founder of Sannr, an API client for coding agents that keeps recorded API lessons beside the code. Follow his work, writing, and talks.",
  authors: [{ name: "Sterling Chin", url: "https://sterlingchin.com" }],
  creator: "Sterling Chin",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Sterling Chin — Founder of Sannr",
    description:
      "Founder of Sannr. Building an API client for coding agents that keeps recorded lessons beside the code, and sharing what he learns along the way.",
    url: "https://sterlingchin.com",
    siteName: "Sterling Chin",
    type: "website",
    images: [
      {
        url: "/images/sterling-primary.jpg",
        width: 2000,
        height: 2004,
        alt: "Sterling Chin",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@SilverJaw82",
    title: "Sterling Chin — Founder of Sannr",
    description:
      "Founder of Sannr, creator of MARVIN, and builder of tools for people working with AI agents.",
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
  "@id": "https://sterlingchin.com/#person",
  name: "Sterling Chin",
  url: "https://sterlingchin.com",
  image: "https://sterlingchin.com/images/sterling-primary.jpg",
  jobTitle: "Founder",
  description: "Founder of Sannr, creator of MARVIN, and builder of tools for people working with AI agents.",
  worksFor: {
    "@type": "Organization",
    name: "Sannr",
    url: "https://sannr.dev",
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
      <body className={`${figtree.variable} ${caprasimo.variable} ${jetbrainsMono.variable} ${sourceSerif.variable} font-sans antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative z-10">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
