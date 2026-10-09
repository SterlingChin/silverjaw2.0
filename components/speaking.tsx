import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

export function Speaking() {
  return (
    <section id="speaking" aria-labelledby="speaking-heading" className="py-20">
      <div className="site-container grid items-center gap-10 md:grid-cols-2 md:gap-16">
        <figure>
          <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem]">
            <Image
              src="/images/conference-crowd.jpg"
              alt="Sterling speaking to an audience at POST/CON"
              fill
              sizes="(max-width: 767px) 100vw, 50vw"
              className="object-cover object-left saturate-[0.75] contrast-[0.95]"
            />
          </div>
          <figcaption className="mt-3 text-sm text-muted-foreground">
            On stage at POST/CON
          </figcaption>
        </figure>

        <div>
          <p className="section-kicker">Speaking</p>
          <h2
            id="speaking-heading"
            className="display-heading mt-4 text-3xl leading-tight sm:text-4xl lg:text-5xl"
          >
            What I&apos;m learning, shared out loud.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            I give practical talks about API context, MCP, and building AI tools
            people can actually use. The work gives me the stories: what I tried,
            what broke, and what I learned along the way.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
            <Link href="/mcp-dev-summit" className="button-secondary">
              Talks &amp; resources
            </Link>
            <a
              href="https://www.linkedin.com/in/sterlingchin/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-link inline-flex items-center gap-2"
            >
              Invite me to speak
              <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
