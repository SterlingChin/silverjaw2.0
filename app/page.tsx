import { Nav } from "@/components/nav"
import { Hero } from "@/components/hero"
import { Sannr } from "@/components/sannr"
import { About } from "@/components/about"
import { Work } from "@/components/work"
import { Speaking } from "@/components/speaking"
import { ContentSection } from "@/components/content-section"
import { Footer } from "@/components/footer"

const profileJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": "https://sterlingchin.com/#profile",
  url: "https://sterlingchin.com/",
  name: "Sterling Chin — Founder of Sannr",
  mainEntity: { "@id": "https://sterlingchin.com/#person" },
}

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profileJsonLd) }}
      />
      <Nav />
      <main id="main-content" className="pt-20">
        <Hero />
        <Sannr />
        <About />
        <Work />
        <Speaking />
        <ContentSection />
      </main>
      <Footer />
    </>
  )
}
