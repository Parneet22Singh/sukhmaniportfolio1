import { useRef, type ReactNode } from 'react'
import { motion, useInView, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { ambientVideos } from '../data/portfolio'

const ease = [0.22, 1, 0.36, 1] as const

// ————— Parallax capsule field (GSAP "data-speed" style drift) —————
type Cap = { top?: string; bottom?: string; left?: string; right?: string; w: number; h: number; grad: string; speed: number; rot: number }
const CAPS: Cap[] = [
  { top: '6%', left: '10%', w: 14, h: 52, grad: 'linear-gradient(160deg,#FF8A4C,#FF3D6E)', speed: 120, rot: -18 },
  { top: '2%', left: '46%', w: 12, h: 40, grad: 'linear-gradient(160deg,#FFB020,#FF5A1E)', speed: -90, rot: 12 },
  { top: '14%', right: '12%', w: 16, h: 60, grad: 'linear-gradient(160deg,#FF5A1E,#A78BFA)', speed: 160, rot: 22 },
  { top: '30%', left: '4%', w: 18, h: 64, grad: 'linear-gradient(160deg,#A78BFA,#FF3D6E)', speed: -140, rot: -10 },
  { top: '40%', right: '5%', w: 12, h: 44, grad: 'linear-gradient(160deg,#FF3D6E,#FF8A4C)', speed: 100, rot: 16 },
  { bottom: '20%', left: '14%', w: 15, h: 50, grad: 'linear-gradient(160deg,#FFB020,#FF8A4C)', speed: -110, rot: 8 },
  { bottom: '10%', left: '40%', w: 11, h: 38, grad: 'linear-gradient(160deg,#FF5A1E,#FFB020)', speed: 130, rot: -14 },
  { bottom: '14%', right: '16%', w: 16, h: 56, grad: 'linear-gradient(160deg,#FF8A4C,#A78BFA)', speed: -160, rot: 20 },
  { top: '52%', left: '22%', w: 10, h: 34, grad: 'linear-gradient(160deg,#FF3D6E,#A78BFA)', speed: 80, rot: -22 },
  { top: '20%', right: '30%', w: 10, h: 32, grad: 'linear-gradient(160deg,#FFB020,#FF5A1E)', speed: -70, rot: 10 },
]

function Capsule({ cap, progress }: { cap: Cap; progress: MotionValue<number> }) {
  const y = useTransform(progress, [0, 1], [cap.speed, -cap.speed])
  return (
    <motion.div
      aria-hidden
      className="absolute rounded-full opacity-80 blur-[0.5px]"
      style={{
        top: cap.top, bottom: cap.bottom, left: cap.left, right: cap.right,
        width: cap.w, height: cap.h, background: cap.grad,
        rotate: `${cap.rot}deg`, y,
        boxShadow: '0 8px 30px rgba(0,0,0,0.35)',
      }}
    />
  )
}

function CapsuleField() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {CAPS.map((c, i) => (
        <Capsule key={i} cap={c} progress={scrollYProgress} />
      ))}
    </div>
  )
}

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

        {/* ——— 03 · IMPACT ——— */}
        <Moment className="text-center">
          <CapsuleField />
          <Ghost n="03" className="top-[-7vw] left-1/2 -translate-x-1/2" />
          <div className="relative z-10 max-w-[980px] mx-auto">
            <motion.p variants={child} className="label-gold mb-6">Impact</motion.p>
            <motion.h3
              variants={child}
              className="font-display font-semibold text-ivory"
              style={{ fontSize: 'clamp(2.2rem, 4.5vw, 4.5rem)', letterSpacing: '-0.03em', lineHeight: 1 }}
            >
              Measured Outcomes
            </motion.h3>
            <motion.p variants={child} className="mt-7 max-w-[620px] mx-auto text-fog leading-relaxed">
              Dashboards, MIS reporting and ROI analysis behind every idea — marketing that answers to lead conversion, customer acquisition and growth targets, not vanity metrics.
            </motion.p>

            {/* how impact is proven — the method, not the numbers */}
            <motion.div variants={child} className="mt-14 grid md:grid-cols-3 gap-4 text-left">
              {[
                { t: 'Track', d: 'Live campaign dashboards and MIS reporting across every channel and market.' },
                { t: 'Attribute', d: 'Lead attribution and ROI analysis that tie spend to pipeline, not vanity metrics.' },
                { t: 'Optimise', d: 'Consumer intelligence and A/B testing that sharpen the next campaign.' },
              ].map((m, i) => (
                <div key={m.t} className="liquid-glass rounded-2xl p-6">
                  <span className="font-display text-fog/50 text-sm">0{i + 1}</span>
                  <h4 className="mt-2 font-display font-semibold text-lg text-ivory">{m.t}</h4>
                  <p className="mt-2 text-fog text-sm leading-relaxed">{m.d}</p>
                </div>
              ))}
            </motion.div>

            {/* discipline rings */}
            <motion.div variants={child} className="mt-14 flex flex-wrap items-center justify-center gap-5">
              {['ORM', 'BRAND', 'SOCIAL', 'SEO / SEM', 'EVENTS'].map((t) => (
                <div
                  key={t}
                  data-cursor="hover"
                  className="w-24 h-24 rounded-full border border-ivory/15 flex items-center justify-center text-center label !text-ivory/70 px-2 transition-all duration-500 hover:border-gold hover:!text-gold hover:shadow-[0_0_40px_rgba(255,90,30,0.3)]"
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
