import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { campaignIndex } from '../data/portfolio'

// Visual per campaign: OOH gets the real billboard; films get their YouTube still.
const VISUALS: Record<string, string> = {
  'ooh-campaign': 'https://lalitbhardwaj.in/img/portfolio/ooh/banner_design.jpg',
  'parking-ticket': 'https://i.ytimg.com/vi/q2s19vlX0UA/hqdefault.jpg',
  'mothers-day': 'https://i.ytimg.com/vi/iSle_QKhovo/hqdefault.jpg',
  'raasta-royal': 'https://i.ytimg.com/vi/MPi2jnUAnuA/hqdefault.jpg',
}

function Row({ c, i }: { c: (typeof campaignIndex)[number]; i: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-15% 0px' })
  const flip = i % 2 === 1

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        to={`/${c.slug}`}
        className={`group grid md:grid-cols-12 gap-8 md:gap-0 items-center py-[8vh] border-t border-ivory/10 ${flip ? '' : ''}`}
      >
        {/* index + copy */}
        <div className={`md:col-span-6 ${flip ? 'md:order-2 md:pl-[8%]' : 'md:pr-[8%]'}`}>
          <div className="flex items-baseline gap-6">
            <span className="font-display text-fog/40 tabular-nums">0{i + 1}</span>
            <p className="label-gold">{c.kicker} · {c.period}</p>
          </div>
          <h3
            className="mt-5 font-display font-semibold text-ivory transition-colors duration-400 group-hover:text-gold"
            style={{ fontSize: 'clamp(2rem, 4.2vw, 4.2rem)', letterSpacing: '-0.03em', lineHeight: 0.98 }}
          >
            {c.title}
          </h3>
          <p className="mt-6 max-w-[440px] text-fog leading-relaxed">{c.blurb}</p>
          <p className="mt-8 label u-link inline-block !text-ivory/70 group-hover:!text-gold transition-colors">
            View Campaign →
          </p>
        </div>

        {/* visual — offset plane */}
        <div className={`md:col-span-6 ${flip ? 'md:order-1 md:-mt-16' : 'md:mt-16'}`}>
          <div className="relative aspect-[16/10] rounded-2xl overflow-hidden shadow-soft border border-ivory/5">
            <img
              src={VISUALS[c.slug]}
              alt={c.title}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-midnight/30 transition-opacity duration-500 group-hover:opacity-0" />
            <span
              className="absolute bottom-4 left-4 label !text-ivory/90 px-3 py-1.5 rounded-full backdrop-blur-md"
              style={{ background: 'rgba(10,10,15,0.5)', border: `1px solid ${c.accent}55` }}
            >
              <span style={{ color: c.accent }}>●</span>&nbsp; {c.kicker}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default function SelectedWork() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })

  return (
    <section id="work" className="relative py-[14vh] px-6 md:px-12">
      <div className="max-w-[1500px] mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-[8vh]"
        >
          <p className="label mb-4">Selected Work</p>
          <h2
            className="font-display font-semibold text-ivory"
            style={{ fontSize: 'clamp(2.4rem, 5.5vw, 5.5rem)', letterSpacing: '-0.03em', lineHeight: 0.98 }}
          >
            Campaigns that became
            <br />
            <span className="text-gold">conversations.</span>
          </h2>
        </motion.div>

        {campaignIndex.map((c, i) => (
          <Row key={c.slug} c={c} i={i} />
        ))}
        <div className="border-t border-ivory/10" />
      </div>
    </section>
  )
}
