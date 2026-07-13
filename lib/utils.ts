import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function waLink(phone: string, message?: string) {
  const digits = phone.replace(/[^0-9]/g, "")
  return `https://wa.me/${digits}${message ? `?text=${encodeURIComponent(message)}` : ""}`
}

export function telLink(phone: string) {
  return `tel:${phone.replace(/[^0-9+]/g, "")}`
}

export function timeAgo(timestamp: number) {
  const diffMs = Date.now() - timestamp
  const minute = 60_000
  const hour = 60 * minute
  const day = 24 * hour

  if (diffMs < minute) return "just now"
  if (diffMs < hour) return `${Math.floor(diffMs / minute)}m ago`
  if (diffMs < day) return `${Math.floor(diffMs / hour)}h ago`
  if (diffMs < 7 * day) return `${Math.floor(diffMs / day)}d ago`
  return new Date(timestamp).toLocaleDateString("en-GB", { day: "numeric", month: "short" })
}

export function initials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("")
}

export function pickRandom<T>(items: T[], count: number): T[] {
  if (items.length <= count) return items
  const shuffled = [...items]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled.slice(0, count)
}
