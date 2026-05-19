import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Yu Ze — LLM post-training engineer at Alibaba Quark Search. SFT × RLHF for text and multimodal models. Previously multimodal LLM pretraining at ByteDance. BUAA 2019.',
}

const EXPERIENCE = [
  {
    period: '2024 — present',
    company: 'Alibaba',
    team: 'Quark Search',
    role: 'LLM Post-Training Engineer',
    bullets: [
      'Own the post-training stack (SFT + RLHF) for text and multimodal models that ship into Quark Search.',
      'TODO: a concrete ownership line with numbers — e.g. "owner of the SFT data pipeline producing ~Xk high-quality samples / month, +Y pp on internal benchmark Z".',
      'TODO: a business-facing metric, anonymized as needed — e.g. "lifted answer-generation quality on user metric W by Z%".',
    ],
    accent: 'var(--color-accent)',
  },
  {
    period: '2022 — 2024',
    company: 'ByteDance',
    team: 'Multimodal LLMs',
    role: 'Multimodal LLM Pretraining',
    bullets: [
      'Worked on multimodal LLM pretraining: data pipeline, training strategy, scaling-behaviour analysis.',
      'TODO: a fact about scale — tokens, GPU·hours, parameter count.',
      'TODO: a sub-system you owned end-to-end.',
    ],
    accent: 'var(--color-accent-2)',
  },
  {
    period: '2015 — 2019',
    company: 'Beihang University (BUAA)',
    team: 'Undergrad',
    role: 'TODO: school / major',
    bullets: ['TODO: one line you want public — coursework, awards, papers.'],
    accent: 'var(--color-accent-3)',
  },
] as const

const NOW_BULLETS = [
  'Building the multimodal post-training stack (SFT + RLHF) for Quark Search.',
  'Writing about reward-model failure modes, SFT data quality, and vLLM serving tradeoffs.',
  'TODO: third thing you are actively shipping or studying.',
]

const SKILLS = [
  'Python · PyTorch',
  'Transformers · TRL',
  'Megatron-LM / DeepSpeed',
  'vLLM · SGLang',
  'RLHF (PPO / DPO / GRPO)',
  'SFT data pipelines',
  'Eval pipelines · LLM-as-judge',
  'Multimodal alignment',
] as const

const CONTACTS = [
  { label: 'Email', href: 'mailto:TODO@example.com', value: 'TODO@example.com' },
  { label: 'GitHub', href: 'https://github.com/houpanpan', value: 'github.com/houpanpan' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/TODO', value: 'linkedin.com/in/TODO' },
] as const

export default function AboutEnPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 md:px-6 md:py-16">
      <header className="mb-12 flex flex-col items-start gap-6 md:flex-row md:items-center">
        <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)]">
          <div className="grid h-full w-full place-items-center bg-gradient-to-br from-[var(--color-accent)]/20 via-[var(--color-accent-2)]/20 to-[var(--color-accent-3)]/20 font-mono text-2xl text-[var(--color-fg-muted)]">
            YZ
          </div>
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Yu Ze</h1>
          <p className="mt-2 text-[var(--color-fg-muted)]">
            LLM Post-Training Engineer · Alibaba Quark Search
          </p>
          <p className="mt-1 font-mono text-xs text-[var(--color-fg-subtle)]">
            Hangzhou / Beijing · China ·{' '}
            <Link href="/about" className="hover:text-[var(--color-accent)]">
              中文版本 →
            </Link>
          </p>
        </div>
      </header>

      <section className="mb-12">
        <p className="text-lg leading-relaxed text-[var(--color-fg)]">
          I work on LLM post-training. <strong>SFT</strong> and <strong>RLHF</strong> for both
          text-only and multimodal models, end to end — data pipelines, training, eval, and
          serving. Currently at <strong>Alibaba Quark Search</strong>, applying post-training
          to a real-world search product. Previously at <strong>ByteDance</strong> on
          multimodal LLM pretraining.
        </p>
        <p className="mt-4 text-[var(--color-fg-muted)]">
          This site is my notebook, project archive, and engineering judgement log. For a
          structured one-pager, see{' '}
          <Link href="/en/cv" className="text-[var(--color-accent)] hover:underline">
            CV
          </Link>
          ; for what I am shipping right now, see{' '}
          <Link href="/now" className="text-[var(--color-accent)] hover:underline">
            /now
          </Link>
          .
        </p>
      </section>

      <section className="mb-14">
        <h2 className="mb-6 text-xl font-semibold tracking-tight">Experience</h2>
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

      <section className="mb-14">
        <h2 className="mb-4 text-xl font-semibold tracking-tight">Now</h2>
        <ul className="space-y-2 text-sm text-[var(--color-fg)]">
          {NOW_BULLETS.map((n, i) => (
            <li key={i} className="flex gap-2">
              <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-[var(--color-accent)]" />
              <span>{n}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-14">
        <h2 className="mb-4 text-xl font-semibold tracking-tight">Stack</h2>
        <div className="flex flex-wrap gap-2">
          {SKILLS.map((s) => (
            <span
              key={s}
              className="rounded-md border border-[var(--color-border)] bg-[var(--color-bg-elevated)]/60 px-2.5 py-1 font-mono text-xs text-[var(--color-fg-muted)]"
            >
              {s}
            </span>
          ))}
        </div>
      </section>

      <section className="mb-6">
        <h2 className="mb-4 text-xl font-semibold tracking-tight">Contact</h2>
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
            href="/en/cv"
            className="inline-flex items-center gap-2 rounded-md bg-[var(--color-accent)] px-4 py-2 text-sm font-medium text-[var(--color-bg)] transition-transform hover:scale-105"
          >
            View CV →
          </Link>
          <Link
            href="/about"
            className="inline-flex items-center gap-2 rounded-md border border-[var(--color-border)] bg-[var(--color-bg-elevated)]/60 px-4 py-2 text-sm font-medium text-[var(--color-fg)] transition-colors hover:border-[var(--color-accent)]"
          >
            中文版本
          </Link>
        </div>
      </section>
    </div>
  )
}
