import { ArrowUpRight } from "lucide-react"
import { socialLinks } from "@/components/social-links"

export function Footer() {
  return (
    <footer id="footer" className="site-container pb-8 pt-14">
      <div className="relative overflow-hidden rounded-[2rem] bg-sage-soft p-8 sm:p-12 lg:p-16">
        <div aria-hidden="true" className="absolute -bottom-28 -right-16 size-80 rounded-full bg-sage/15" />
        <div className="relative">
          <p className="section-kicker mb-4">Let’s compare notes</p>
          <h2 className="display-heading text-4xl leading-tight sm:text-5xl">What are you building?</h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
            If you’re working with APIs and agents, building a company, or putting
            together an event, I’d like to hear about it.
          </p>
          <a href="https://www.linkedin.com/in/sterlingchin/" target="_blank" rel="noopener noreferrer" className="button-primary mt-7">Say hello on LinkedIn <ArrowUpRight className="size-4" aria-hidden="true" /></a>
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
            {socialLinks.filter((link) => link.label !== "LinkedIn").map((link) => (
              <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold underline-offset-4 hover:text-primary hover:underline">{link.label}</a>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-8 flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Sterling Chin</p>
        <p>Founder of Sannr. Always building.</p>
      </div>
    </footer>
  )
}
