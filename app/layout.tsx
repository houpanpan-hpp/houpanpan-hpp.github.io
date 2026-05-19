import type { Metadata } from 'next'
import './globals.css'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { ThemeProvider } from '@/components/theme-provider'

const SITE_DESCRIPTION =
  '昱泽 · Yu Ze — 阿里巴巴夸克搜索 LLM 后训练工程师。SFT × RLHF，文本与多模态。前字节跳动多模态 LLM 预训练。北航 2019。'

export const metadata: Metadata = {
  title: {
    default: 'yuze.dev — LLM 后训练 · 工程笔记 · 项目档案',
    template: '%s · yuze.dev',
  },
  description: SITE_DESCRIPTION,
  metadataBase: new URL('https://houpanpan-hpp.github.io'),
  authors: [{ name: 'Yu Ze' }],
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
    'Yu Ze',
    '昱泽',
    'AI engineer',
  ],
  openGraph: {
    title: '昱泽 · Yu Ze',
    description: SITE_DESCRIPTION,
    type: 'website',
    locale: 'zh_CN',
    alternateLocale: 'en_US',
    siteName: 'yuze.dev',
  },
  twitter: {
    card: 'summary_large_image',
    title: '昱泽 · Yu Ze',
    description: SITE_DESCRIPTION,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </ThemeProvider>
      </body>
    </html>
  )
}
