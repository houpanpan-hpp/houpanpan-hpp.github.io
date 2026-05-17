'use client'

import GiscusWidget from '@giscus/react'

const repo = process.env.NEXT_PUBLIC_GISCUS_REPO
const repoId = process.env.NEXT_PUBLIC_GISCUS_REPO_ID
const category = process.env.NEXT_PUBLIC_GISCUS_CATEGORY
const categoryId = process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID

export function Giscus() {
  const configured = repo && repoId && category && categoryId
  if (!configured) {
    return (
      <div className="rounded-xl border border-dashed border-[var(--color-border)] bg-[var(--color-bg-elevated)]/40 px-6 py-8 text-center text-sm text-[var(--color-fg-muted)]">
        评论系统未配置。在 <code>.env.local</code> 设置{' '}
        <code>NEXT_PUBLIC_GISCUS_*</code> 后启用 Giscus。
      </div>
    )
  }
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
      theme="dark_dimmed"
      lang="zh-CN"
      loading="lazy"
    />
  )
}
