import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllProjects } from '@/lib/projects'

export const metadata: Metadata = {
  title: '项目',
  description: '我做过的、还在做的、或许会做的项目',
}

export default function ProjectsPage() {
  const projects = getAllProjects()
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 md:px-6 md:py-14">
      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">项目</h1>
        <p className="mt-2 text-[var(--color-fg-muted)]">
          一些我做过、还在做、或许会做的东西
        </p>
      </header>

      {projects.length === 0 ? (
        <div className="rounded-xl border border-dashed border-[var(--color-border)] bg-[var(--color-bg-elevated)]/40 px-6 py-16 text-center text-[var(--color-fg-muted)]">
          还没有项目。把 .mdx 文件放进 <code>content/projects/</code> 即可。
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <article
              key={p.slug}
              id={p.slug}
              className="glass glow-border group relative flex flex-col rounded-xl p-5 transition-transform hover:-translate-y-0.5"
            >
              <Link
                href={`/projects/${p.slug}`}
                className="absolute inset-0 z-0 rounded-xl"
                aria-label={`查看项目 ${p.title}`}
              />
              <div className="relative z-10 flex flex-col">
                <div className="mb-3 flex items-center gap-2">
                  {p.featured && (
                    <span className="rounded-full bg-[var(--color-accent)]/15 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-[var(--color-accent)]">
                      featured
                    </span>
                  )}
                </div>
                <h2 className="text-lg font-semibold transition-colors group-hover:text-[var(--color-accent)]">
                  {p.title}
                </h2>
                <p className="mt-2 flex-1 text-sm text-[var(--color-fg-muted)]">
                  {p.summary}
                </p>
                {p.stack && p.stack.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {p.stack.map((s) => (
                      <span
                        key={s}
                        className="rounded-md border border-[var(--color-border)] bg-[var(--color-bg)]/60 px-2 py-0.5 font-mono text-[10px] text-[var(--color-fg-muted)]"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                )}
                {(p.url || p.repo) && (
                  <div className="relative z-20 mt-5 flex gap-3 text-xs">
                    {p.url && (
                      <Link
                        href={p.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[var(--color-accent)] transition-colors hover:underline"
                      >
                        站点 →
                      </Link>
                    )}
                    {p.repo && (
                      <Link
                        href={p.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[var(--color-fg-muted)] transition-colors hover:text-[var(--color-fg)]"
                      >
                        源码
                      </Link>
                    )}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}
