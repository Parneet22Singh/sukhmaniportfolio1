import { StrictMode, Suspense, lazy, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Lenis from 'lenis'
import './index.css'
import ScrollToTop from './components/ScrollToTop'
import CustomCursor from './components/CustomCursor'
import Atmosphere from './components/Atmosphere'
import Aurora from './components/Aurora'
import Home from './App.tsx'

const OOHCampaign = lazy(() => import('./pages/OOHCampaign'))
const ParkingTicket = lazy(() => import('./pages/ParkingTicket'))
const MothersDay = lazy(() => import('./pages/MothersDay'))
const RaastaRoyal = lazy(() => import('./pages/RaastaRoyal'))

// Buttery inertia scroll (lerp 0.1), disabled for reduced-motion users.
function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const lenis = new Lenis({ lerp: 0.1 })
    let raf = 0
    const loop = (t: number) => {
      lenis.raf(t)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
    }
  }, [])
  return null
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <SmoothScroll />
      <ScrollToTop />
      <Aurora />
      <CustomCursor />
      <Atmosphere />
      <div className="relative z-10">
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/ooh-campaign" element={<OOHCampaign />} />
            <Route path="/parking-ticket" element={<ParkingTicket />} />
            <Route path="/mothers-day" element={<MothersDay />} />
            <Route path="/raasta-royal" element={<RaastaRoyal />} />
          </Routes>
        </Suspense>
      </div>
    </BrowserRouter>
  </StrictMode>,
)
