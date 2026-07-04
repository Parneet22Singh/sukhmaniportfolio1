import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export interface MasonryImage {
  url: string
  caption: string
}

interface Props {
  images: MasonryImage[]
  accent?: string
  columns?: string // tailwind columns classes
}

// Black-and-white masonry grid. On hover an image blooms into full colour
// and zooms in, with an accent ring and its caption sliding up.
export default function MasonryGallery({
  images,
  accent = '#ffffff',
  columns = 'columns-1 sm:columns-2 lg:columns-3',
}: Props) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <div ref={ref} className={`${columns} gap-4 [column-fill:_balance]`}>
      {images.map((img, i) => (
        <motion.figure
          key={img.url + i}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: (i % 4) * 0.08, ease: [0.22, 1, 0.36, 1] }}
          data-cursor="hover"
          className="group relative mb-4 break-inside-avoid overflow-hidden rounded-2xl bg-white/5"
          style={{ ['--accent' as string]: accent }}
        >
          <img
            src={img.url}
            alt={img.caption}
            loading="lazy"
            className="w-full h-auto align-middle grayscale contrast-[1.05] brightness-90
                       scale-100 transition-all duration-700 ease-out
                       group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-[1.12]"
          />

          {/* Dim veil that clears on hover */}
          <div className="pointer-events-none absolute inset-0 bg-black/30 transition-opacity duration-500 group-hover:opacity-0" />

          {/* Accent ring on hover */}
          <div
            className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{ boxShadow: `inset 0 0 0 1.5px ${accent}` }}
          />

          {/* Caption */}
          <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 p-4 md:p-5">
            <div className="translate-y-3 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
              <span
                className="inline-block h-[3px] w-8 mb-2 rounded-full"
                style={{ background: accent }}
              />
              <p className="text-white text-sm md:text-base leading-snug drop-shadow-lg">
                {img.caption}
              </p>
            </div>
          </figcaption>
        </motion.figure>
      ))}
    </div>
  )
}
