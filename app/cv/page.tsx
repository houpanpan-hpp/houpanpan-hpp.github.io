import { Fragment } from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'CV',
  description:
    '侯盼 · Hou Pan — LLM 后训练工程师 · 阿里巴巴夸克搜索 · 前字节跳动多模态预训练 · 北航 2019。',
}

const SUMMARY =
  '7 年 AI 算法工程经验，专注大语言模型后训练（SFT、RLHF）与多模态对齐。当前在阿里巴巴夸克搜索负责后训练管线，从数据生产、训练策略、评测体系到上线服务全链路。曾在字节跳动参与多模态 LLM 预训练，对 scaling、训练稳定性与数据质量有体感。'

const EXPERIENCE = [
  {
    period: '2024.XX — 至今',
    company: '阿里巴巴 · Alibaba',
    team: '夸克搜索 · Quark',
    role: 'LLM 后训练工程师 · Senior',
    bullets: [
      'Owner of 搜索场景下文本与多模态模型的 SFT × RLHF 全链路：数据 → 训练 → 评测 → 上线。',
      'TODO: 一句关于 scale —— "训练参数规模 X-YB / 月产 Zk SFT 样本 / DAU 数量级"。',
      'TODO: 一句关于业务影响 —— "rerank / 答案生成在 X 指标上 +Y pp（匿名化）"。',
      'TODO: 一句关于工程影响 —— "重构后训练管线，迭代周期从 N 天缩到 M 天"。',
      'TODO: 一句跨团队协作 —— 数据 / 推理 / 算法对齐之类。',
    ],
  },
  {
    period: '2022.XX — 2024.XX',
    company: '字节跳动 · ByteDance',
    team: '多模态大模型',
    role: '多模态 LLM 预训练算法工程师',
    bullets: [
      '参与多模态大模型预训练阶段：图文对清洗、训练策略、scaling 行为分析。',
      'TODO: 一句关于子系统 —— 你独立 own 的部分。',
      'TODO: 一句关于规模 —— tokens / GPU·小时 / 模型参数。',
      'TODO: 一句结果 —— 在某个 benchmark 或下游任务上的提升。',
    ],
  },
  {
    period: '2019.XX — 2022.XX',
    company: 'TODO（如果有空缺期或前一份工作可以放这里）',
    team: '',
    role: '',
    bullets: ['TODO: 如不需要可以删掉这一段。'],
  },
] as const

const PROJECTS = [
  {
    slug: 'example-project',
    title: 'houpan.dev',
    desc: '本站。Next.js 16 + MDX + Tailwind v4，静态导出到 GitHub Pages。',
  },
  // TODO: 用 4-6 个真实项目替换。每个 50 字以内，保持 link 到 /projects/<slug>。
] as const

const SKILLS_GROUPS = [
  {
    label: '语言 / 框架',
    items: ['Python', 'PyTorch', 'Transformers', 'TRL', 'TypeScript（偶尔）'],
  },
  {
    label: '训练',
    items: ['Megatron-LM', 'DeepSpeed', '内部训练框架', 'FSDP'],
  },
  {
    label: '推理 / 服务',
    items: ['vLLM', 'SGLang', 'TensorRT-LLM'],
  },
  {
    label: '后训练方法',
    items: ['SFT', 'PPO', 'DPO', 'GRPO', 'KTO', 'Reward Modeling'],
  },
  {
    label: '数据 / 评测',
    items: ['LLM-as-judge', '自研评测管线', 'pandas / numpy', '数据清洗 / 去重'],
  },
] as const

const PUBLICATIONS: { title: string; venue: string; href?: string }[] = [
  // TODO: 论文 / 内部技术分享 / 公开 talk 放这里。没有就留空，整段会被隐藏。
]

