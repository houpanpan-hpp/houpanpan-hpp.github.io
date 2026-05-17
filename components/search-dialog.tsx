'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import Fuse from 'fuse.js'

type SearchEntry = {
  title: string
  summary: string
  tags: string[]
  category: string
  slug: string
  date: string
  type: 'post' | 'project'
}

type SearchDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const [query, setQuery] = useState('')
  const [entries, setEntries] = useState<SearchEntry[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  // Load search index lazily on first open
  useEffect(() => {
    if (!open || entries.length > 0) return
    fetch('/search-index.json')
      .then((r) => (r.ok ? r.json() : []))
      .then((data: SearchEntry[]) => setEntries(data))
      .catch(() => setEntries([]))
  }, [open, entries.length])

  // Global Cmd+K / Ctrl+K
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        onOpenChange(!open)
      }
      if (e.key === 'Escape' && open) {
        onOpenChange(false)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open, onOpenChange])

  // Focus input when opened
  useEffect(() => {
    if (open) {
      setQuery('')
      requestAnimationFrame(() => inputRef.current?.focus())
    }
  }, [open])

  const fuse = useMemo(
    () =>
      new Fuse(entries, {
        keys: [
          { name: 'title', weight: 0.5 },
          { name: 'summary', weight: 0.3 },
          { name: 'tags', weight: 0.2 },
        ],
        threshold: 0.4,
        ignoreLocation: true,
      }),
    [entries],
  )

  const results = useMemo(() => {
    if (!query.trim()) return entries.slice(0, 6)
    return fuse.search(query, { limit: 8 }).map((r) => r.item)
  }, [query, entries, fuse])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-start overflow-y-auto bg-black/60 px-4 pt-[10vh] backdrop-blur-sm"
      onClick={() => onOpenChange(false)}
    >
      <div
        className="glass glow-border w-full max-w-xl rounded-xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-[var(--color-border)] px-4 py-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-[var(--color-fg-muted)]"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="搜索文章、项目、标签..."
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-[var(--color-fg-subtle)]"
          />
          <kbd className="rounded border border-[var(--color-border)] bg-[var(--color-bg)] px-1.5 py-0.5 font-mono text-[10px] text-[var(--color-fg-muted)]">
            ESC
          </kbd>
        </div>

        <ul className="max-h-[60vh] overflow-y-auto p-2">
          {results.length === 0 ? (
            <li className="px-3 py-8 text-center text-sm text-[var(--color-fg-muted)]">
              {entries.length === 0 ? '索引尚未生成' : '没有匹配结果'}
            </li>
          ) : (
            results.map((entry) => (
              <li key={`${entry.type}-${entry.slug}`}>
                <Link
                  href={entry.type === 'post' ? `/blog/${entry.slug}` : `/projects#${entry.slug}`}
                  onClick={() => onOpenChange(false)}
                  className="block rounded-lg px-3 py-2.5 transition-colors hover:bg-[var(--color-bg-elevated)]"
                >
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="truncate font-medium">{entry.title}</span>
                    <span className="shrink-0 font-mono text-[10px] uppercase text-[var(--color-fg-subtle)]">
                      {entry.type}
                    </span>
                  </div>
                  {entry.summary && (
                    <p className="mt-0.5 line-clamp-1 text-xs text-[var(--color-fg-muted)]">
                      {entry.summary}
                    </p>
                  )}
                </Link>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  )
}
