import { Nav } from "@/components/nav"
import { Hero } from "@/components/hero"

export default function Home() {
  return (
    <>
      <Nav />
      <main className="pt-14">
        <Hero />
        <section id="about" className="py-24" />
        <section id="work" className="py-24" />
        <section id="speaking" className="py-24" />
        <section id="content" className="py-24" />
      </main>
    </>
  )
}
