import Link from 'next/link'

export function SiteFooter() {
  const year = new Date().getFullYear()
  return (
    <footer className="mt-24 border-t border-[var(--color-border)]">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-[var(--color-fg-muted)] md:flex-row md:px-6">
        <div className="flex items-center gap-2 font-mono">
          <span className="text-[var(--color-accent)]">$</span>
          <span>echo &quot;© {year} 昱泽 · Yu Ze&quot;</span>
        </div>
        <nav className="flex items-center gap-5">
          <Link
            href="https://github.com/houpanpan"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-[var(--color-fg)]"
          >
            GitHub
          </Link>
          <Link
            href="https://www.linkedin.com/in/TODO"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-[var(--color-fg)]"
          >
            LinkedIn
          </Link>
          <Link href="/cv" className="transition-colors hover:text-[var(--color-fg)]">
            CV
          </Link>
          <Link href="/about" className="transition-colors hover:text-[var(--color-fg)]">
            关于
          </Link>
        </nav>
      </div>
    </footer>
  )
}
