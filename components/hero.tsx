"use client"

import { motion } from "framer-motion"
import { ArrowRight, ChevronDown } from "lucide-react"
import { SocialIcons } from "@/components/social-links"

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col justify-center px-6"
    >
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold leading-tight text-foreground sm:text-5xl lg:text-6xl">
            I build tools that make{" "}
            <span className="text-primary">APIs work for AI agents.</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            Sterling Chin — Creator of{" "}
            <a
              href="https://github.com/SterlingChin/marvin-template"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              MARVIN
            </a>
            , the open-source AI chief of staff. Builder of Clara, the API-readiness
            agent that became the foundation for the Postman Claude Code plugin.
            24+ conference talks.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="/marvin"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              Meet MARVIN
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="/clara"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-border bg-background px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              Meet Clara
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
          <SocialIcons className="mt-8" />
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ChevronDown className="h-6 w-6 text-muted-foreground" />
        </motion.div>
      </div>
    </section>
  )
}
