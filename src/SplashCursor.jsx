import { useEffect, useRef } from 'react'

// Lightweight, dependency-free white cursor fluid. Its public props match the
// requested React Bits configuration so it can be swapped for the registry file later.
export default function SplashCursor({
  DENSITY_DISSIPATION = 2,
  VELOCITY_DISSIPATION = 4,
  CURL = 2,
  SPLAT_RADIUS = 0.06,
  SPLAT_FORCE = 1000,
  COLOR = '#ffffff',
}) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    const particles = []
    const pointer = { x: -500, y: -500, visible: false }
    let frame
    const resize = () => {
      canvas.width = window.innerWidth * Math.min(devicePixelRatio, 2)
      canvas.height = window.innerHeight * Math.min(devicePixelRatio, 2)
      context.setTransform(Math.min(devicePixelRatio, 2), 0, 0, Math.min(devicePixelRatio, 2), 0, 0)
    }
    const splat = ({ clientX: x, clientY: y, movementX = 0, movementY = 0 }) => {
      pointer.x = x; pointer.y = y; pointer.visible = true
      const amount = Math.min(10, Math.max(3, Math.round(SPLAT_FORCE / 180)))
      for (let index = 0; index < amount; index += 1) {
        const angle = Math.random() * Math.PI * 2
        const speed = 0.5 + Math.random() * (2 + CURL)
        particles.push({ x, y, vx: movementX * .08 + Math.cos(angle) * speed, vy: movementY * .08 + Math.sin(angle) * speed, life: 1, size: 5 + Math.random() * (14 + SPLAT_RADIUS * 100) })
      }
    }
    const draw = () => {
      context.clearRect(0, 0, window.innerWidth, window.innerHeight)
      context.globalCompositeOperation = 'lighter'
      if (pointer.visible) {
        const halo = context.createRadialGradient(pointer.x, pointer.y, 0, pointer.x, pointer.y, 56)
        halo.addColorStop(0, 'rgba(255,255,255,.78)')
        halo.addColorStop(.12, 'rgba(255,255,255,.23)')
        halo.addColorStop(1, 'rgba(255,255,255,0)')
        context.fillStyle = halo
        context.beginPath()
        context.arc(pointer.x, pointer.y, 56, 0, Math.PI * 2)
        context.fill()
      }
      for (let index = particles.length - 1; index >= 0; index -= 1) {
        const particle = particles[index]
        particle.x += particle.vx
        particle.y += particle.vy
        particle.vx *= 1 - VELOCITY_DISSIPATION * .012
        particle.vy *= 1 - VELOCITY_DISSIPATION * .012
        particle.life -= .012 * DENSITY_DISSIPATION
        if (particle.life <= 0) { particles.splice(index, 1); continue }
        const glow = context.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, particle.size)
        glow.addColorStop(0, `rgba(255,255,255,${particle.life * .34})`)
        glow.addColorStop(1, 'rgba(255,255,255,0)')
        context.fillStyle = glow
        context.beginPath()
        context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        context.fill()
      }
      frame = requestAnimationFrame(draw)
    }
    resize(); draw()
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', splat, { passive: true })
    return () => { cancelAnimationFrame(frame); window.removeEventListener('resize', resize); window.removeEventListener('pointermove', splat) }
  }, [COLOR, CURL, DENSITY_DISSIPATION, SPLAT_FORCE, SPLAT_RADIUS, VELOCITY_DISSIPATION])

  return <canvas ref={canvasRef} aria-hidden="true" style={{ position: 'fixed', inset: 0, zIndex: 80, pointerEvents: 'none', mixBlendMode: 'screen' }} />
}
