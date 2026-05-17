import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function readingTime(text: string): number {
  const wordsPerMinute = 300
  const chineseCharCount = (text.match(/[一-龥]/g) || []).length
  const englishWordCount = (text.match(/[a-zA-Z]+/g) || []).length
  const totalWords = chineseCharCount + englishWordCount
  return Math.max(1, Math.ceil(totalWords / wordsPerMinute))
}
