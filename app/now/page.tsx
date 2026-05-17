import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Now',
  description: '我现在在折腾什么 —— 每月手动更新一次。',
}

const UPDATED = '2026-05'

const SHIPPING = [
  '夸克搜索场景下的多模态 SFT 数据管线 v2：清洗 → 打标 → 质量审计 → 训练样本',
  'Reward model 在搜索答案生成上的失败模式分析，准备写成博文',
  'TODO: 第三件正在做的事',
]

const READING = [
  'TODO: 一篇你正在读的 paper',
  'TODO: 一本书或一份长文',
  'TODO: 一个工程上让你印象深刻的 repo',
]

const NEXT = [
  'M1 deep post: Reward model failure modes I keep running into',
  'M1 short notes: 两篇近期 RLHF paper 笔记',
  'M1 project: 把评测管线（content/projects/）补成完整 case study',
]

export default function NowPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 md:px-6 md:py-16">
      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Now</h1>
        <p className="mt-2 text-[var(--color-fg-muted)]">
          我现在在做什么、读什么、下一步打算干什么。
          <span className="ml-2 font-mono text-xs text-[var(--color-fg-subtle)]">
            updated {UPDATED}
          </span>
        </p>
        <p className="mt-2 text-xs text-[var(--color-fg-subtle)]">
          灵感来自{' '}
          <Link
            href="https://nownownow.com/about"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--color-accent)]"
          >
            /now movement
          </Link>
          ，每月手动刷新一次。
        </p>
      </header>

      <Section title="正在做 / Shipping" items={SHIPPING} accent="var(--color-accent)" />
      <Section title="正在读 / Reading" items={READING} accent="var(--color-accent-2)" />
      <Section title="下一步 / Next" items={NEXT} accent="var(--color-accent-3)" />
    </div>
  )
}

function Section({
  title,
  items,
  accent,
}: {
  title: string
  items: readonly string[]
  accent: string
}) {
  return (
    <section className="mb-10">
      <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold tracking-tight">
        <span className="h-1.5 w-1.5 rounded-full" style={{ background: accent }} />
        {title}
      </h2>
      <ul className="space-y-2 text-sm text-[var(--color-fg)]">
        {items.map((it, i) => (
          <li key={i} className="flex gap-2">
            <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-[var(--color-fg-subtle)]" />
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
