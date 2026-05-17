import type { Metadata } from 'next'
import './globals.css'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'

export const metadata: Metadata = {
  title: {
    default: 'houpan.dev — 技术、思考、日常',
    template: '%s · houpan.dev',
  },
  description: '一个 AI / 算法工程师的技术博客和经验记录。',
  metadataBase: new URL('https://houpan.dev'),
  openGraph: {
    title: 'houpan.dev',
    description: '一个 AI / 算法工程师的技术博客和经验记录。',
    type: 'website',
    locale: 'zh_CN',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" className="dark">
      <body className="min-h-screen flex flex-col">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  )
}
