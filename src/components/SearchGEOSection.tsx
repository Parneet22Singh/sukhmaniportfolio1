import { motion, useInView, animate } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { geoGrowth, searchMoves } from '../data/impact'

const ease = [0.22, 1, 0.36, 1] as const

const ORANGE = '#E4571A'
const ORANGE_DEEP = '#A83D12'
const INK = '#15130F'
const BONE = '#F5F0E4'
const BEIGE = '#e8e0d2'

function AnimatedStat({ value, className, style }: { value: string; className?: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLParagraphElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })
  const [display, setDisplay] = useState(value.replace(/[\d.,]+/, '0'))

  useEffect(() => {
    if (!inView) return
    const match = value.match(/[\d.,]+/)
    if (!match) { setDisplay(value); return }
    const target = parseFloat(match[0].replace(/,/g, ''))
    const [prefix, suffix] = [value.slice(0, match.index), value.slice((match.index ?? 0) + match[0].length)]
    const controls = animate(0, target, {
      duration: 1.4,
      ease,
      onUpdate: (v) => {
        const decimals = match[0].includes('.') ? 1 : 0
        setDisplay(`${prefix}${v.toFixed(decimals)}${suffix}`)
      },
    })
    return () => controls.stop()
  }, [inView, value])

  return <p ref={ref} className={className} style={style}>{display}</p>
}

