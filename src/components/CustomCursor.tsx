import { useEffect, useRef } from 'react'

// Antique-gold dot (8px) that grows to 40px over interactive elements,
// trailing the pointer with a lerp of 0.15. Desktop / fine pointers only.
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    document.documentElement.classList.add('custom-cursor-active')

    const dot = dotRef.current!
    let mx = -100, my = -100, x = -100, y = -100
    let raf = 0

    const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY }
    const loop = () => {
      x += (mx - x) * 0.15
      y += (my - y) * 0.15
      dot.style.transform = `translate(${x}px, ${y}px)`
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    const isInteractive = (t: EventTarget | null) =>
      t instanceof Element && !!t.closest('a, button, [data-cursor="hover"], input, textarea, select')
    const onOver = (e: MouseEvent) => { if (isInteractive(e.target)) dot.classList.add('is-hover') }
    const onOut = (e: MouseEvent) => { if (isInteractive(e.target)) dot.classList.remove('is-hover') }

    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseover', onOver, { passive: true })
    document.addEventListener('mouseout', onOut, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
      document.documentElement.classList.remove('custom-cursor-active')
    }
  }, [])

  return <div ref={dotRef} className="cursor-dot hidden md:block" aria-hidden />
}
