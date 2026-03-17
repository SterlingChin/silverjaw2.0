"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { SectionHeader } from "@/components/section-header"

const stats = [
  { value: "930+", label: "GitHub Stars" },
  { value: "24+", label: "Conferences" },
  { value: "9", label: "Cities" },
  { value: "5K+", label: "LinkedIn" },
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
              I built{" "}
              <a
                href="https://github.com/SterlingChin/marvin-template"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                MARVIN
              </a>
              , an open-source AI chief of staff with 930+ GitHub stars. I also
              created Postman&apos;s first MCP server, built Claude Code skills for
              API development, and launched the official Postman plugin for Claude
              Code.
            </p>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              I came into tech through a coding bootcamp. Before DevRel, I was an
              Engineering Manager at Postman leading the Labs team. Before that, I
              spent years shipping software across startups and enterprise.
            </p>
          </div>
        </div>

        {/* Photo grid */}
        <div className="mt-8 grid grid-cols-3 gap-3">
          {[
            { src: "/images/sterling-studio.jpg", alt: "Sterling Chin recording at Postman Studio", label: "Postman Studio", span: 2 },
            { src: "/images/meetup-runmcp.jpg", alt: "Hosting Agents & APIs meetup in San Francisco", label: "SF Meetup", span: 1 },
            { src: "/images/conference-stage.jpg", alt: "Sterling on stage at POST/CON", label: "POST/CON", span: 1 },
            { src: "/images/conference-crowd.jpg", alt: "Speaking to a packed conference hall", label: "POST/CON 24", span: 2 },
          ].map((photo) => (
            <div
              key={photo.src}
              className={`group relative overflow-hidden rounded-lg ${photo.span === 2 ? "col-span-2" : ""}`}
            >
              <div className="relative h-48 w-full">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                <span className="text-xs font-medium text-white">{photo.label}</span>
              </div>
            </div>
          ))}
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
