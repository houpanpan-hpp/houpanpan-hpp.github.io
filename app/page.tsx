import Link from 'next/link'
import { Hero } from '@/components/hero'
import { PostCard } from '@/components/post-card'
import { getAllPosts } from '@/lib/posts'
import { getAllProjects } from '@/lib/projects'

export default function HomePage() {
  const posts = getAllPosts().slice(0, 4)
  const projects = getAllProjects().slice(0, 3)

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 md:px-6 md:py-12">
      <Hero />

      {/* Latest posts */}
      <section className="mt-20">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">最新文章</h2>
            <p className="mt-1 text-sm text-[var(--color-fg-muted)]">
              技术分享、项目复盘与日常思考
            </p>
          </div>
          <Link
            href="/blog"
            className="text-sm text-[var(--color-fg-muted)] transition-colors hover:text-[var(--color-accent)]"
          >
            全部 →
          </Link>
        </div>
        {posts.length === 0 ? (
          <EmptyState text="还没有文章。在 content/posts/ 添加 .mdx 文件即可显示。" />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {posts.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        )}
      </section>

      {/* Featured projects */}
      <section className="mt-20">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">精选项目</h2>
            <p className="mt-1 text-sm text-[var(--color-fg-muted)]">
              一些我做过、还在做、或许会做的东西
            </p>
          </div>
          <Link
            href="/projects"
            className="text-sm text-[var(--color-fg-muted)] transition-colors hover:text-[var(--color-accent)]"
          >
            全部 →
          </Link>
        </div>
        {projects.length === 0 ? (
          <EmptyState text="还没有项目。在 content/projects/ 添加 .mdx 文件即可显示。" />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((p) => (
              <Link
                key={p.slug}
                href={p.url ?? `#${p.slug}`}
                target={p.url ? '_blank' : undefined}
                rel={p.url ? 'noopener noreferrer' : undefined}
                className="glass glow-border group block rounded-xl p-5 transition-transform hover:-translate-y-0.5"
              >
                <div className="mb-2 flex items-center gap-2 font-mono text-xs text-[var(--color-fg-muted)]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
                  {p.stack?.[0] ?? 'project'}
                </div>
                <h3 className="font-semibold transition-colors group-hover:text-[var(--color-accent)]">
                  {p.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm text-[var(--color-fg-muted)]">
                  {p.summary}
                </p>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="rounded-xl border border-dashed border-[var(--color-border)] bg-[var(--color-bg-elevated)]/40 px-6 py-10 text-center text-sm text-[var(--color-fg-muted)]">
      {text}
    </div>
  )
}
