import SmokeBackground from './SmokeBackground'

// Fixed backdrop: living gold-smoke shader under a vignette.
// Sits at z-0; all content renders above on z-10.
export default function Aurora() {
  return (
    <div className="backdrop-root" aria-hidden>
      <div className="absolute inset-0 opacity-60">
        <SmokeBackground color={[0.79, 0.66, 0.43]} />
      </div>
      {/* midnight grade so text stays readable over the smoke */}
      <div className="absolute inset-0 bg-midnight/55" />
      <div className="backdrop-vignette" />
    </div>
  )
}
