import { ArrowUpRight } from "lucide-react"

const projects = [
  { title: "MARVIN", label: "Open source", description: "An AI chief of staff for Claude Code. My ongoing exploration of agents, context, and the work that fills a real day.", url: "/marvin" },
  { title: "Clara", label: "API readiness", description: "An agent for evaluating how well APIs work for AI agents, and the foundation for the Postman Claude Code plugin.", url: "/clara" },
  { title: "Postman + Claude Code", label: "Previous work", description: "The official Postman plugin for Claude Code, bringing API development workflows into a coding agent’s tools.", url: "https://github.com/Postman-Devrel/postman-claude-code-plugin" },
]

export function Work() {
  return (
    <section id="work" className="site-container py-14 md:py-20">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-5">
        <div>
          <p className="section-kicker mb-4">Selected work</p>
          <h2 className="display-heading text-3xl sm:text-4xl">The work behind the work.</h2>
        </div>
        <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">Open-source experiments and API tools that shaped how I think about building with agents.</p>
      </div>
      <div className="grid gap-7 border-y border-border py-8 md:grid-cols-3 md:gap-8">
        {projects.map((project) => (
          <a key={project.title} href={project.url} target={project.url.startsWith("https") ? "_blank" : undefined} rel={project.url.startsWith("https") ? "noopener noreferrer" : undefined} className="group">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{project.label}</p>
            <h3 className="mt-3 flex items-center justify-between gap-3 text-xl font-semibold transition-colors group-hover:text-primary">{project.title}<ArrowUpRight className="size-5 shrink-0 text-primary" aria-hidden="true" /></h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{project.description}</p>
          </a>
        ))}
      </div>
    </section>
  )
}
