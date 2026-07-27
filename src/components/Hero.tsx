import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Magnetic from './Magnetic'
import BlobMorph from './BlobMorph'
import { profile } from '../data/portfolio'

gsap.registerPlugin(ScrollTrigger)

const EASE = [0.22, 1, 0.36, 1] as const
const NAME = 'SUKHMANI'.split('')

// A floating stat card: flies in on load, idles with a gentle float.
function FlyCard({
  children, className = '', style, delay = 0, float = 0, started,
}: {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
  delay?: number
  float?: number
  started: boolean
}) {
  return (
    <div className={`absolute ${className}`} style={style}>
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.7 }}
        animate={started ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ duration: 0.9, delay: 0.6 + delay, ease: EASE }}
      >
        <div className="animate-float-slow" style={{ animationDelay: `${float}s`, animationDuration: `${6 + float}s` }}>
          {children}
        </div>
      </motion.div>
    </div>
  )
}

export default function Hero({ started }: { started: boolean }) {
  const ref = useRef<HTMLElement>(null)
  const figureRef = useRef<HTMLDivElement>(null)
  const imgOkRef = useRef(true)

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -70])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  // GSAP: name char-reveal + figure entrance
  useEffect(() => {
    if (!started) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      // SUKHMANI — masked char slide-up (GSAP-site style)
      gsap.from('.sk-char', {
        yPercent: 118,
        duration: 1.1,
        ease: 'power4.out',
        stagger: 0.055,
        delay: 0.1,
      })

      // figure rises in
      gsap.from(figureRef.current, { yPercent: 14, opacity: 0, duration: 1.1, ease: 'power3.out', delay: 0.25 })
    }, ref)

    return () => ctx.revert()
  }, [started])

  return (
    <section ref={ref} id="hero" className="relative min-h-[100svh] overflow-hidden">
      {/* eyebrow, top — centred across full width */}
      <motion.p
        style={{ opacity: contentOpacity }}
        className="label absolute top-24 md:top-28 inset-x-0 z-40 text-center"
        initial={{ opacity: 0, y: -10 }}
        animate={started ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.3, duration: 0.7 }}
      >
        Marketing Leader · India → Sydney
      </motion.p>

      {/* giant name behind the figure — GSAP masked char reveal */}
      <motion.h1
        style={{ y: contentY, opacity: contentOpacity }}
        className="absolute inset-x-0 top-[17%] md:top-[19%] z-10 text-center font-display font-bold text-ivory pointer-events-none select-none px-2"
      >
        <span
          className="inline-block overflow-hidden align-bottom leading-[0.9]"
          style={{ fontSize: 'clamp(3rem, 13vw, 13rem)', letterSpacing: '-0.045em' }}
        >
          {NAME.map((c, i) => (
            <span key={i} className="sk-char inline-block will-change-transform">{c}</span>
          ))}
        </span>
      </motion.h1>

      {/* cut-out figure — bottom-anchored (standing) */}
      <div className="absolute inset-x-0 bottom-0 z-20 flex justify-center items-end pointer-events-none">
        <div ref={figureRef} style={{ transformOrigin: 'bottom center', marginLeft: '4%' }}>
          <div style={{ height: 'clamp(360px, 78vh, 760px)' }} className="flex items-end justify-center">
            <img
              src="/portrait.png"
              alt={`${profile.name} — ${profile.title}`}
              className="h-full w-auto max-w-[94vw] object-contain object-bottom"
              style={{ filter: 'grayscale(1) contrast(1.06) drop-shadow(0 30px 60px rgba(0,0,0,0.6))' }}
              onError={(e) => {
                if (imgOkRef.current) {
                  imgOkRef.current = false
                  ;(e.currentTarget as HTMLImageElement).style.display = 'none'
                }
              }}
            />
          </div>
        </div>
      </div>

      {/* liquid melt — rises over the figure as the hero scrolls out */}
      <BlobMorph triggerRef={ref} />

      {/* — floating cards, hovering on the sides — */}
      <motion.div style={{ opacity: contentOpacity, y: contentY }} className="absolute inset-0 z-30 pointer-events-none">
        {/* 9+ years — upper-left */}
        <FlyCard started={started} delay={0.05} float={0.8} className="left-[3%] md:left-[7%] top-[30%] pointer-events-auto">
          <div className="liquid-glass-strong rounded-2xl px-5 py-4 text-center rotate-[-5deg]" style={{ borderTop: '3px solid var(--violet)' }}>
            <div className="font-display font-bold text-3xl md:text-4xl text-ivory leading-none">9+</div>
            <div className="label mt-1.5 !text-[9px]">Years leading</div>
          </div>
        </FlyCard>

        {/* 5 markets — upper-right */}
        <FlyCard started={started} delay={0.18} float={1.2} className="right-[3%] md:right-[8%] top-[27%] pointer-events-auto">
          <div className="liquid-glass-strong rounded-2xl px-5 py-4 text-center rotate-[5deg]" style={{ borderTop: '3px solid var(--lavender)' }}>
            <div className="font-display font-bold text-3xl md:text-4xl text-ivory leading-none">5</div>
            <div className="label mt-1.5 !text-[9px]">Global markets</div>
          </div>
        </FlyCard>

        {/* OOH thumb — lower-left */}
        <FlyCard started={started} delay={0.28} float={0.6} className="left-[2%] md:left-[6%] bottom-[26%] hidden sm:block pointer-events-auto">
          <div className="liquid-glass-strong rounded-2xl p-2 w-[150px] md:w-[190px] rotate-[-6deg]">
            <div className="rounded-xl overflow-hidden aspect-[16/10]">
              <img src="https://lalitbhardwaj.in/img/portfolio/ooh/banner_design.jpg" alt="OOH campaign" loading="lazy" className="w-full h-full object-cover" />
            </div>
            <p className="label mt-2 px-1 !text-[8px]">OOH · Square Yards</p>
          </div>
        </FlyCard>

        {/* 3,00,000+ — lower-right */}
        <FlyCard started={started} delay={0.22} float={1.0} className="right-[3%] md:right-[6%] bottom-[28%] pointer-events-auto">
          <div className="liquid-glass-strong rounded-2xl px-5 py-4 text-center rotate-[6deg]" style={{ borderTop: '3px solid var(--coral)' }}>
            <div className="font-display font-bold text-2xl md:text-3xl text-ivory leading-none">3,00,000+</div>
            <div className="label mt-1.5 !text-[9px]">Interactions</div>
          </div>
        </FlyCard>
      </motion.div>

      {/* availability pill (bottom-left) + CTA (bottom-centre) */}
      <motion.div style={{ opacity: contentOpacity }} className="absolute left-[3%] md:left-[6%] bottom-[8%] z-40">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={started ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1, duration: 0.7 }}
          className="flex items-center gap-2 liquid-glass-strong rounded-full px-4 py-2.5 text-ivory text-xs font-medium whitespace-nowrap shadow-pop"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-70" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-gold" />
          </span>
          Open to opportunities · Sydney 2026
        </motion.span>
      </motion.div>

    </section>
  )
}
