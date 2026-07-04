import { motion, useScroll, useSpring } from 'framer-motion'

// Film grain + a 1px gold scroll-progress hairline at the very top.
export default function Atmosphere() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })

  return (
    <>
      <div className="grain-overlay" aria-hidden />
      <motion.div
        aria-hidden
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-px z-[9997] origin-left bg-gold/70"
      />
    </>
  )
}
