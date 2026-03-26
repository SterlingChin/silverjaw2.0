// components/talk-landing.tsx
"use client"

import { motion } from "framer-motion"
import { Star } from "lucide-react"
import { SocialIcons } from "@/components/social-links"
import type { Talk } from "@/data/talks"

function ResourceCard({ icon, label, url }: { icon: string; label: string; url: string | null }) {
  const content = (
    <div
      className={`rounded-lg border px-3 py-4 text-center ${
        url
          ? "border-border cursor-pointer transition-colors hover:border-primary"
          : "border-border/50"
      }`}
    >
      <div className={`text-lg ${url ? "" : "opacity-50"}`}>{icon}</div>
      <div className={`mt-1 text-sm ${url ? "text-foreground" : "text-muted-foreground"}`}>
        {label}
      </div>
      {!url && <div className="mt-0.5 text-[10px] text-muted-foreground/60">Coming Soon</div>}
    </div>
  )

  if (url) {
    return (
      <a href={url} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    )
  }

  return content
}

export function TalkLanding({ talk }: { talk: Talk }) {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-16">
      <motion.div
        className="w-full max-w-lg text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Event badge */}
        <span className="inline-block rounded-full border border-primary/30 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">
          {talk.event}
        </span>

        {/* Talk title */}
        <h1 className="mt-5 text-2xl font-bold leading-tight text-foreground sm:text-3xl">
          {talk.title}
        </h1>

        {/* Subtitle */}
        <p className="mt-3 text-sm text-muted-foreground">
          Sterling Chin · {talk.date} · {talk.location}
        </p>

        {/* Primary CTAs */}
        <div className="mt-8 flex flex-col gap-3">
          {talk.links.feedback && (
            <a
              href={talk.links.feedback}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3.5 text-[15px] font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              <Star className="h-4 w-4" />
              Rate This Session
            </a>
          )}
          {talk.links.repo && (
            <a
              href={talk.links.repo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-lg border border-border px-5 py-3.5 text-[15px] text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              🤖 {talk.links.repo.label}
            </a>
          )}
        </div>

        {/* Resources */}
        {talk.resources.length > 0 && (
          <>
            <div className="my-7 border-t border-border" />
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground/60">
              Resources
            </p>
            <div className="grid grid-cols-3 gap-2">
              {talk.resources.map((r) => (
                <ResourceCard key={r.label} icon={r.icon} label={r.label} url={r.url} />
              ))}
            </div>
          </>
        )}

        {/* Socials */}
        <div className="my-7 border-t border-border" />
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground/60">
          Connect
        </p>
        <SocialIcons className="justify-center" />

        {/* Footer link */}
        <a
          href="/"
          className="mt-8 inline-block text-xs text-muted-foreground/50 transition-colors hover:text-muted-foreground"
        >
          sterlingchin.com
        </a>
      </motion.div>
    </main>
  )
}
