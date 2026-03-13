"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { SectionHeader } from "@/components/section-header"

const speakingPhotos = [
  { src: "/images/ms_build_24.jpg", caption: "Microsoft Build '24", tall: true },
  { src: "/images/shift_24.jpg", caption: "Shift '24", tall: false },
  { src: "/images/api_world_24.jpg", caption: "API World '24", tall: false },
  { src: "/images/conexion24.jpg", caption: "Conexion '24", tall: false },
  { src: "/images/ai_big_data_panel_24.jpeg", caption: "AI & Big Data Expo '24", tall: false },
]

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

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2">
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
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                <span className="text-sm font-semibold text-white">
                  {photo.caption}
                </span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
