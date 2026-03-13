"use client"

import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"
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
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            Sterling Chin — Senior Developer Advocate at Postman. AI Council
            Co-Chair. 24+ conference talks. Creator of the official Postman
            plugin for Claude Code.
          </p>
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
