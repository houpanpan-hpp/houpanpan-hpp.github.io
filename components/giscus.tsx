'use client'

import GiscusWidget from '@giscus/react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

const repo = process.env.NEXT_PUBLIC_GISCUS_REPO
const repoId = process.env.NEXT_PUBLIC_GISCUS_REPO_ID
const category = process.env.NEXT_PUBLIC_GISCUS_CATEGORY
const categoryId = process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID

export function Giscus() {
  const configured = repo && repoId && category && categoryId
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!configured) {
    return (
      <div className="rounded-xl border border-dashed border-[var(--color-border)] bg-[var(--color-bg-elevated)]/40 px-6 py-8 text-center text-sm text-[var(--color-fg-muted)]">
        评论系统未配置。在 <code>.env.local</code> 设置{' '}
        <code>NEXT_PUBLIC_GISCUS_*</code> 后启用 Giscus。
      </div>
    )
  }

  // Avoid mounting the iframe until we know the theme, so it doesn't
  // flash dark before swapping to light (or vice versa).
  if (!mounted) {
    return <div className="min-h-[200px]" aria-hidden="true" />
  }

  const giscusTheme = resolvedTheme === 'light' ? 'light' : 'dark_dimmed'

  return (
    <GiscusWidget
      id="comments"
      repo={repo as `${string}/${string}`}
      repoId={repoId!}
      category={category!}
      categoryId={categoryId!}
      mapping="pathname"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="top"
      theme={giscusTheme}
      lang="zh-CN"
      loading="lazy"
    />
  )
}
