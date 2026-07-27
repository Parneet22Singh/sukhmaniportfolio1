import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ── procedural liquid ────────────────────────────────────────────────
// Generated per-frame from a single scroll progress p (0→1), so motion is
// smooth and organic. Two flows in ONE svg that scrolls away with the hero:
//   POOL    — rises from the bottom.
//   CURTAIN — drips DOWN from the top ("leaks down"). Both are clipped to the
//             hero and scroll out with it, so nothing bleeds over the next
//             section and there's no fixed overlay to cause a repaint.

const lerp = (a: number, b: number, t: number) => a + (b - a) * t
const easeInOut = (p: number) =>
  p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2
const gauss = (x: number, cx: number, w: number) => Math.exp(-Math.pow((x - cx) / w, 2))

// Smooth (Catmull-Rom → cubic) fill: a curve through `pts`, closed to the
// horizontal line at `closeY`.
function fill(pts: [number, number][], closeY: number) {
  const n = pts.length
  let d = `M ${pts[0][0].toFixed(1)},${closeY} L ${pts[0][0].toFixed(1)},${pts[0][1].toFixed(1)}`
  for (let i = 0; i < n - 1; i++) {
    const p0 = pts[i - 1] || pts[i]
    const p1 = pts[i]
    const p2 = pts[i + 1]
    const p3 = pts[i + 2] || pts[i + 1]
    const c1x = p1[0] + (p2[0] - p0[0]) / 6
    const c1y = p1[1] + (p2[1] - p0[1]) / 6
    const c2x = p2[0] - (p3[0] - p1[0]) / 6
    const c2y = p2[1] - (p3[1] - p1[1]) / 6
    d += ` C ${c1x.toFixed(1)},${c1y.toFixed(1)} ${c2x.toFixed(1)},${c2y.toFixed(1)} ${p2[0].toFixed(1)},${p2[1].toFixed(1)}`
  }
  d += ` L ${pts[n - 1][0].toFixed(1)},${closeY} Z`
  return d
}

// POOL surface — viewBox 1000×1000. `lag` trails a back layer.
function pool(p: number, lag = 0, ampBoost = 1) {
  const pl = gsap.utils.clamp(0, 1, p - lag)
  const e = easeInOut(pl)
  const base = lerp(1160, 210, e) // surface: off-screen (below) → near top
  const tendrils: [number, number][] = [[300, 250], [640, 320], [910, 200]]
  const pts: [number, number][] = []
  const N = 18
  for (let i = 0; i <= N; i++) {
    const x = -60 + (1120 / N) * i
    let y = base
    y -= (26 + 52 * pl) * ampBoost * Math.sin(i * 0.9 + 0.3)
    y -= (12 + 26 * pl) * ampBoost * Math.sin(i * 2.3 + 1.1)
    for (const [cx, h] of tendrils) y -= h * pl * ampBoost * gauss(x, cx, 95)
    pts.push([x, y])
  }
  return fill(pts, 1160)
}

// CURTAIN edge — viewBox 1000×1000 (fixed overlay). Drips DOWN; narrow
// gaussians = tongues. The drips extend downward once (no retract) and then
// dissolve via opacity, so it reads as a genuine downward melt.
function curtain(p: number) {
  const g = gsap.utils.clamp(0, 1, p / 0.42) // extend down, done by ~p0.42
  const e = easeInOut(g)
  const gd = Math.pow(Math.sin(g * Math.PI / 2), 0.7) // drip length, front-loaded
  const base = lerp(-280, 150, e)
  const drips: [number, number][] = [[150, 420], [400, 600], [650, 460], [880, 610], [1010, 420]]
  const pts: [number, number][] = []
  const N = 26
  for (let i = 0; i <= N; i++) {
    const x = -60 + (1120 / N) * i
    let y = base + (14 + 22 * g) * Math.sin(i * 0.85)
    for (const [cx, h] of drips) y += h * gd * gauss(x, cx, 46)
    pts.push([x, y])
  }
  return fill(pts, -300)
}

export default function BlobMorph({ triggerRef }: { triggerRef: React.RefObject<HTMLElement | null> }) {
  const backRef = useRef<SVGPathElement>(null)
  const frontRef = useRef<SVGPathElement>(null)
  const curtainRef = useRef<SVGPathElement>(null)

  useEffect(() => {
    if (!triggerRef.current) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      const state = { t: 0 }
      gsap.to(state, {
        t: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: triggerRef.current,
          start: 'top top',
          end: '+=115%',
          scrub: 0.6,
        },
        onUpdate: () => {
          const p = state.t
          backRef.current?.setAttribute('d', pool(p, 0.08, 0.9))
          frontRef.current?.setAttribute('d', pool(p, 0, 1))
          // curtain shape only changes while extending (p < 0.45); after that
          // it's static and just scrolls out with the hero
          if (p < 0.45) curtainRef.current?.setAttribute('d', curtain(p))
        },
      })
    })

    return () => ctx.revert()
  }, [triggerRef])

  return (
    // pool + curtain in one svg; clipped to the hero and scrolls away with it
    <div className="absolute inset-0 z-[25] pointer-events-none overflow-hidden" aria-hidden>
      <svg viewBox="0 0 1000 1000" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
        <defs>
          <linearGradient id="poolGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--lavender)" />
            <stop offset="55%" stopColor="var(--violet)" />
            <stop offset="100%" stopColor="var(--coral)" />
          </linearGradient>
          <linearGradient id="curtainGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--violet)" />
            <stop offset="100%" stopColor="var(--lavender)" />
          </linearGradient>
        </defs>
        {/* pool — rises from the bottom */}
        <path ref={backRef} d={pool(0, 0.08, 0.9)} fill="var(--coral)" opacity={0.6} />
        <path ref={frontRef} d={pool(0, 0, 1)} fill="url(#poolGrad)" opacity={0.97} />
        {/* curtain — drips down from the top */}
        <path ref={curtainRef} d={curtain(0)} fill="url(#curtainGrad)" opacity={0.92} />
      </svg>
    </div>
  )
}
