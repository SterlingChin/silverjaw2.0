"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Brain, CheckCircle2, ExternalLink, Github, PlugZap, Sparkles } from "lucide-react"

const proofPoints = [
  { value: "980+", label: "GitHub stars" },
  { value: "170+", label: "Forks" },
  { value: "8", label: "Core integrations" },
  { value: "3", label: "Extension types" },
]

const capabilities = [
  {
    title: "Session continuity",
    description:
      "MARVIN preserves context across days so work can resume with goals, decisions, and open loops intact.",
  },
  {
    title: "Goal tracking",
    description:
      "A workspace-level state system keeps personal and work goals visible instead of buried in chat history.",
  },
  {
    title: "Daily operating rhythm",
    description:
      "`/start`, `/update`, and `/end` create a repeatable cadence for briefing, checkpointing, and saving context.",
  },
  {
    title: "Extensible by design",
    description:
      "Commands, agents, and skills are plain files that can be added for new workflows without rebuilding the system.",
  },
]

const integrations = [
  "Google Workspace",
  "Microsoft 365",
  "Atlassian",
  "Slack",
  "Linear",
  "Notion",
  "Telegram",
  "Parallel Search",
]

const architecture = [
  "Your private workspace stores profile, goals, state, sessions, and reports.",
  "The template repository stays separate so updates can be pulled without overwriting personal data.",
  "Slash commands turn recurring workflows into repeatable routines.",
  "Specialized agents and skills can be created as lightweight markdown-based capabilities.",
]

export function MarvinPage() {
  return (
    <main id="main-content" className="pt-20">
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
              MARVIN
            </p>
            <h1 className="mt-4 text-4xl font-bold leading-tight text-foreground sm:text-5xl">
              The open-source AI chief of staff for Claude Code.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground">
              MARVIN manages appointments, reads important notifications, remembers
              context, tracks goals, and connects Claude Code to the apps that run your
              day. It is built as a personal operating layer: part assistant, part
              workflow system, part extensible skill framework.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="https://github.com/SterlingChin/marvin-template"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
              >
                View the repo
                <Github className="h-4 w-4" />
              </a>
              <a
                href="https://github.com/SterlingChin/marvin-template#quick-start-with-claude-code"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-border bg-background px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary"
              >
                Quick start
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>

          <section
            aria-label="MARVIN proof"
            className="overflow-hidden rounded-lg border border-border bg-card shadow-sm"
          >
            <Image
              src="/images/home-studio.jpg"
              alt="Sterling's desk setup where MARVIN workflows are built"
              width={1920}
              height={1080}
              className="aspect-video w-full object-cover"
              priority
            />
            <div className="grid grid-cols-2 gap-px bg-border sm:grid-cols-4">
              {proofPoints.map((point) => (
                <div key={point.label} className="bg-card p-4">
                  <p className="text-2xl font-bold text-foreground">{point.value}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.14em] text-muted-foreground">
                    {point.label}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </section>

      <section className="border-y border-border bg-muted/40 px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-center gap-3">
            <Brain className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold text-foreground">What makes MARVIN useful</h2>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {capabilities.map((item) => (
              <div key={item.title} className="rounded-lg border border-border bg-card p-5">
                <h3 className="text-lg font-bold text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2">
          <div className="rounded-lg border border-border bg-card p-6">
            <div className="flex items-center gap-3">
              <PlugZap className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-bold text-foreground">Integrations</h2>
            </div>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              MARVIN connects Claude Code to the services where work actually happens.
            </p>
            <div className="mt-5 grid gap-2 sm:grid-cols-2">
              {integrations.map((integration) => (
                <div
                  key={integration}
                  className="flex items-center gap-2 rounded-md border border-border bg-background p-3 text-sm font-medium text-foreground"
                >
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  {integration}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-border bg-card p-6">
            <div className="flex items-center gap-3">
              <Sparkles className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-bold text-foreground">Architecture</h2>
            </div>
            <div className="mt-5 grid gap-3">
              {architecture.map((item) => (
                <div key={item} className="flex gap-3">
                  <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-primary" />
                  <p className="text-sm leading-6 text-muted-foreground">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 pb-16">
        <div className="mx-auto max-w-6xl rounded-lg border border-border bg-card p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            Why it matters
          </p>
          <h2 className="mt-3 text-2xl font-bold text-foreground">
            MARVIN turns Claude Code from a coding assistant into a continuity system.
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">
            The core idea is simple: your agent should know what matters, remember what
            happened, and carry useful context across tools and sessions. MARVIN makes
            that concrete with state files, daily commands, integrations, and a pattern
            for adding new skills as your workflow changes.
          </p>
        </div>
      </section>
    </main>
  )
}
