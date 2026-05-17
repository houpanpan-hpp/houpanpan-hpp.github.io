import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllReports } from '@/lib/reports'
import { formatDate } from '@/lib/utils'

export const metadata: Metadata = {
  title: '报告',
  description: '评测报告、可视化分析、模型 demo 等独立 HTML 内容。',
}

export default function ReportsPage() {
  const reports = getAllReports()

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 md:px-6 md:py-14">
      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">报告</h1>
        <p className="mt-2 text-[var(--color-fg-muted)]">
          评测报告、可视化分析、模型 demo —— 独立的 HTML 页面带文字注解
        </p>
      </header>

      {reports.length === 0 ? (
        <div className="rounded-xl border border-dashed border-[var(--color-border)] bg-[var(--color-bg-elevated)]/40 px-6 py-16 text-center text-[var(--color-fg-muted)]">
          还没有报告。把 .mdx 写进 <code>content/reports/</code>，HTML 文件丢进 <code>public/reports/</code> 即可。
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {reports.map((r) => (
            <Link
              key={r.slug}
              href={`/reports/${r.slug}`}
              className="glass glow-border group block rounded-xl p-5 transition-transform hover:-translate-y-0.5"
            >
              <div className="mb-3 flex items-center gap-3 font-mono text-xs text-[var(--color-fg-muted)]">
                <span className="inline-flex items-center gap-1.5 text-[var(--color-accent-2)]">
                  <span className="h-1.5 w-1.5 rounded-full bg-current" />
                  报告
                </span>
                <span className="text-[var(--color-fg-subtle)]">·</span>
                <time>{formatDate(r.date)}</time>
                {r.html && (
                  <>
                    <span className="text-[var(--color-fg-subtle)]">·</span>
                    <span className="text-[var(--color-accent)]">交互</span>
                  </>
                )}
              </div>
              <h2 className="text-lg font-semibold tracking-tight transition-colors group-hover:text-[var(--color-accent)]">
                {r.title}
              </h2>
              {r.summary && (
                <p className="mt-2 line-clamp-2 text-sm text-[var(--color-fg-muted)]">
                  {r.summary}
                </p>
              )}
              {r.tags && r.tags.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {r.tags.slice(0, 4).map((t) => (
                    <span
                      key={t}
                      className="rounded-md border border-[var(--color-border)] bg-[var(--color-bg)]/60 px-2 py-0.5 font-mono text-[10px] text-[var(--color-fg-muted)]"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
