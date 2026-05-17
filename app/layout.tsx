import type { Metadata } from 'next'
import './globals.css'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'

const SITE_DESCRIPTION =
  '侯盼 · Hou Pan — 阿里巴巴夸克搜索 LLM 后训练工程师。SFT × RLHF，文本与多模态。前字节跳动多模态 LLM 预训练。北航 2019。'

export const metadata: Metadata = {
  title: {
    default: 'houpan.dev — LLM 后训练 · 工程笔记 · 项目档案',
    template: '%s · houpan.dev',
  },
  description: SITE_DESCRIPTION,
  metadataBase: new URL('https://houpan.dev'),
  authors: [{ name: 'Hou Pan' }],
  keywords: [
    'LLM',
    'post-training',
    'SFT',
    'RLHF',
    'multimodal',
    'Alibaba',
    'Quark',
    'ByteDance',
    'BUAA',
    'Hou Pan',
    '侯盼',
    'AI engineer',
  ],
  openGraph: {
    title: 'houpan.dev — Hou Pan',
    description: SITE_DESCRIPTION,
    type: 'website',
    locale: 'zh_CN',
    alternateLocale: 'en_US',
    siteName: 'houpan.dev',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'houpan.dev — Hou Pan',
    description: SITE_DESCRIPTION,
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
