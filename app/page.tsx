import { Nav } from "@/components/nav"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Work } from "@/components/work"

export default function Home() {
  return (
    <>
      <Nav />
      <main className="pt-14">
        <Hero />
        <About />
        <Work />
        <section id="speaking" className="py-24" />
        <section id="content" className="py-24" />
      </main>
    </>
  )
}
