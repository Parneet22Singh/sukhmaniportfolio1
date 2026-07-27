import { type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import Nav from './Nav'
import Contact from './Contact'
import { campaignIndex } from '../data/portfolio'

interface Props {
  currentSlug: string
  accent: string
  children: ReactNode
}

// Shared chrome for every campaign page: nav, back link, themed
// "more campaigns" rail, and the shared contact footer. The hero and
// body of each campaign are bespoke and passed in as children.
export default function CampaignPage({ currentSlug, accent, children }: Props) {
  const others = campaignIndex.filter((c) => c.slug !== currentSlug)

  return (
    <div className=" min-h-screen">
      <Nav />

      {/* Back link */}
      <div className="fixed top-24 left-4 md:left-8 z-40">
        <Link
          to="/#experience"
          data-cursor="hover"
          className="liquid-glass rounded-full px-4 py-2 inline-flex items-center gap-2 text-ivory/70 hover:text-ivory text-xs md:text-sm transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Portfolio
        </Link>
      </div>

      {children}

      {/* More campaigns */}
      <section className="relative px-6 py-20 md:py-28 border-t border-ivory/10 overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{ background: `radial-gradient(ellipse at center, ${accent}22 0%, transparent 70%)` }}
        />
        <div className="relative max-w-6xl mx-auto">
          <h3 className="text-3xl md:text-4xl text-ivory font-serif tracking-tight mb-10">
            More <em className="italic" style={{ color: accent }}>campaigns</em>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {others.map((c) => (
              <Link
                key={c.slug}
                to={`/${c.slug}`}
                data-cursor="hover"
                className="group relative liquid-glass rounded-2xl p-6 overflow-hidden transition-colors hover:bg-gold/[0.04]"
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ boxShadow: `inset 0 0 0 1.5px ${c.accent}` }}
                />
                <div className="flex items-center justify-between">
                  <span className="text-xs tracking-widest uppercase" style={{ color: c.accent }}>
                    {c.kicker}
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-fog group-hover:text-gold transition-colors" />
                </div>
                <div className="mt-3 text-ivory text-lg font-serif tracking-tight">{c.title}</div>
                <div className="mt-2 text-fog text-sm leading-relaxed">{c.blurb}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Contact />
    </div>
  )
}
