import type { MDXComponents } from 'mdx/types'
import Link from 'next/link'
import type { ComponentPropsWithoutRef } from 'react'

export function useMDXComponents(components: MDXComponents = {}): MDXComponents {
  return {
    a: ({ href, children, ...props }: ComponentPropsWithoutRef<'a'>) => {
      const isInternal = href?.startsWith('/') || href?.startsWith('#')
      if (isInternal && href) {
        return (
          <Link href={href} className="text-[var(--color-accent)] underline-offset-4 hover:underline">
            {children}
          </Link>
        )
      }
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--color-accent)] underline-offset-4 hover:underline"
          {...props}
        >
          {children}
        </a>
      )
    },
    ...components,
  }
}
