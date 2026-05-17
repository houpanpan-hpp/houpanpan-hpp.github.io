'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

const TAGLINES = [
  'AI / 算法工程师',
  '把模型搬上业务线',
  '记录每一次踩坑',
  '工程审美 > 工程产出',
]

export function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [taglineIdx, setTaglineIdx] = useState(0)

  // Rotate taglines
  useEffect(() => {
    const t = setInterval(() => setTaglineIdx((i) => (i + 1) % TAGLINES.length), 3200)
    return () => clearInterval(t)
  }, [])

  // Particle network
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf = 0
    let width = 0
    let height = 0
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    type P = { x: number; y: number; vx: number; vy: number }
    let particles: P[] = []
    let mouse = { x: -1000, y: -1000 }

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      width = rect.width
      height = rect.height
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const count = Math.max(40, Math.floor((width * height) / 18000))
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
      }))
    }

    const onMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
    }
    const onLeave = () => {
      mouse.x = -1000
      mouse.y = -1000
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height)
      // Update + draw particles
      for (const p of particles) {
        // Mouse attraction
        const dx = mouse.x - p.x
        const dy = mouse.y - p.y
        const distSq = dx * dx + dy * dy
        if (distSq < 18000) {
          const force = (1 - distSq / 18000) * 0.04
          p.vx += (dx / Math.sqrt(distSq + 1)) * force
          p.vy += (dy / Math.sqrt(distSq + 1)) * force
        }
        // Damping
        p.vx *= 0.98
        p.vy *= 0.98
        // Drift
        p.x += p.vx + (Math.random() - 0.5) * 0.05
        p.y += p.vy + (Math.random() - 0.5) * 0.05
        // Wrap
        if (p.x < 0) p.x = width
        if (p.x > width) p.x = 0
        if (p.y < 0) p.y = height
        if (p.y > height) p.y = 0
      }
      // Lines
      const maxDist = 110
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i]
          const b = particles[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const d = Math.hypot(dx, dy)
          if (d < maxDist) {
            const alpha = (1 - d / maxDist) * 0.35
            ctx.strokeStyle = `rgba(0, 217, 255, ${alpha})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }
      // Dots
      for (const p of particles) {
        ctx.fillStyle = 'rgba(179, 136, 255, 0.8)'
        ctx.beginPath()
        ctx.arc(p.x, p.y, 1.4, 0, Math.PI * 2)
        ctx.fill()
      }
      raf = requestAnimationFrame(draw)
    }

    resize()
    draw()
    window.addEventListener('resize', resize)
    canvas.addEventListener('mousemove', onMouse)
    canvas.addEventListener('mouseleave', onLeave)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('mousemove', onMouse)
      canvas.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <section className="relative overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)]/40 px-6 py-16 md:px-12 md:py-24">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--color-bg)] pointer-events-none" />

      <div className="relative">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-3 inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-elevated)]/60 px-3 py-1 font-mono text-xs text-[var(--color-fg-muted)] backdrop-blur"
        >
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--color-accent)]" />
          <span>online · {new Date().getFullYear()}</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl font-bold tracking-tight md:text-6xl"
        >
          <span className="block">嗨，我是</span>
          <span className="bg-gradient-to-r from-[var(--color-accent)] via-[var(--color-accent-2)] to-[var(--color-accent-3)] bg-clip-text text-transparent">
            houpan
          </span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-4 h-7 font-mono text-base text-[var(--color-fg-muted)] md:text-lg"
        >
          <motion.span
            key={taglineIdx}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="caret"
          >
            {TAGLINES[taglineIdx]}
          </motion.span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="mt-6 max-w-xl text-sm leading-relaxed text-[var(--color-fg-muted)] md:text-base"
        >
          这里是我的技术博客。记录大模型训练、推理、评测管线里的踩坑，
          顺便写写工程经验和日常思考。每一篇文章都来自真实场景。
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-8 flex flex-wrap gap-3"
        >
          <Link
            href="/blog"
            className="group inline-flex items-center gap-2 rounded-md bg-[var(--color-accent)] px-4 py-2 text-sm font-medium text-[var(--color-bg)] transition-transform hover:scale-105"
          >
            阅读博客
            <span className="transition-transform group-hover:translate-x-0.5">→</span>
          </Link>
          <Link
            href="/about"
            className="inline-flex items-center gap-2 rounded-md border border-[var(--color-border)] bg-[var(--color-bg-elevated)]/60 px-4 py-2 text-sm font-medium text-[var(--color-fg)] backdrop-blur transition-colors hover:border-[var(--color-accent)]"
          >
            关于我
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