export default function CVPage() {
  return (
    <article className="cv-page mx-auto max-w-3xl px-4 py-10 md:px-6 md:py-14">
      {/* Toolbar — hidden on print */}
      <div className="cv-no-print mb-8 flex items-center justify-between gap-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-elevated)]/60 px-4 py-2 text-xs text-[var(--color-fg-muted)]">
        <span>
          推荐：<kbd className="rounded border border-[var(--color-border)] bg-[var(--color-bg)] px-1.5 py-0.5 font-mono">⌘P</kbd>{' '}
          打印 / 存为 PDF
        </span>
        <Link href="/en/cv" className="hover:text-[var(--color-accent)]">
          English version →
        </Link>
      </div>

      {/* Header */}
      <header className="mb-8 border-b border-[var(--color-border)] pb-6">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">侯盼 · Hou Pan</h1>
        <p className="mt-1 text-sm text-[var(--color-fg-muted)]">
          LLM 后训练工程师 · 阿里巴巴夸克搜索
        </p>
        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs text-[var(--color-fg-muted)]">
          <span>📧 TODO@example.com</span>
          <span>🌐 houpan.dev</span>
          <span>💻 github.com/houpanpan</span>
          <span>🔗 linkedin.com/in/TODO</span>
        </div>
      </header>

      {/* Summary */}
      <section className="mb-8">
        <h2 className="mb-2 text-sm font-semibold uppercase tracking-widest text-[var(--color-accent)]">
          Summary
        </h2>
        <p className="text-sm leading-relaxed text-[var(--color-fg)]">{SUMMARY}</p>
      </section>

      {/* Experience */}
      <section className="mb-8">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-widest text-[var(--color-accent)]">
          Experience
        </h2>
        {EXPERIENCE.map((e) => (
          <div key={e.period + e.company} className="mb-5 last:mb-0">
            <div className="flex flex-wrap items-baseline justify-between gap-x-2">
              <div className="font-semibold">
                {e.company}
                {e.team && (
                  <span className="font-normal text-[var(--color-fg-muted)]"> · {e.team}</span>
                )}
              </div>
              <div className="font-mono text-xs text-[var(--color-fg-muted)]">{e.period}</div>
            </div>
            {e.role && (
              <div className="mt-0.5 text-sm italic text-[var(--color-fg-muted)]">{e.role}</div>
            )}
            <ul className="mt-2 ml-4 list-disc space-y-1 text-sm text-[var(--color-fg)] marker:text-[var(--color-fg-subtle)]">
              {e.bullets.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      {/* Selected Projects */}
      <section className="mb-8">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-widest text-[var(--color-accent)]">
          Selected Projects
        </h2>
        <ul className="space-y-2 text-sm">
          {PROJECTS.map((p) => (
            <li key={p.slug} className="flex flex-wrap items-baseline gap-x-2">
              <Link
                href={`/projects/${p.slug}`}
                className="font-semibold text-[var(--color-fg)] hover:text-[var(--color-accent)]"
              >
                {p.title}
              </Link>
              <span className="text-[var(--color-fg-muted)]">— {p.desc}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Skills */}
      <section className="mb-8">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-widest text-[var(--color-accent)]">
          Skills
        </h2>
        <dl className="grid grid-cols-1 gap-y-2 text-sm md:grid-cols-[160px_1fr]">
          {SKILLS_GROUPS.map((g) => (
            <Fragment key={g.label}>
              <dt className="font-mono text-xs text-[var(--color-fg-muted)] md:pt-0.5">
                {g.label}
              </dt>
              <dd className="text-[var(--color-fg)]">{g.items.join(' · ')}</dd>
            </Fragment>
          ))}
        </dl>
      </section>

      {/* Education */}
      <section className="mb-8">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-widest text-[var(--color-accent)]">
          Education
        </h2>
        <div className="flex flex-wrap items-baseline justify-between gap-x-2 text-sm">
          <div>
            <span className="font-semibold">北京航空航天大学 · Beihang University (BUAA)</span>
            <span className="text-[var(--color-fg-muted)]"> · TODO 学院 / 专业 / 学位</span>
          </div>
          <div className="font-mono text-xs text-[var(--color-fg-muted)]">2015 — 2019</div>
        </div>
      </section>

      {PUBLICATIONS.length > 0 && (
        <section className="mb-8">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-widest text-[var(--color-accent)]">
            Publications & Talks
          </h2>
          <ul className="space-y-2 text-sm">
            {PUBLICATIONS.map((p) => (
              <li key={p.title}>
                {p.href ? (
                  <Link
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--color-accent)] hover:underline"
                  >
                    {p.title}
                  </Link>
                ) : (
                  <span className="font-semibold">{p.title}</span>
                )}
                <span className="text-[var(--color-fg-muted)]"> — {p.venue}</span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  )
}
