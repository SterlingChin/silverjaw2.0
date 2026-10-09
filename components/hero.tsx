import Image from "next/image"
import { ArrowDownRight, ArrowUpRight } from "lucide-react"

export function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden">
      <div className="site-container grid items-center gap-12 py-16 md:grid-cols-[1.3fr_1fr] md:gap-14 md:py-24 lg:py-28">
        <div className="relative z-10">
          <p className="section-kicker mb-6">Sterling Chin · Founder of Sannr</p>
          <h1 className="display-heading max-w-2xl text-[clamp(2.8rem,5.5vw,4.75rem)] leading-[1.08]">
            I’m building Sannr.
            <span className="mt-2 block text-primary">And sharing what I learn.</span>
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Sannr is an API client for coding agents that keeps the API lessons they
            record beside the code, so the next session can build on what the team
            has learned. I’m the founder, and this is where I share the work.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#sannr" className="button-primary">
              What I’m building <ArrowDownRight aria-hidden="true" className="size-4" />
            </a>
            <a href="https://www.linkedin.com/in/sterlingchin/" target="_blank" rel="noopener noreferrer" className="button-secondary">
              Follow along <ArrowUpRight aria-hidden="true" className="size-4" />
            </a>
          </div>
        </div>
        <div className="relative mx-auto w-full max-w-[390px] px-4 pb-8 md:px-0">
          <div aria-hidden="true" className="absolute -right-14 -top-16 size-64 rounded-full bg-sage-soft md:size-80" />
          <div aria-hidden="true" className="absolute -bottom-1 -left-5 size-40 rounded-full bg-peach" />
          <div className="relative aspect-square overflow-hidden rounded-full border-[8px] border-background">
            <Image src="/images/sterling-primary.jpg" alt="Sterling Chin, founder of Sannr" fill priority sizes="(min-width: 768px) 390px, 85vw" className="photo-wash object-cover" />
          </div>
          <p className="relative mt-5 text-center text-sm text-muted-foreground">Engineer by background, Builder at heart.</p>
        </div>
      </div>
    </section>
  )
}
