import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getAllReports, getReportBySlug } from '@/lib/reports'
import { useMDXComponents } from '@/mdx-components'
import { mdxOptions } from '@/lib/mdx-options'
import { formatDate } from '@/lib/utils'

type Params = { slug: string }

export async function generateStaticParams(): Promise<Params[]> {
  return getAllReports().map((r) => ({ slug: r.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>
}): Promise<Metadata> {
  const { slug } = await params
  const report = getReportBySlug(slug)
  if (!report) return {}
  return {
    title: report.title,
    description: report.summary,
  }
}

export default async function ReportPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params
  const report = getReportBySlug(slug)
  if (!report) notFound()

  const components = useMDXComponents()

  return (
    <article className="mx-auto max-w-5xl px-4 py-10 md:px-6 md:py-14">
      <Link
        href="/reports"
        className="mb-6 inline-flex items-center gap-1 font-mono text-xs text-[var(--color-fg-muted)] transition-colors hover:text-[var(--color-accent)]"
      >
        ← 返回报告
      </Link>

      <header className="mb-8 border-b border-[var(--color-border)] pb-8">
        <div className="mb-3 flex flex-wrap items-center gap-3 font-mono text-xs text-[var(--color-fg-muted)]">
          <span className="text-[var(--color-accent-2)]">报告</span>
          <span className="text-[var(--color-fg-subtle)]">·</span>
          <time>{formatDate(report.date)}</time>
          {report.html && (
            <>
              <span className="text-[var(--color-fg-subtle)]">·</span>
              <Link
                href={report.html}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-accent)] hover:underline"
              >
                全屏打开 ↗
              </Link>
            </>
          )}
        </div>
        <h1 className="text-3xl font-bold leading-tight tracking-tight md:text-4xl">
          {report.title}
        </h1>
        {report.summary && (
          <p className="mt-3 text-lg text-[var(--color-fg-muted)]">{report.summary}</p>
        )}
        {report.tags && report.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {report.tags.map((t) => (
              <span
                key={t}
                className="rounded-md border border-[var(--color-border)] bg-[var(--color-bg-elevated)] px-2 py-0.5 font-mono text-[10px] text-[var(--color-fg-muted)]"
              >
                #{t}
              </span>
            ))}
          </div>
        )}
      </header>

      {report.html && (
        <div className="mb-10 overflow-hidden rounded-xl border border-[var(--color-border)] bg-white">
          <iframe
            src={report.html}
            title={report.title}
            loading="lazy"
            className="h-[800px] w-full"
            style={{ height: `${report.height}px` }}
          />
        </div>
      )}

      {report.content.trim() && (
        <div className="prose prose-custom prose-invert max-w-none prose-headings:scroll-mt-20 prose-pre:bg-transparent prose-pre:p-0">
          <MDXRemote
            source={report.content}
            components={components}
            options={{ mdxOptions: mdxOptions as never }}
          />
        </div>
      )}
    </article>
  )
}
