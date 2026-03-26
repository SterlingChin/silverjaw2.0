"use client"

import { motion } from "framer-motion"
import { socialLinks } from "@/components/social-links"

export function Footer() {
  return (
    <footer id="footer" className="px-6 py-24">
      <motion.div
        className="mx-auto max-w-5xl text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-foreground">
          Let&apos;s connect.
        </h2>
        <p className="mt-2 text-muted-foreground">
          Find me on these platforms or reach out directly.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md border border-border bg-background px-4 py-2 text-sm text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              {link.label}
            </a>
          ))}
        </div>
        <p className="mt-12 text-xs text-muted-foreground">
          &copy; Sterling Chin {new Date().getFullYear()}
        </p>
      </motion.div>
    </footer>
  )
}
