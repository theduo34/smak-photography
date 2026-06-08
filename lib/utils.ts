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
