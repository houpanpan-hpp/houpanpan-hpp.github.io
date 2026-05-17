import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-4 text-center">
      <p className="font-mono text-xs uppercase tracking-widest text-[var(--color-fg-muted)]">
        404 · not_found
      </p>
      <h1 className="mt-4 bg-gradient-to-r from-[var(--color-accent)] via-[var(--color-accent-2)] to-[var(--color-accent-3)] bg-clip-text text-7xl font-bold text-transparent">
        404
      </h1>
      <p className="mt-4 text-[var(--color-fg-muted)]">
        这条路径上的内容暂时不存在或已被搬走。
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-md border border-[var(--color-border)] bg-[var(--color-bg-elevated)] px-4 py-2 text-sm transition-colors hover:border-[var(--color-accent)]"
      >
        ← 回到首页
      </Link>
    </div>
  )
}
