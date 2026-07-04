import { useState } from 'react'

interface Props {
  id: string
  title?: string
  start?: number
  className?: string
}

// Click-to-play YouTube facade: renders a thumbnail + play button and only
// injects the (heavy) iframe once the user clicks. Keeps the page light.
export default function YouTube({ id, title = 'Video', start, className = '' }: Props) {
  const [playing, setPlaying] = useState(false)
  const src = `https://www.youtube.com/embed/${id}?rel=0&modestbranding=1&autoplay=1${
    start ? `&start=${start}` : ''
  }`

  return (
    <div className={`relative w-full aspect-video overflow-hidden rounded-2xl bg-white/5 ${className}`}>
      {playing ? (
        <iframe
          className="absolute inset-0 w-full h-full"
          src={src}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          aria-label={`Play video: ${title}`}
          onClick={() => setPlaying(true)}
          className="group absolute inset-0 w-full h-full cursor-pointer"
        >
          <img
            src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
            srcSet={`https://i.ytimg.com/vi/${id}/hqdefault.jpg 480w, https://i.ytimg.com/vi/${id}/maxresdefault.jpg 1280w`}
            sizes="(max-width: 768px) 100vw, 1000px"
            alt={title}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <span className="absolute inset-0 bg-black/25 transition-colors group-hover:bg-black/10" />
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex h-16 w-16 items-center justify-center rounded-full bg-white/90 shadow-[0_10px_40px_rgba(0,0,0,.45)] transition-transform duration-300 group-hover:scale-110">
            <span className="ml-1 block h-0 w-0 border-y-[10px] border-l-[17px] border-y-transparent border-l-black" />
          </span>
        </button>
      )}
    </div>
  )
}
