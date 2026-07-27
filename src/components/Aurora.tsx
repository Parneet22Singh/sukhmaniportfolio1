import { useLocation } from 'react-router-dom'

// Route-aware "spotlight" backdrop, matched to the Elle Harper reference:
// a strong violet glow anchored upper-left, faint concentric rings behind
// centre, fading to near-black at the right/edges. Campaign routes re-tint.
type Theme = { glow: string; spot: string; ring: string }

const THEMES: Record<string, Theme> = {
  '/': { glow: 'rgba(255,90,30,0.34)', spot: 'rgba(255,90,30,0.16)', ring: 'rgba(255,138,76,0.11)' },
  '/ooh-campaign': { glow: 'rgba(245,197,24,0.42)', spot: 'rgba(245,197,24,0.22)', ring: 'rgba(245,197,24,0.11)' },
  '/parking-ticket': { glow: 'rgba(255,122,26,0.46)', spot: 'rgba(255,122,26,0.24)', ring: 'rgba(255,122,26,0.11)' },
  '/mothers-day': { glow: 'rgba(244,63,142,0.46)', spot: 'rgba(244,63,142,0.24)', ring: 'rgba(244,63,142,0.11)' },
  '/raasta-royal': { glow: 'rgba(231,200,115,0.46)', spot: 'rgba(255,138,76,0.24)', ring: 'rgba(231,200,115,0.13)' },
}

export default function Aurora() {
  const { pathname } = useLocation()
  const t = THEMES[pathname] || THEMES['/']

  return (
    <div className="backdrop-root" aria-hidden>
      {/* soft glow, centred behind the figure (keeps top text on clean dark) */}
      <div
        className="absolute rounded-full left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: '70vw', height: '70vw',
          background: `radial-gradient(circle, ${t.glow} 0%, transparent 62%)`,
          filter: 'blur(60px)', transition: 'background 0.6s ease',
        }}
      />
      {/* soft central core behind the figure */}
      <div className="spotlight-core" style={{ ['--spot' as string]: t.spot, transition: 'background 0.6s ease' }} />
      <div className="backdrop-vignette" />
    </div>
  )
}
