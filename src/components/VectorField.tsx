import { useEffect, useRef } from 'react'
import * as THREE from 'three'

// Undulating gold wireframe form, center-right of the hero.
// Semi-transparent (0.15), drifts gently toward the pointer — never tracks it.
export default function VectorField() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, mount.clientWidth / mount.clientHeight, 0.1, 100)
    camera.position.z = 7

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
    renderer.setSize(mount.clientWidth, mount.clientHeight)
    mount.appendChild(renderer.domElement)

    const geo = new THREE.IcosahedronGeometry(2.4, 9)
    const base = geo.attributes.position.array.slice() as unknown as Float32Array
    const mat = new THREE.MeshBasicMaterial({
      color: 0xc9a96e,
      wireframe: true,
      transparent: true,
      opacity: 0.09,
    })
    const mesh = new THREE.Mesh(geo, mat)
    mesh.position.x = 2.1
    scene.add(mesh)

    let mx = 0, my = 0
    const onMove = (e: MouseEvent) => {
      mx = (e.clientX / window.innerWidth - 0.5) * 2
      my = (e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', onMove, { passive: true })

    // only render while the hero is on screen
    let visible = true
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting })
    io.observe(mount)

    const clock = new THREE.Clock()
    let raf = 0
    const animate = () => {
      if (!visible) { raf = requestAnimationFrame(animate); return }
      const t = clock.getElapsedTime()
      const pos = geo.attributes.position
      for (let i = 0; i < pos.count; i++) {
        const ix = i * 3
        const x = base[ix], y = base[ix + 1], z = base[ix + 2]
        // slow, organic breathing displacement
        const d = 1 + 0.13 * Math.sin(x * 1.6 + t * 0.6) * Math.cos(y * 1.6 + t * 0.45) * Math.sin(z * 1.6 + t * 0.3)
        pos.setXYZ(i, x * d, y * d, z * d)
      }
      pos.needsUpdate = true
      mesh.rotation.y += 0.001
      mesh.rotation.x += 0.0004
      // gentle drift toward pointer
      mesh.rotation.y += (mx * 0.25 - mesh.rotation.y % 0.001) * 0.002
      mesh.rotation.x += (my * 0.15 - mesh.rotation.x % 0.001) * 0.002
      renderer.render(scene, camera)
      raf = requestAnimationFrame(animate)
    }
    raf = requestAnimationFrame(animate)

    const onResize = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(mount.clientWidth, mount.clientHeight)
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('resize', onResize)
      geo.dispose()
      mat.dispose()
      renderer.dispose()
      mount.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={mountRef} className="absolute inset-0" aria-hidden />
}
