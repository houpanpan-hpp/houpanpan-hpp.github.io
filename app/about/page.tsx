import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '关于',
  description:
    '昱泽 · Yu Ze — 阿里巴巴夸克搜索 LLM 后训练工程师。SFT × RLHF，文本 & 多模态。前字节跳动多模态 LLM 预训练。北航 2019。',
}

const EXPERIENCE = [
  {
    period: '2024 — 至今',
    company: 'Alibaba · 阿里巴巴',
    team: '夸克搜索 / Quark',
    role: 'LLM 后训练工程师',
    bullets: [
      '负责夸克搜索场景下的纯文本与多模态模型后训练（SFT + RLHF）。',
      'TODO: 自己加一句具体的、带数字的 ownership —— e.g. "owner of 7B/72B SFT 数据管线，月产 ~Xk 高质量样本，下游模型在 X benchmark 上 +Y pp"。',
      'TODO: 一句搜索/排序业务侧的指标改善，能匿名就匿名。',
    ],
    accent: 'var(--color-accent)',
  },
  {
    period: '2022 — 2024',
    company: 'ByteDance · 字节跳动',
    team: '多模态大模型',
    role: '多模态 LLM 预训练',
    bullets: [
      '参与多模态大模型的预训练阶段：数据管线、训练策略、scaling 行为分析。',
      'TODO: 一句关于规模的事实 —— e.g. "训练数据 >Xb tokens / >Y 张 A100·小时 / 模型参数量 X-Y B"。',
      'TODO: 一句你独立 own 的子系统 —— e.g. "图文对清洗管线 / vision encoder 训练 / 损失实验"。',
    ],
    accent: 'var(--color-accent-2)',
  },
  {
    period: '2015 — 2019',
    company: '北京航空航天大学 · BUAA',
    team: '本科',
    role: 'TODO: 学院 / 专业',
    bullets: [
      'TODO: 一句你愿意公开的方向 —— e.g. "计算机学院 · GPA 排名 / 竞赛 / 论文"。',
    ],
    accent: 'var(--color-accent-3)',
  },
] as const

const NOW_BULLETS = [
  '搭夸克搜索场景下的多模态后训练管线，SFT + RLHF 全栈。',
  '攒博客内容：reward model 失败模式、SFT 数据质量框架、vLLM 在线服务调优。',
  'TODO: 第三件正在做的事。',
]

const SKILLS = [
  { name: 'Python · PyTorch', tag: 'core' },
  { name: 'Transformers · TRL', tag: 'core' },
  { name: 'Megatron-LM / DeepSpeed', tag: 'training' },
  { name: 'vLLM · SGLang', tag: 'serving' },
  { name: 'RLHF (PPO / DPO / GRPO)', tag: 'method' },
  { name: 'SFT 数据管线', tag: 'data' },
  { name: '评测管线 · LLM-as-judge', tag: 'eval' },
  { name: '多模态对齐', tag: 'multimodal' },
] as const

