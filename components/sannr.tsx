import { ArrowUpRight } from "lucide-react"

const lessons = [
  { number: "01", title: "What the docs missed.", detail: "The prerequisites, edge cases, and surprises you find by doing the work." },
  { number: "02", title: "What your team figured out.", detail: "The observations and decisions worth recording for the next integration." },
  { number: "03", title: "A place to pick up again.", detail: "Saved API context beside the code, available to the next developer or agent." },
]

export function Sannr() {
  return (
    <section id="sannr" className="site-container py-12 md:py-16">
      <div className="rounded-[2rem] bg-peach-soft p-7 sm:p-10 lg:p-14">
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4 border-b border-primary/20 pb-5">
          <p className="section-kicker">My focus now</p>
          <a href="https://sannr.dev" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
            sannr.dev <ArrowUpRight aria-hidden="true" className="size-4" />
          </a>
        </div>
        <div className="grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          <div>
            <h2 className="display-heading text-4xl leading-tight sm:text-5xl">API knowledge.<br />Kept with your code.</h2>
            <p className="mt-6 text-lg leading-relaxed">
              Getting an API call to work is only part of the job. There’s also
              everything you learn along the way: the undocumented requirement,
              the unexpected response, the reason one approach worked and another didn’t.
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              I’m building Sannr to give those lessons a home. It keeps API
              observations and recorded gotchas and decisions in your repository,
              where people and coding agents can use them in later work.
              Bring the tools and API context you already have.
            </p>
            <a href="https://sannr.dev" target="_blank" rel="noopener noreferrer" className="button-primary mt-8">
              Explore Sannr <ArrowUpRight aria-hidden="true" className="size-4" />
            </a>
          </div>
          <ol className="flex flex-col justify-center">
            {lessons.map((lesson) => (
              <li key={lesson.number} className="flex gap-5 border-b border-primary/20 py-6 first:pt-0 last:border-0 last:pb-0">
                <span className="pt-1 font-mono text-xs text-primary" aria-hidden="true">{lesson.number}</span>
                <div>
                  <h3 className="display-heading text-2xl leading-tight">{lesson.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{lesson.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
