"use client"

import { Pencil, Play, Code, Newspaper } from "lucide-react"
import { motion } from "framer-motion"
import { SectionHeader } from "@/components/section-header"
import { contentItems, type ContentItem } from "@/data/content"

const typeIcons: Record<ContentItem["type"], React.ElementType> = {
  Blog: Pencil,
  Video: Play,
  Repo: Code,
  Media: Newspaper,
}

export function ContentSection() {
  return (
    <section id="content" className="px-6 py-24">
      <motion.div
        className="mx-auto max-w-5xl"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
      >
        <SectionHeader label="Content" />

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {contentItems.map((item) => {
            const Icon = typeIcons[item.type]
            return (
              <a
                key={item.url}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-lg border border-border bg-card overflow-hidden transition-colors hover:border-primary"
              >
                <div className="flex h-20 items-center justify-center bg-muted">
                  <Icon className="h-8 w-8 text-muted-foreground transition-colors group-hover:text-primary" />
                </div>
                <div className="p-4">
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-primary">
                    {item.type}
                  </span>
                  <h4 className="mt-1 font-semibold text-foreground text-sm leading-snug">
                    {item.title}
                  </h4>
                  <p className="mt-2 text-xs text-muted-foreground">
                    {item.date}
                  </p>
                </div>
              </a>
            )
          })}
        </div>
      </motion.div>
    </section>
  )
}
