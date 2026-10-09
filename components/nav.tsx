"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { ThemeToggle } from "@/components/theme-toggle"

const navItems = [
  { label: "Building", href: "#sannr" },
  { label: "My story", href: "#about" },
  { label: "Speaking", href: "#speaking" },
  { label: "Writing", href: "#content" },
]

export function Nav() {
  const pathname = usePathname()
  const [activeSection, setActiveSection] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const isHome = pathname === "/"

  useEffect(() => {
    if (!isHome) return
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        }
      },
      { rootMargin: "-20% 0px -65% 0px" }
    )
    document.querySelectorAll("main section[id]").forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [isHome])

  const hrefFor = (hash: string) => isHome ? hash : `/${hash}`

  return (
    <>
      <a href="#main-content" className="fixed left-4 top-4 z-[60] -translate-y-24 rounded-full bg-primary px-5 py-3 text-primary-foreground focus:translate-y-0">Skip to content</a>
      <nav aria-label="Main navigation" className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/95 backdrop-blur-md">
        <div className="site-container flex h-20 items-center justify-between gap-5">
          <Link href={isHome ? "#hero" : "/"} className="display-heading whitespace-nowrap text-xl sm:text-2xl">Sterling Chin<span className="text-primary">.</span></Link>
          <div className="hidden items-center gap-7 md:flex">
            {navItems.map((item) => (
              <Link key={item.href} href={hrefFor(item.href)} aria-current={isHome && activeSection === item.href.slice(1) ? "location" : undefined} className={`text-sm font-semibold transition-colors hover:text-primary ${isHome && activeSection === item.href.slice(1) ? "text-primary" : "text-muted-foreground"}`}>{item.label}</Link>
            ))}
            <ThemeToggle />
            <Link href={hrefFor("#footer")} className="button-secondary min-h-10 px-4 py-2">Say hello</Link>
          </div>
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-11 w-11" aria-label="Open navigation"><Menu aria-hidden="true" className="size-5" /></Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72 px-7 pt-16" aria-describedby={undefined}>
                <SheetTitle className="display-heading text-2xl">Explore</SheetTitle>
                <div className="mt-5 flex flex-col gap-2">
                  {[...navItems, { label: "Say hello", href: "#footer" }].map((item) => (
                    <Link key={item.href} href={hrefFor(item.href)} onClick={() => setIsOpen(false)} className="py-3 text-lg hover:text-primary">{item.label}</Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </>
  )
}
