import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { oohCampaign, campaignIndex } from '../data/portfolio'

const EASE = [0.22, 1, 0.36, 1] as const

// A single featured campaign (OOH) — the full campaign index lives in the
// nav "Campaigns" dropdown; the homepage spotlights just one.
export default function SelectedWork() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-12% 0px' })
  const ooh = campaignIndex.find((c) => c.slug === 'ooh-campaign')!

  return (
    <section id="work" className="relative py-[14vh] px-6 md:px-12">
      <div className="max-w-[1400px] mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-[7vh]"
        >
          <p className="label mb-4">Featured Campaign</p>
          <h2
            className="font-display font-semibold text-ivory"
            style={{ fontSize: 'clamp(2.4rem, 5.5vw, 5.5rem)', letterSpacing: '-0.03em', lineHeight: 0.98 }}
          >
            The work that
            <br />
            <span className="text-gold">got India talking.</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
        >
          <Link
            to="/ooh-campaign"
            data-cursor="hover"
            className="group grid md:grid-cols-2 rounded-[28px] overflow-hidden liquid-glass shadow-soft"
          >
            {/* billboard visual */}
            <div className="relative aspect-[16/11] md:aspect-auto md:min-h-[440px] overflow-hidden">
              <img
                src="https://lalitbhardwaj.in/img/portfolio/ooh/banner_design.jpg"
                alt="Square Yards OOH billboard campaign"
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[700ms] ease-out group-hover:scale-[1.04]"
              />
              <span
                className="absolute top-4 left-4 label !text-[10px] px-3 py-1.5 rounded-full text-white"
                style={{ background: 'rgba(35,29,51,0.55)', backdropFilter: 'blur(6px)' }}
              >
                ✦ Featured
              </span>
            </div>

            {/* copy */}
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <p className="label-gold mb-4">{ooh.kicker} · {ooh.period}</p>
              <h3
                className="font-display font-semibold text-ivory transition-colors duration-300 group-hover:text-gold"
                style={{ fontSize: 'clamp(1.8rem, 3.2vw, 3rem)', letterSpacing: '-0.03em', lineHeight: 1 }}
              >
                {oohCampaign.name}
              </h3>
              <p className="mt-5 text-fog leading-relaxed max-w-[440px]">{oohCampaign.theme}</p>
              <div className="mt-8 flex gap-8">
                <div><p className="font-display font-semibold text-2xl text-ivory">11</p><p className="label mt-1 !text-[9px]">Placements</p></div>
                <div><p className="font-display font-semibold text-2xl text-ivory">OOH+DOOH</p><p className="label mt-1 !text-[9px]">+ social</p></div>
              </div>
              <p className="mt-9 label u-link inline-block !text-ivory/70 group-hover:!text-gold transition-colors">
                View Campaign →
              </p>
            </div>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
