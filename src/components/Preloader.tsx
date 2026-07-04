import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Load sequence: black → grain fades in globally → "S" monogram draws on
// → wordmark fades → curtain lifts and hands off to the hero stagger.
export default function Preloader({ onDone }: { onDone: () => void }) {
  const [gone, setGone] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => {
      setGone(true)
      // let the exit transition play before starting the hero
      setTimeout(onDone, 500)
    }, 2100)
    return () => clearTimeout(t)
  }, [onDone])

  return (
    <AnimatePresence>
      {!gone && (
        <motion.div
          className="fixed inset-0 z-[10000] bg-midnight flex flex-col items-center justify-center gap-6"
          exit={{ y: '-100%' }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <svg width="72" height="72" viewBox="0 0 72 72" fill="none" aria-hidden>
            <motion.circle
              cx="36" cy="36" r="33"
              stroke="#C9A96E" strokeWidth="1" strokeDasharray="4 7"
              initial={{ pathLength: 0, rotate: -90 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.4, ease: 'easeInOut' }}
            />
            <motion.path
              d="M45 26c-2-3.4-6-5-9.5-5-5 0-9 3-9 7.5 0 4.2 3.3 6 8.6 7.4 5.6 1.5 9.9 3.3 9.9 8.1 0 4.9-4.4 8-9.9 8-4.2 0-8-1.8-10.1-5.4"
              stroke="#F5F0EB" strokeWidth="2" strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.1, delay: 0.35, ease: [0.65, 0, 0.35, 1] }}
            />
          </svg>
          <motion.p
            className="label"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.15, duration: 0.5 }}
          >
            Turning stories into business
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
