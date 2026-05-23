"use client"

import Link from "next/link"
import { ArrowRight, Bot, CheckCircle2, ExternalLink, GitBranch, ShieldCheck } from "lucide-react"

const readinessAreas = [
  "Machine-readable API contracts",
  "Agent-safe authentication",
  "Useful error semantics",
  "Canonical request and response examples",
  "Predictable state-changing operations",
  "Observable agent traffic and audit trails",
  "LLM-readable documentation",
  "Repeatable evaluation workflows",
]

const foundations = [
  {
    title: "Postman Claude Code plugin",
    description:
      "Clara is the foundation for the official Postman Claude Code plugin, bringing API creation, management, testing, and documentation into agentic developer workflows.",
    href: "https://github.com/Postman-Devrel/postman-claude-code-plugin",
  },
  {
    title: "API readiness agent",
    description:
      "Clara checks whether an API gives agents the contracts, examples, guardrails, errors, and observability they need to operate reliably.",
  },
  {
    title: "Agentic workflow layer",
    description:
      "Clara turns Postman collections, MCP patterns, and Claude Code workflows into a practical readiness model for teams shipping APIs to agents.",
  },
]

export function ClaraPage() {
  return (
    <main className="pt-14">
      <section className="px-6 py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div className="pt-2">
            <Link
              href="/"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Sterling Chin
            </Link>
            <p className="mt-8 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              Clara
            </p>
            <h1 className="mt-4 text-4xl font-bold leading-tight text-foreground sm:text-5xl">
              The API-readiness agent behind Postman&apos;s Claude Code plugin.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground">
              Clara is the foundation for the Postman Claude Code plugin and the agent
              that checks whether APIs are ready for AI agents. It looks beyond whether
              an endpoint works and evaluates whether an agent can safely discover, call,
              debug, and improve the API in real workflows.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="https://github.com/Postman-Devrel/postman-claude-code-plugin"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
              >
                View the plugin
                <ExternalLink className="h-4 w-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/sterlingchin/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-border bg-background px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary"
              >
                Talk API readiness
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>

          <section
            aria-label="What Clara evaluates"
            className="rounded-lg border border-border bg-card p-5 shadow-sm sm:p-6"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-accent text-accent-foreground">
                <Bot className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-foreground">API readiness model</h2>
                <p className="text-sm text-muted-foreground">
                  The signals Clara uses to judge agent usability.
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-3">
              {readinessAreas.map((area) => (
                <div
                  key={area}
                  className="flex items-start gap-3 rounded-md border border-border bg-background p-3"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <p className="text-sm font-medium text-foreground">{area}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </section>

      <section className="border-y border-border bg-muted/40 px-6 py-16">
        <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-3">
          {foundations.map((item) => {
            const content = (
              <>
                <div className="flex items-center gap-3">
                  {item.href ? (
                    <GitBranch className="h-5 w-5 text-primary" />
                  ) : (
                    <ShieldCheck className="h-5 w-5 text-primary" />
                  )}
                  <h2 className="text-lg font-bold text-foreground">{item.title}</h2>
                </div>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {item.description}
                </p>
              </>
            )

            if (item.href) {
              return (
                <a
                  key={item.title}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg border border-border bg-card p-5 transition-colors hover:border-primary"
                >
                  {content}
                </a>
              )
            }

            return (
              <div key={item.title} className="rounded-lg border border-border bg-card p-5">
                {content}
              </div>
            )
          })}
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-6xl rounded-lg border border-border bg-card p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            Positioning
          </p>
          <h2 className="mt-3 text-2xl font-bold text-foreground">
            Clara is not a website checker.
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">
            The website-readiness audit is a separate tool. Clara is the API-readiness
            agent: the underlying system for evaluating whether APIs, docs, collections,
            and workflows are ready for AI agents and Claude Code.
          </p>
        </div>
      </section>
    </main>
  )
}