export default function SearchGeoSection() {
  const hero = searchMoves[0]
  const rest = searchMoves.slice(1)

  return (
    <section
      className="relative px-6 md:px-12 py-[14vh] overflow-hidden"
      style={{ backgroundColor: BEIGE, color: INK }}
    >
      <p
        aria-hidden
        className="pointer-events-none select-none absolute -top-[4vw] left-1/2 -translate-x-1/2 font-display font-bold whitespace-nowrap"
        style={{ fontSize: '22vw', color: `${INK}08`, letterSpacing: '-0.05em' }}
      >
        VISIBILITY
      </p>

      <div className="relative max-w-[1300px] mx-auto">

        {/* ───────────────── HEADER + HERO READOUT (GEO Sessions — kept as graphic) ───────────────── */}

        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-16 items-end">

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-12% 0px' }}
            transition={{ duration: 0.8, ease }}
          >
            <p className="text-sm mb-6" style={{ color: ORANGE_DEEP }}>
              Measurement and decisions
            </p>

            <h2
              className="font-display font-semibold leading-[0.94]"
              style={{ fontSize: 'clamp(2.6rem, 6vw, 5.25rem)', letterSpacing: '-0.03em' }}
            >
              Search stopped being a queue of blue links.
            </h2>

            <p className="mt-8 max-w-[520px] leading-relaxed text-base md:text-lg" style={{ color: `${INK}99` }}>
              Generative-engine optimisation was a standing start a year ago.
              It&apos;s now the fastest-moving line on our board, and the numbers
              below track what happened once we stopped treating it as an
              afterthought.
            </p>
          </motion.div>

          <motion.div
            className="relative overflow-hidden p-8 md:p-10"
            style={{ backgroundColor: INK, color: BONE }}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-12% 0px' }}
            transition={{ duration: 0.8, delay: 0.1, ease }}
          >
            <p className="text-sm" style={{ color: `${BONE}80` }}>{hero?.metric}</p>

            <AnimatedStat
              value={hero?.value ?? ''}
              className="font-display font-bold leading-none tabular-nums mt-4"
              style={{ fontSize: 'clamp(3.25rem, 7vw, 5.75rem)', letterSpacing: '-0.04em', color: ORANGE }}
            />

            <div className="mt-8 relative h-6 overflow-hidden" style={{ borderTop: `1px solid ${BONE}20` }}>
              <motion.div
                className="absolute top-1.5 left-0 flex gap-8 whitespace-nowrap text-xs tabular-nums"
                style={{ color: `${BONE}60` }}
                animate={{ x: ['0%', '-50%'] }}
                transition={{ duration: 18, ease: 'linear', repeat: Infinity }}
              >
                {[...geoGrowth, ...geoGrowth].map((g, i) => (
                  <span key={i}>{g.metric} | SQY {g.sqy}</span>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* ───────────────── LEADERBOARD — plain table ───────────────── */}

        <div className="mt-[12vh]">
          <div className="flex items-baseline justify-between border-b pb-4" style={{ borderColor: `${INK}20` }}>
            <p className="text-sm" style={{ color: '#000000' }}>Where we stand, brand by brand</p>
            <p className="text-sm tabular-nums" style={{ color: '#000000' }}>FY 25–26</p>
          </div>

          <motion.table
            className="w-full mt-2 border-collapse"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-8% 0px' }}
            transition={{ duration: 0.6, ease }}
          >
            <thead>
              <tr>
                <th
                  className="text-left text-xs font-normal py-3 pr-4"
                  style={{ color: '#000000', borderBottom: `1px solid ${INK}20` }}
                >
                  Metric
                </th>
                {['SQY', 'INCO', 'Urban Money'].map((name) => (
                  <th
                    key={name}
                    className="text-right text-xs font-normal py-3 pl-4"
                    style={{
                      color: name === 'SQY' ? ORANGE_DEEP : '#000000',
                      borderBottom: `1px solid ${INK}20`,
                    }}
                  >
                    {name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {geoGrowth.map((g) => (
                <tr key={g.metric}>
                  <td
                    className="py-4 pr-4 text-sm md:text-base font-display"
                    style={{ borderBottom: `1px solid ${INK}12`, color: '#000000' }}
                  >
                    {g.metric}
                  </td>
                  {[
                    { name: 'SQY', value: g.sqy },
                    { name: 'INCO', value: g.inco },
                    { name: 'Urban Money', value: g.um },
                  ].map((item) => (
                    <td
                      key={item.name}
                      className="py-4 pl-4 text-right font-display font-semibold tabular-nums text-sm md:text-base"
                      style={{
                        borderBottom: `1px solid ${INK}12`,
                        color: item.name === 'SQY' ? ORANGE_DEEP : '#000000',
                      }}
                    >
                      {item.value}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </motion.table>
        </div>

             {/* ───────────────── STAT MOSAIC — broken grid, mixed scale ───────────────── */}

        <div className="mt-[12vh] grid sm:grid-cols-6 gap-5">
          {rest.map((s, i) => {
            const big = i === 0
            const tilt = i % 2 === 0 ? -0.72 : 0.72
            return (
              <motion.div
                key={s.metric}
                className={`relative px-7 py-9 flex flex-col justify-between ${big ? 'sm:col-span-4' : 'sm:col-span-2'}`}
                style={{
                  backgroundColor: big ? INK : BEIGE,
                  color: big ? BONE : INK,
                  border: big ? 'none' : `1px solid ${INK}18`,
                  minHeight: big ? 240 : 190,
                }}
                initial={{ opacity: 0, y: 18, rotate: 0 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                viewport={{ once: true, margin: '-8% 0px' }}
                transition={{ duration: 0.6, delay: i * 0.08, ease }}
                whileHover={{ rotate: tilt * 1.05, transition: { duration: 0.3, ease: 'easeOut' } }}
              >
                <span className="h-[3px] w-8" style={{ backgroundColor: ORANGE }} />

                <AnimatedStat
                  value={s.value}
                  className="font-display font-bold leading-none tabular-nums"
                  style={{ fontSize: big ? 'clamp(3.2rem, 6vw, 5rem)' : 'clamp(2.2rem, 3.6vw, 3rem)', letterSpacing: '-0.03em' }}
                />
                <p className="mt-3 text-sm" style={{ color: big ? `${BONE}80` : `${INK}70` }}>
                  {s.metric}
                </p>
              </motion.div>
            )
          })}
        </div>

        {/* ───────────────── FOOTNOTE ───────────────── */}

        <div className="mt-7 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <p className="text-xs" style={{ color: '#000000' }}>
            Search, discovery and generative visibility, tracked together
          </p>
          <p className="text-xs tabular-nums" style={{ color: '#000000' }}>
            Year-on-year
          </p>
        </div>

      </div>
    </section>
  )
}