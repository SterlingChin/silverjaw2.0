"use client"

import { motion } from "framer-motion"
import { Star } from "lucide-react"
import { SectionHeader } from "@/components/section-header"

const featuredProjects = [
  {
    title: "MARVIN",
    description:
      "Open-source AI chief of staff that manages email, calendar, Jira, content pipelines, and daily workflows through Claude Code. 930+ GitHub stars. Skills system, mobile relay, daemon architecture.",
    tags: ["Claude Code", "MCP", "Python", "TypeScript"],
    url: "https://github.com/SterlingChin/marvin-template",
    stars: 930,
  },
  {
    title: "Postman Plugin for Claude Code",
    description:
      "Designed and shipped the official Postman plugin for Claude Code. AI agents can create, manage, test, and document APIs through conversation. Built on Postman's first MCP server, Claude Code skills, and the Learning Center's documentation layer.",
    tags: ["MCP", "Claude Code", "TypeScript", "Plugin SDK"],
    url: "https://github.com/Postman-Devrel/cursor-postman-plugin",
  },
]

const supportingProjects = [
  {
    title: "AI Council Co-Chair",
    description: "Industry analysis, POCs, shipped products.",
  },
  {
    title: "Clara",
    description: "AI agent that grades APIs on agent-readiness.",
  },
  {
    title: "Postman Cursor Rules",
    description: "Open-source rules for API-first development.",
  },
]

export function Work() {
  return (
    <section id="work" className="px-6 py-24">
      <motion.div
        className="mx-auto max-w-5xl"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
      >
        <SectionHeader label="Work" />

        {/* Featured projects */}
        <div className="grid gap-4 md:grid-cols-2">
          {featuredProjects.map((project) => (
            <a
              key={project.title}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative rounded-xl border border-primary bg-card p-6 transition-colors hover:border-primary/80"
            >
              <span className="absolute -top-2 right-4 rounded bg-primary px-3 py-0.5 text-xs font-bold uppercase tracking-wider text-primary-foreground">
                Featured
              </span>
              <div className="flex items-center gap-3">
                <h3 className="text-xl font-bold text-foreground">
                  {project.title}
                </h3>
                {project.stars && (
                  <span className="flex items-center gap-1 rounded-full bg-accent px-2.5 py-0.5 text-xs font-medium text-accent-foreground">
                    <Star className="h-3 w-3 fill-current" />
                    {project.stars}+
                  </span>
                )}
              </div>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                {project.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded bg-accent px-3 py-1 text-xs font-medium text-accent-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>

        {/* Supporting projects */}
        <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {supportingProjects.map((project) => (
            <div
              key={project.title}
              className="rounded-lg border border-border bg-card p-4"
            >
              <h4 className="font-semibold text-foreground">{project.title}</h4>
              <p className="mt-1 text-sm text-muted-foreground">
                {project.description}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
