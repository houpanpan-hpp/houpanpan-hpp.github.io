import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getAllProjects, getProjectBySlug } from '@/lib/projects'
import { useMDXComponents } from '@/mdx-components'
import { mdxOptions } from '@/lib/mdx-options'

type Params = { slug: string }

export async function generateStaticParams(): Promise<Params[]> {
  return getAllProjects().map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>
}): Promise<Metadata> {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) return {}
  return {
    title: project.title,
    description: project.summary,
  }
}

export default async function ProjectPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) notFound()

  const components = useMDXComponents()

  return (
    <article className="mx-auto max-w-3xl px-4 py-10 md:px-6 md:py-16">
      <Link
        href="/projects"
        className="mb-8 inline-flex items-center gap-1 font-mono text-xs text-[var(--color-fg-muted)] transition-colors hover:text-[var(--color-accent)]"
      >
        ← 返回项目
      </Link>

      <header className="mb-10 border-b border-[var(--color-border)] pb-8">
        {project.featured && (
          <span className="mb-3 inline-block rounded-full bg-[var(--color-accent)]/15 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-[var(--color-accent)]">
            featured
          </span>
        )}
        <h1 className="text-3xl font-bold leading-tight tracking-tight md:text-4xl">
          {project.title}
        </h1>
        {project.summary && (
          <p className="mt-4 text-lg text-[var(--color-fg-muted)]">{project.summary}</p>
        )}
        {project.stack && project.stack.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-1.5">
            {project.stack.map((s) => (
              <span
                key={s}
                className="rounded-md border border-[var(--color-border)] bg-[var(--color-bg-elevated)] px-2 py-0.5 font-mono text-[10px] text-[var(--color-fg-muted)]"
              >
                {s}
              </span>
            ))}
          </div>
        )}
        {(project.url || project.repo) && (
          <div className="mt-5 flex flex-wrap gap-3 text-sm">
            {project.url && (
              <Link
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-md bg-[var(--color-accent)] px-3 py-1.5 text-[var(--color-bg)] transition-transform hover:scale-105"
              >
                访问站点 →
              </Link>
            )}
            {project.repo && (
              <Link
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-md border border-[var(--color-border)] bg-[var(--color-bg-elevated)] px-3 py-1.5 text-[var(--color-fg)] transition-colors hover:border-[var(--color-accent)]"
              >
                查看源码
              </Link>
            )}
          </div>
        )}
      </header>

      <div className="prose prose-custom prose-invert max-w-none prose-headings:scroll-mt-20 prose-pre:bg-transparent prose-pre:p-0">
        <MDXRemote
          source={project.content}
          components={components}
          options={{ mdxOptions: mdxOptions as never }}
        />
      </div>
    </article>
  )
}
