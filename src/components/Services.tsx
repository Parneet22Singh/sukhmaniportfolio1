import { useRef, type ReactNode } from 'react'
import { motion, useInView } from 'framer-motion'
import { ambientVideos } from '../data/portfolio'

const ease = [0.22, 1, 0.36, 1] as const

function Moment({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-12% 0px' })
  return (
    <motion.div
      ref={ref}
      className={`relative ${className}`}
      initial="hidden"
      animate={inView ? 'show' : 'hidden'}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
    >
      {children}
    </motion.div>
  )
}

const child = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
}

// Giant ghost number behind each moment
function Ghost({ n, className = '' }: { n: string; className?: string }) {
  return (
    <span
      aria-hidden
      className={`absolute font-display font-bold text-ivory/[0.04] select-none pointer-events-none leading-none ${className}`}
      style={{ fontSize: '20vw' }}
    >
      {n}
    </span>
  )
}

export default function Services() {
  const revealRef = useRef<HTMLDivElement>(null)
  const revealInView = useInView(revealRef, { once: true, margin: '-20% 0px' })

  return (
    <section className="relative overflow-hidden py-[16vh] px-6 md:px-12">
      <Moment className="text-center mb-[12vh]">
        <motion.p variants={child} className="label">What I Do</motion.p>
      </Moment>

      <div className="max-w-[1500px] mx-auto space-y-[15vh]">

        {/* ——— 01 · STRATEGY — left-aligned 60% ——— */}
        <Moment>
          <Ghost n="01" className="top-[-6vw] right-0" />
          <div className="md:w-[60%] relative z-10">
            <motion.p variants={child} className="label-gold mb-6">Strategy</motion.p>
            <motion.h3
              variants={child}
              className="font-display font-semibold text-ivory"
              style={{ fontSize: 'clamp(2.2rem, 4.5vw, 4.5rem)', letterSpacing: '-0.03em', lineHeight: 1 }}
            >
              Strategic Foundations
            </motion.h3>
            <motion.p variants={child} className="mt-7 max-w-[520px] text-fog leading-relaxed">
              Positioning, messaging frameworks and brand governance built from consumer intelligence — a unified voice across digital and offline, from branded podcasts to always-on content.
            </motion.p>
          </div>
          {/* floating glass geometry, right */}
          <motion.div
            variants={child}
            aria-hidden
            className="hidden md:flex absolute right-[6%] top-1/2 -translate-y-1/2 w-44 h-44 items-center justify-center rounded-3xl animate-float-slow"
            style={{ background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            <svg viewBox="0 0 100 100" className="w-24 h-24 animate-spin-slow" fill="none">
              <circle cx="50" cy="50" r="40" stroke="#C9A96E" strokeWidth="0.8" strokeDasharray="5 8" />
              <path d="M50 14 L86 74 L14 74 Z" stroke="#E8D5B7" strokeWidth="0.8" opacity="0.7" />
              <circle cx="50" cy="50" r="6" fill="#C9A96E" opacity="0.5" />
            </svg>
          </motion.div>
        </Moment>

        {/* ——— 02 · STORYTELLING — right-aligned 55% + gold-block film reveal ——— */}
        <Moment className="md:flex md:items-center md:gap-[5%]">
          <Ghost n="02" className="top-[-5vw] left-0" />
          {/* portrait film container, left */}
          <motion.div variants={child} className="relative md:w-[38%] aspect-[3/4] rounded-2xl overflow-hidden shadow-soft mb-12 md:mb-0" ref={revealRef}>
            <video
              className="absolute inset-0 w-full h-full object-cover"
              src={ambientVideos.philosophy}
              autoPlay muted loop playsInline
              aria-hidden
            />
            <div className="absolute inset-0 bg-gradient-to-t from-midnight/60 to-transparent" />
            {/* gold block slides away to reveal */}
            <motion.div
              className="absolute inset-0 bg-gold origin-right z-10"
              initial={{ scaleX: 1 }}
              animate={revealInView ? { scaleX: 0 } : {}}
              transition={{ duration: 1.1, delay: 0.3, ease: [0.76, 0, 0.24, 1] }}
            />
          </motion.div>
          <div className="relative z-10 md:w-[55%] md:text-right md:flex md:flex-col md:items-end">
            <motion.p variants={child} className="label-gold mb-6">Storytelling</motion.p>
            <motion.h3
              variants={child}
              className="font-display font-semibold text-ivory"
              style={{ fontSize: 'clamp(2.2rem, 4.5vw, 4.5rem)', letterSpacing: '-0.03em', lineHeight: 1 }}
            >
              Stories that Sell
            </motion.h3>
            <motion.p variants={child} className="mt-7 max-w-[520px] text-fog leading-relaxed">
              Integrated campaigns spanning OOH, film, influencer, social and events — narratives that turn everyday moments into citywide conversations, and conversations into pipeline.
            </motion.p>
          </div>
        </Moment>

        {/* ——— 03 · IMPACT — centered narrow ——— */}
        <Moment className="text-center">
          <Ghost n="03" className="top-[-7vw] left-1/2 -translate-x-1/2" />
          <div className="relative z-10 max-w-[600px] mx-auto">
            <motion.p variants={child} className="label-gold mb-6">Impact</motion.p>
            <motion.h3
              variants={child}
              className="font-display font-semibold text-ivory"
              style={{ fontSize: 'clamp(2.2rem, 4.5vw, 4.5rem)', letterSpacing: '-0.03em', lineHeight: 1 }}
            >
              Measured Outcomes
            </motion.h3>
            <motion.p variants={child} className="mt-7 text-fog leading-relaxed">
              Dashboards, MIS reporting and ROI analysis behind every idea — marketing that answers to lead conversion, customer acquisition and growth targets, not vanity metrics.
            </motion.p>
            {/* discipline rings */}
            <motion.div variants={child} className="mt-12 flex items-center justify-center gap-6">
              {['ORM', 'BRAND', 'SOCIAL'].map((t) => (
                <div
                  key={t}
                  data-cursor="hover"
                  className="w-24 h-24 rounded-full border border-ivory/15 flex items-center justify-center label !text-ivory/70 transition-all duration-500 hover:border-gold hover:!text-gold hover:shadow-[0_0_40px_rgba(201,169,110,0.25)]"
                >
                  {t}
                </div>
              ))}
            </motion.div>
          </div>
        </Moment>
      </div>
    </section>
  )
}
