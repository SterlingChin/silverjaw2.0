import { Nav } from "@/components/nav"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Work } from "@/components/work"
import { Speaking } from "@/components/speaking"
import { ContentSection } from "@/components/content-section"

export default function Home() {
  return (
    <>
      <Nav />
      <main className="pt-14">
        <Hero />
        <About />
        <Work />
        <Speaking />
        <ContentSection />
      </main>
    </>
  )
}
