// components/speaking.tsx
"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { SectionHeader } from "@/components/section-header"
import { talks } from "@/data/talks"

const speakingPhotos = [
  { src: "/images/ms_build_24.jpg", caption: "Microsoft Build '24", tall: true },
  { src: "/images/shift_24.jpg", caption: "Shift '24", tall: false },
  { src: "/images/api_world_24.jpg", caption: "API World '24", tall: false },
  { src: "/images/conference-error-semantics.jpg", caption: "Rich Error Semantics", tall: true },
  { src: "/images/conexion24.jpg", caption: "Conexion '24", tall: false },
  { src: "/images/ai_big_data_panel_24.jpeg", caption: "AI & Big Data Expo '24", tall: false },
]

const upcomingTalks = talks.filter((t) => t.status === "upcoming")

export function Speaking() {
  return (
    <section id="speaking" className="px-6 py-24">
      <motion.div
        className="mx-auto max-w-5xl"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
      >
        <SectionHeader label="Speaking" subtitle="24+ conferences worldwide" />

        {/* Upcoming talks */}
        {upcomingTalks.length > 0 && (
          <div className="mb-8 flex flex-col gap-3">
            {upcomingTalks.map((talk) => (
              <Link
                key={talk.slug}
                href={`/${talk.slug}`}
                className="group flex items-center justify-between rounded-lg border border-border bg-background p-4 transition-colors hover:border-primary"
              >
                <div className="min-w-0">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-primary">
                    {talk.event}
                  </span>
                  <h3 className="mt-1 line-clamp-2 text-sm font-semibold text-foreground">
                    {talk.title}
                  </h3>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {talk.date} · {talk.location}
                  </p>
                </div>
                <ArrowRight className="ml-4 h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
              </Link>
            ))}
          </div>
        )}

        {/* Photo grid */}
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2">
          {speakingPhotos.map((photo) => (
            <div
              key={photo.caption}
              className={`group relative overflow-hidden rounded-lg ${
                photo.tall ? "md:col-span-1 lg:row-span-2" : ""
              }`}
            >
              <div className={`relative w-full ${photo.tall ? "h-full min-h-[300px] lg:min-h-full" : "h-48 lg:h-auto lg:aspect-[4/3]"}`}>
                <Image
                  src={photo.src}
                  alt={photo.caption}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
