'use client'

import Link from 'next/link'
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion'
import type { Post } from '@/lib/posts'
import { formatDate } from '@/lib/utils'

const CATEGORY_LABEL: Record<Post['category'], string> = {
  tech: '技术',
  experience: '经验',
  life: '日常',
}

const CATEGORY_COLOR: Record<Post['category'], string> = {
  tech: 'var(--color-accent)',
  experience: 'var(--color-accent-2)',
  life: 'var(--color-accent-3)',
}

export function PostCard({ post }: { post: Post }) {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const spotlight = useMotionTemplate`radial-gradient(280px circle at ${mouseX}px ${mouseY}px, rgba(0,217,255,0.10), transparent 60%)`

  return (
    <motion.div
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect()
        mouseX.set(e.clientX - rect.left)
        mouseY.set(e.clientY - rect.top)
      }}
      whileHover={{ y: -2 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="group glow-border relative overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)]/40"
    >
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100"
        style={{ background: spotlight }}
      />
      <Link href={`/blog/${post.slug}`} className="relative block p-5">
        <div className="mb-3 flex items-center gap-3 font-mono text-xs text-[var(--color-fg-muted)]">
          <span
            className="inline-flex items-center gap-1.5"
            style={{ color: CATEGORY_COLOR[post.category] }}
          >
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: 'currentColor' }}
            />
            {CATEGORY_LABEL[post.category]}
          </span>
          <span className="text-[var(--color-fg-subtle)]">·</span>
          <time>{formatDate(post.date)}</time>
          <span className="text-[var(--color-fg-subtle)]">·</span>
          <span>{post.readingMinutes} min</span>
        </div>
        <h3 className="text-lg font-semibold tracking-tight transition-colors group-hover:text-[var(--color-accent)]">
          {post.title}
        </h3>
        {post.summary && (
          <p className="mt-2 line-clamp-2 text-sm text-[var(--color-fg-muted)]">
            {post.summary}
          </p>
        )}
        {post.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {post.tags.slice(0, 4).map((t) => (
              <span
                key={t}
                className="rounded-md border border-[var(--color-border)] bg-[var(--color-bg)]/60 px-2 py-0.5 font-mono text-[10px] text-[var(--color-fg-muted)]"
              >
                #{t}
              </span>
            ))}
          </div>
        )}
      </Link>
    </motion.div>
  )
}
