import Link from 'next/link'

export function SiteFooter() {
  const year = new Date().getFullYear()
  return (
    <footer className="mt-24 border-t border-[var(--color-border)]">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-[var(--color-fg-muted)] md:flex-row md:px-6">
        <div className="flex items-center gap-2 font-mono">
          <span className="text-[var(--color-accent)]">$</span>
          <span>echo &quot;© {year} houpan&quot;</span>
        </div>
        <nav className="flex items-center gap-5">
          <Link
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-[var(--color-fg)]"
          >
            GitHub
          </Link>
          <Link href="/rss.xml" className="transition-colors hover:text-[var(--color-fg)]">
            RSS
          </Link>
          <Link href="/about" className="transition-colors hover:text-[var(--color-fg)]">
            关于
          </Link>
        </nav>
      </div>
    </footer>
  )
}
