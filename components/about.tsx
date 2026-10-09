import Image from "next/image"

export function About() {
  return (
    <section id="about" className="site-container grid items-center gap-12 py-20 md:grid-cols-2 lg:gap-20">
      <div className="grid grid-cols-2 gap-4">
        <figure>
          <div className="relative aspect-[3/4] overflow-hidden rounded-[1.5rem]">
            <Image src="/images/sterling-studio.jpg" alt="Sterling recording at Postman Studio" fill sizes="(min-width: 768px) 240px, 45vw" className="photo-wash object-cover" />
          </div>
          <figcaption className="mt-3 text-xs text-muted-foreground">Making the technical approachable.</figcaption>
        </figure>
        <figure className="pt-12">
          <div className="relative aspect-[3/4] overflow-hidden rounded-[1.5rem]">
            <Image src="/images/meetup-runmcp.jpg" alt="Sterling at an Agents & APIs meetup in San Francisco" fill sizes="(min-width: 768px) 240px, 45vw" className="photo-wash object-cover" />
          </div>
          <figcaption className="mt-3 text-xs text-muted-foreground">Learning with other builders.</figcaption>
        </figure>
      </div>
      <div>
        <p className="section-kicker mb-5">How I got here</p>
        <h2 className="display-heading text-3xl leading-tight sm:text-4xl">A coding bootcamp.<br />A lot of building.<br />Now, my own company.</h2>
        <p className="mt-6 text-lg leading-relaxed">
          I got into tech through a coding bootcamp, shipped software at startups
          and enterprises, and went on to lead the Labs team at Postman before
          moving into developer advocacy.
        </p>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          Building <a className="text-link" href="/marvin">MARVIN</a>, my open-source
          AI chief of staff, gave me a place to explore what agents need to be
          useful in everyday work. My work on API tools and MCP kept bringing me
          back to the same question: what context does the next person or agent need?
        </p>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          That’s the question I’m working on as the founder of Sannr. I write,
          build, and speak about what I’m learning along the way.
        </p>
      </div>
    </section>
  )
}