const CONTACTS = [
  { label: 'Email', href: 'mailto:TODO@example.com', value: 'TODO@example.com' },
  { label: 'GitHub', href: 'https://github.com/houpanpan', value: 'github.com/houpanpan' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/TODO', value: 'linkedin.com/in/TODO' },
] as const

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 md:px-6 md:py-16">
      {/* Header */}
      <header className="mb-12 flex flex-col items-start gap-6 md:flex-row md:items-center">
        <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)]">
          {/* Drop a square avatar at /public/avatar.jpg to replace this placeholder. */}
          <div className="grid h-full w-full place-items-center bg-gradient-to-br from-[var(--color-accent)]/20 via-[var(--color-accent-2)]/20 to-[var(--color-accent-3)]/20 font-mono text-2xl text-[var(--color-fg-muted)]">
            YZ
          </div>
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">昱泽 · Yu Ze</h1>
          <p className="mt-2 text-[var(--color-fg-muted)]">
            LLM 后训练工程师 · 阿里巴巴夸克搜索
          </p>
          <p className="mt-1 font-mono text-xs text-[var(--color-fg-subtle)]">
            Hangzhou / Beijing · 中国 ·{' '}
            <Link href="/en/about" className="hover:text-[var(--color-accent)]">
              English version →
            </Link>
          </p>
        </div>
      </header>

      {/* Elevator pitch */}
      <section className="mb-12">
        <p className="text-lg leading-relaxed text-[var(--color-fg)]">
          做 LLM 后训练。文本和多模态模型的 <strong>SFT</strong> 与 <strong>RLHF</strong>，
          覆盖数据管线、训练、评测、上线全链路。当前在
          <strong> 阿里巴巴夸克搜索</strong>，把后训练能力落到搜索场景。
          此前在 <strong>字节跳动</strong> 做多模态 LLM 预训练。
        </p>
        <p className="mt-4 text-[var(--color-fg-muted)]">
          这个站点是我的工作笔记 + 项目档案 + 技术判断的合集。
          想要快速结构化版本，直接去{' '}
          <Link href="/cv" className="text-[var(--color-accent)] hover:underline">
            CV
          </Link>
          ；想看我现在在折腾什么，去{' '}
          <Link href="/now" className="text-[var(--color-accent)] hover:underline">
            /now
          </Link>
          。
        </p>
      </section>

      {/* Experience timeline */}
      <section className="mb-14">
        <h2 className="mb-6 text-xl font-semibold tracking-tight">经历 / Experience</h2>
        <ol className="relative space-y-8 border-l border-[var(--color-border)] pl-6">
          {EXPERIENCE.map((e) => (
            <li key={e.period} className="relative">
              <span
                className="absolute -left-[29px] top-1.5 h-3 w-3 rounded-full ring-4 ring-[var(--color-bg)]"
                style={{ background: e.accent }}
              />
              <div className="mb-1 font-mono text-xs text-[var(--color-fg-muted)]">
                {e.period}
              </div>
              <div className="flex flex-wrap items-baseline gap-x-2">
                <span className="font-semibold">{e.company}</span>
                <span className="text-sm text-[var(--color-fg-muted)]">· {e.team}</span>
              </div>
              <div className="mb-3 text-sm text-[var(--color-fg-muted)]">{e.role}</div>
              <ul className="ml-4 list-disc space-y-1.5 text-sm text-[var(--color-fg)] marker:text-[var(--color-fg-subtle)]">
                {e.bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </section>

      {/* Now */}
      <section className="mb-14">
        <h2 className="mb-4 text-xl font-semibold tracking-tight">
          现在在折腾什么 / Now
        </h2>
        <ul className="space-y-2 text-sm text-[var(--color-fg)]">
          {NOW_BULLETS.map((n, i) => (
            <li key={i} className="flex gap-2">
              <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-[var(--color-accent)]" />
              <span>{n}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Skills */}
      <section className="mb-14">
        <h2 className="mb-4 text-xl font-semibold tracking-tight">技术栈 / Stack</h2>
        <div className="flex flex-wrap gap-2">
          {SKILLS.map((s) => (
            <span
              key={s.name}
              className="rounded-md border border-[var(--color-border)] bg-[var(--color-bg-elevated)]/60 px-2.5 py-1 font-mono text-xs text-[var(--color-fg-muted)]"
            >
              {s.name}
            </span>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section className="mb-6">
        <h2 className="mb-4 text-xl font-semibold tracking-tight">联系 / Contact</h2>
        <ul className="space-y-2 text-sm">
          {CONTACTS.map((c) => (
            <li key={c.label} className="flex items-baseline gap-3">
              <span className="w-20 font-mono text-xs text-[var(--color-fg-muted)]">
                {c.label}
              </span>
              <Link
                href={c.href}
                target={c.href.startsWith('http') ? '_blank' : undefined}
                rel={c.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="text-[var(--color-accent)] transition-colors hover:underline"
              >
                {c.value}
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/cv"
            className="inline-flex items-center gap-2 rounded-md bg-[var(--color-accent)] px-4 py-2 text-sm font-medium text-[var(--color-bg)] transition-transform hover:scale-105"
          >
            查看 CV →
          </Link>
          <Link
            href="/en/about"
            className="inline-flex items-center gap-2 rounded-md border border-[var(--color-border)] bg-[var(--color-bg-elevated)]/60 px-4 py-2 text-sm font-medium text-[var(--color-fg)] transition-colors hover:border-[var(--color-accent)]"
          >
            English version
          </Link>
        </div>
      </section>
    </div>
  )
}
