import { lazy, Suspense, useRef } from 'react'
import { motion, useScroll, useTransform, type Variants } from 'framer-motion'
import Magnetic from './Magnetic'

const VectorField = lazy(() => import('./VectorField'))

const word: Variants = {
  hidden: { y: 60, opacity: 0 },
  show: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: { duration: 0.9, delay: 0.15 + i * 0.08, ease: [0.215, 0.61, 0.355, 1] },
  }),
}

// Asymmetric cinematic hero: headline anchored lower-left-third,
// subtext offset right-mid, CTA bottom-left. Ambient film + gold mesh behind.
export default function Hero({ started }: { started: boolean }) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', '30% start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, -100])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])

  return (
    <section ref={ref} id="hero" className="relative h-[100svh] overflow-hidden">
      {/* — background stack — */}
      {/* Higgsfield: liquid gold ink blooming through midnight water */}
      <video
        className="absolute inset-0 w-full h-full object-cover opacity-40"
        src="/hero-ink.mp4"
        autoPlay muted loop playsInline
        aria-hidden
      />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(10,10,15,.72) 0%, rgba(26,26,36,.55) 40%, rgba(45,27,46,.5) 70%, rgba(15,26,46,.72) 100%)' }} />
      <div className="absolute inset-y-0 right-0 w-full md:w-3/5">
        <Suspense fallback={null}>
          <VectorField />
        </Suspense>
      </div>
      <div className="backdrop-vignette absolute inset-0" />

      {/* — content plane — */}
      <motion.div style={{ y, opacity }} className="relative z-10 h-full">
        {/* label, top-left */}
        <motion.p
          className="label absolute top-24 md:top-32 left-6 md:left-12"
          initial={{ opacity: 0 }}
          animate={started ? { opacity: 1 } : {}}
          transition={{ delay: 0.1, duration: 0.8 }}
        >
          Marketing Leader — India → Sydney
        </motion.p>

        {/* subheadline, offset right-mid */}
        <motion.div
          className="absolute right-6 md:right-[12%] top-[34%] max-w-[320px]"
          initial={{ opacity: 0, y: 24 }}
          animate={started ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.9, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="w-8 h-px bg-gold mb-5" />
          <p className="text-fog text-base md:text-lg leading-relaxed">
            Award-winning campaigns for brands that refuse to be ordinary. Nine years. Five markets. One obsession — attention that converts.
          </p>
        </motion.div>

        {/* headline, lower-left-third */}
        <motion.h1
          className="absolute left-6 md:left-12 bottom-[22%] md:bottom-[18%] font-display font-semibold text-ivory"
          style={{ fontSize: 'clamp(3.4rem, 11vw, 11rem)', lineHeight: 0.9, letterSpacing: '-0.04em' }}
          initial="hidden"
          animate={started ? 'show' : 'hidden'}
        >
          {['Turning', 'Stories', 'into Business.'].map((w, i) => (
            <span key={w} className="block overflow-hidden">
              <motion.span
                custom={i}
                variants={word}
                className={`block animate-breathe ${i === 1 ? 'text-gold' : ''}`}
                style={{ animationDelay: `${i * 1.2}s` }}
              >
                {w}
              </motion.span>
            </span>
          ))}
        </motion.h1>

        {/* CTA, bottom-left */}
        <motion.div
          className="absolute left-6 md:left-12 bottom-[8%]"
          initial={{ opacity: 0, y: 30 }}
          animate={started ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <Magnetic>
            <button
              onClick={() => document.querySelector('#work')?.scrollIntoView({ behavior: 'smooth' })}
              className="label-gold border border-gold rounded-full px-8 py-4 hover:bg-gold hover:!text-midnight transition-all duration-400"
            >
              Explore the Work
            </button>
          </Magnetic>
        </motion.div>

        {/* scroll cue, bottom-right */}
        <motion.div
          className="absolute right-6 md:right-12 bottom-[8%] hidden md:flex items-center gap-3"
          initial={{ opacity: 0 }}
          animate={started ? { opacity: 1 } : {}}
          transition={{ delay: 1.6, duration: 1 }}
        >
          <span className="label">Scroll</span>
          <motion.span
            className="block w-px h-10 bg-gradient-to-b from-gold to-transparent"
            animate={{ scaleY: [0, 1, 0], originY: [0, 0, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
