"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { SectionHeader } from "@/components/section-header"

const stats = [
  { value: "24+", label: "Conferences" },
  { value: "9", label: "Cities" },
  { value: "5K+", label: "LinkedIn" },
  { value: "1", label: "Plugin Shipped" },
]

export function About() {
  return (
    <section id="about" className="px-6 py-24">
      <motion.div
        className="mx-auto max-w-5xl"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
      >
        <SectionHeader label="About" />

        <div className="flex items-start gap-5">
          <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-full border-2 border-primary">
            <Image
              src="/images/sterling-primary.jpg"
              alt="Sterling Chin"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <p className="text-foreground leading-relaxed">
              I co-chair Postman&apos;s AI Council, where we turn proof-of-concepts
              into shipped products. I created Postman&apos;s first MCP server, built
              Claude Code skills for API development, and launched the official
              Postman plugin for Claude Code.
            </p>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              I came into tech through a coding bootcamp. Before DevRel, I was an
              Engineering Manager at Postman leading the Labs team. Before that, I
              spent years shipping software across startups and enterprise.
            </p>
          </div>
        </div>

        {/* Stats bar */}
        <div className="mt-10 grid grid-cols-2 border-t border-border md:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="border-b border-border px-4 py-5 text-center md:border-b-0 md:border-r md:last:border-r-0"
            >
              <div className="text-2xl font-bold text-primary">{stat.value}</div>
              <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
