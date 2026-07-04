import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

// Counts from 0 to a target number when scrolled into view.
// Non-numeric values (e.g. "MBA") render as-is.
export default function CountUp({
  value,
  duration = 1400,
}: {
  value: string
  duration?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const match = value.match(/^(\d+)(.*)$/)
  const target = match ? parseInt(match[1], 10) : null
  const suffix = match ? match[2] : ''
  const [display, setDisplay] = useState(target === null ? value : '0')

  useEffect(() => {
    if (!inView || target === null) return
    let raf = 0
    let startTs: number | null = null
    const step = (ts: number) => {
      if (startTs === null) startTs = ts
      const t = Math.min((ts - startTs) / duration, 1)
      const eased = 1 - Math.pow(1 - t, 3) // easeOutCubic
      setDisplay(String(Math.round(eased * target)) + suffix)
      if (t < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [inView, target, suffix, duration])

  return <span ref={ref}>{display}</span>
}
