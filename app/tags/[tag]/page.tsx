import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { PostCard } from '@/components/post-card'
import { getAllTags, getPostsByTag } from '@/lib/posts'

type Params = { tag: string }

export async function generateStaticParams(): Promise<Params[]> {
  return getAllTags().map((t) => ({ tag: encodeURIComponent(t.tag) }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>
}): Promise<Metadata> {
  const { tag } = await params
  const decoded = decodeURIComponent(tag)
  return {
    title: `#${decoded}`,
    description: `所有标签为 ${decoded} 的文章`,
  }
}

export default async function TagPage({ params }: { params: Promise<Params> }) {
  const { tag } = await params
  const decoded = decodeURIComponent(tag)
  const posts = getPostsByTag(decoded)
  if (posts.length === 0) notFound()

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 md:px-6 md:py-14">
      <Link
        href="/blog"
        className="mb-6 inline-flex items-center gap-1 font-mono text-xs text-[var(--color-fg-muted)] transition-colors hover:text-[var(--color-accent)]"
      >
        ← 返回博客
      </Link>
      <header className="mb-10">
        <h1 className="font-mono text-3xl font-bold tracking-tight md:text-4xl">
          <span className="text-[var(--color-fg-subtle)]">#</span>
          <span className="bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-2)] bg-clip-text text-transparent">
            {decoded}
          </span>
        </h1>
        <p className="mt-2 text-[var(--color-fg-muted)]">{posts.length} 篇文章</p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2">
        {posts.map((p) => (
          <PostCard key={p.slug} post={p} />
        ))}
      </div>
    </div>
  )
}
