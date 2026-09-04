import { useState } from 'react'
import Nav from './components/Nav'
import Preloader from './components/Preloader'
import Hero from './components/Hero'
import IntroStrip from './components/IntroStrip'
import BottleneckTrack from './components/BottleneckTrack'
import ExploreCards from './components/ExploreCards'
import Contact from './components/Contact'
import SearchGeoSection from './components/SearchGEOSection'

// The homepage is an introduction, not the whole portfolio: who she is, the
// problem she solves, and the doors into the detail. Everything that needs
// room — capabilities, method, case studies, background — has its own route.
export default function Home() {
  const [started, setStarted] = useState(false)

  return (
    <div>
      <Preloader onDone={() => setStarted(true)} />
      <Nav />
      <Hero started={started} />
      <IntroStrip />
      <BottleneckTrack />
      <SearchGeoSection />
      {/* audience and reach section - moved from /impact */}
      <section className="relative px-6 md:px-12 py-[14vh]">
        <div className="max-w-[1300px] mx-auto">
          <p className="label mb-5">Audience and reach.</p>
          <h2
            className="font-display font-semibold text-ink"
            style={{ fontSize: 'clamp(2.2rem, 5vw, 4.6rem)', letterSpacing: '-0.035em', lineHeight: 1 }}
          >
            Audience and reach
          </h2>
          <p className="mt-8 max-w-[560px] text-ink/65 leading-relaxed">
            The multiples on YouTube are year-on-year.
          </p>
          <div className="overflow-x-auto -mx-6 md:mx-0 mt-10">
            <table className="w-full min-w-[560px] border-collapse">
              <thead>
                <tr className="border-b border-ink/20">
                  <th className="text-left label !text-[9px] pb-3 pr-4">Metric</th>
                  <th key="Real Estate" className="text-right label !text-[9px] pb-3 pl-4 whitespace-nowrap">
                    Real Estate
                  </th>
                  <th key="Interior Decor" className="text-right label !text-[9px] pb-3 pl-4 whitespace-nowrap">
                    Interior Decor
                  </th>
                  <th key="Finances" className="text-right label !text-[9px] pb-3 pl-4 whitespace-nowrap">
                    Finances
                  </th>
                  <th key="UAE Real Estate" className="text-right label !text-[9px] pb-3 pl-4 whitespace-nowrap">
                    UAE Real Estate
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-ink/10">
                  <td className="py-4 pr-4 text-ink text-sm md:text-base">LinkedIn impressions</td>
                  <td className="py-4 pl-4 text-right font-display font-medium text-ink tabular-nums whitespace-nowrap">5.1M</td>
                  <td className="py-4 pl-4 text-right font-display font-medium text-ink tabular-nums whitespace-nowrap">441K</td>
                  <td className="py-4 pl-4 text-right font-display font-medium text-ink tabular-nums whitespace-nowrap">1.12M</td>
                  <td className="py-4 pl-4 text-right font-display font-medium text-ink tabular-nums whitespace-nowrap">443K</td>
                </tr>
                <tr className="border-b border-ink/10">
                  <td className="py-4 pr-4 text-ink text-sm md:text-base">LinkedIn followers</td>
                  <td className="py-4 pl-4 text-right font-display font-medium text-ink tabular-nums whitespace-nowrap">405K</td>
                  <td className="py-4 pl-4 text-right font-display font-medium text-ink tabular-nums whitespace-nowrap">59K</td>
                  <td className="py-4 pl-4 text-right font-display font-medium text-ink tabular-nums whitespace-nowrap">55K</td>
                  <td className="py-4 pl-4 text-right font-display font-medium text-ink tabular-nums whitespace-nowrap">22K</td>
                </tr>
                <tr className="border-b border-ink/10">
                  <td className="py-4 pr-4 text-ink text-sm md:text-base">Facebook views</td>
                  <td className="py-4 pl-4 text-right font-display font-medium text-ink tabular-nums whitespace-nowrap">38.5M</td>
                  <td className="py-4 pl-4 text-right font-display font-medium text-ink tabular-nums whitespace-nowrap">186.2M</td>
                  <td className="py-4 pl-4 text-right font-display font-medium text-ink tabular-nums whitespace-nowrap">873.9K</td>
                  <td className="py-4 pl-4 text-right font-display font-medium text-ink tabular-nums whitespace-nowrap">227.3K</td>
                </tr>
                <tr className="border-b border-ink/10">
                  <td className="py-4 pr-4 text-ink text-sm md:text-base">Instagram reach</td>
                  <td className="py-4 pl-4 text-right font-display font-medium text-ink tabular-nums whitespace-nowrap">6.5M</td>
                  <td className="py-4 pl-4 text-right font-display font-medium text-ink tabular-nums whitespace-nowrap">22.8M</td>
                  <td className="py-4 pl-4 text-right font-display font-medium text-ink tabular-nums whitespace-nowrap">354K</td>
                  <td className="py-4 pl-4 text-right font-display font-medium text-ink tabular-nums whitespace-nowrap">39.2K</td>
                </tr>
                <tr className="border-b border-ink/10">
                  <td className="py-4 pr-4 text-ink text-sm md:text-base">YouTube views</td>
                  <td className="py-4 pl-4 text-right font-display font-medium text-ink tabular-nums whitespace-nowrap">2.4M (17×)</td>
                  <td className="py-4 pl-4 text-right font-display font-medium text-ink tabular-nums whitespace-nowrap">4M (23×)</td>
                  <td className="py-4 pl-4 text-right font-display font-medium text-ink tabular-nums whitespace-nowrap">—</td>
                  <td className="py-4 pl-4 text-right font-display font-medium text-ink tabular-nums whitespace-nowrap">—</td>
                </tr>
                <tr className="border-b border-ink/10">
                  <td className="py-4 pr-4 text-ink text-sm md:text-base">Videos past 100K</td>
                  <td className="py-4 pl-4 text-right font-display font-medium text-ink tabular-nums whitespace-nowrap">91</td>
                  <td className="py-4 pl-4 text-right font-display font-medium text-ink tabular-nums whitespace-nowrap">26</td>
                  <td className="py-4 pl-4 text-right font-display font-medium text-ink tabular-nums whitespace-nowrap">1</td>
                  <td className="py-4 pl-4 text-right font-display font-medium text-ink tabular-nums whitespace-nowrap">4</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
     {/* the dismantling brain and the film work now have their own route,
          /media — the homepage links to it from the last card instead */}
      <ExploreCards />
      <Contact />
    </div>
  )
}