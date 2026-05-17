'use client'

import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PostCard } from './post-card'
import type { Post } from '@/lib/posts'
import { cn } from '@/lib/utils'

type Props = {
  tags: { tag: string; count: number }[]
  posts: Post[]
}

export function TagFilter({ tags, posts }: Props) {
  const [active, setActive] = useState<string | null>(null)

  const filtered = useMemo(() => {
    if (!active) return posts
    return posts.filter((p) => p.tags.includes(active))
  }, [active, posts])

  return (
    <>
      {tags.length > 0 && (
        <div className="mb-8 flex flex-wrap items-center gap-2">
          <button
            onClick={() => setActive(null)}
            className={cn(
              'rounded-full border px-3 py-1 font-mono text-xs transition-colors',
              active === null
                ? 'border-[var(--color-accent)] bg-[var(--color-accent)]/10 text-[var(--color-accent)]'
                : 'border-[var(--color-border)] text-[var(--color-fg-muted)] hover:border-[var(--color-fg-muted)] hover:text-[var(--color-fg)]',
            )}
          >
            全部 · {posts.length}
          </button>
          {tags.map(({ tag, count }) => (
            <button
              key={tag}
              onClick={() => setActive(tag === active ? null : tag)}
              className={cn(
                'rounded-full border px-3 py-1 font-mono text-xs transition-colors',
                active === tag
                  ? 'border-[var(--color-accent)] bg-[var(--color-accent)]/10 text-[var(--color-accent)]'
                  : 'border-[var(--color-border)] text-[var(--color-fg-muted)] hover:border-[var(--color-fg-muted)] hover:text-[var(--color-fg)]',
              )}
            >
              #{tag} · {count}
            </button>
          ))}
        </div>
      )}

      {filtered.length === 0 ? (
        <div className="rounded-xl border border-dashed border-[var(--color-border)] bg-[var(--color-bg-elevated)]/40 px-6 py-16 text-center text-[var(--color-fg-muted)]">
          还没有文章。把 .mdx 文件放进 <code>content/posts/</code> 即可。
        </div>
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key={active ?? 'all'}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="grid gap-4 sm:grid-cols-2"
          >
            {filtered.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </motion.div>
        </AnimatePresence>
      )}
    </>
  )
}
