import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getAllPosts, getPostBySlug } from '@/lib/posts'
import { useMDXComponents } from '@/mdx-components'
import { mdxOptions } from '@/lib/mdx-options'
import { formatDate } from '@/lib/utils'
import { Giscus } from '@/components/giscus'

type Params = { slug: string }

export async function generateStaticParams(): Promise<Params[]> {
  return getAllPosts().map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>
}): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      type: 'article',
      publishedTime: post.date,
      tags: post.tags,
    },
  }
}

export default async function PostPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  const components = useMDXComponents()

  return (
    <article className="mx-auto max-w-3xl px-4 py-10 md:px-6 md:py-16">
      <Link
        href="/blog"
        className="mb-8 inline-flex items-center gap-1 font-mono text-xs text-[var(--color-fg-muted)] transition-colors hover:text-[var(--color-accent)]"
      >
        ← 返回博客
      </Link>

      <header className="mb-10 border-b border-[var(--color-border)] pb-8">
        <div className="mb-4 flex flex-wrap items-center gap-3 font-mono text-xs text-[var(--color-fg-muted)]">
          <time>{formatDate(post.date)}</time>
          <span className="text-[var(--color-fg-subtle)]">·</span>
          <span>{post.readingMinutes} min read</span>
          <span className="text-[var(--color-fg-subtle)]">·</span>
          <span className="text-[var(--color-accent)]">{post.category}</span>
        </div>
        <h1 className="text-3xl font-bold leading-tight tracking-tight md:text-4xl">
          {post.title}
        </h1>
        {post.summary && (
          <p className="mt-4 text-lg text-[var(--color-fg-muted)]">{post.summary}</p>
        )}
        {post.tags.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-1.5">
            {post.tags.map((t) => (
              <Link
                key={t}
                href={`/tags/${encodeURIComponent(t)}`}
                className="rounded-md border border-[var(--color-border)] bg-[var(--color-bg-elevated)] px-2 py-0.5 font-mono text-[10px] text-[var(--color-fg-muted)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
              >
                #{t}
              </Link>
            ))}
          </div>
        )}
      </header>

      <div className="prose prose-custom prose-invert max-w-none prose-headings:scroll-mt-20 prose-pre:bg-transparent prose-pre:p-0">
        <MDXRemote
          source={post.content}
          components={components}
          // unified plugin tuple types aren't exposed as a direct dep;
          // the runtime accepts our shape verbatim.
          options={{ mdxOptions: mdxOptions as never }}
        />
      </div>

      <hr className="my-12 border-[var(--color-border)]" />
      <Giscus />
    </article>
  )
}
