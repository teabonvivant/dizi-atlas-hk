import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: readonly ClassValue[]): string {
  return twMerge(clsx(inputs))
}

export function truncate(value: string, length = 120): string {
  if (!value) {
    return ""
  }

  return value.length > length ? `${value.slice(0, Math.max(0, length - 1))}…` : value
}

export function splitValues(value = ""): string[] {
  return value
    .split(/[;；、,，]/)
    .map((item) => item.trim())
    .filter(Boolean)
}

export function uniqueValues(values: readonly string[]): string[] {
  return Array.from(new Set(values.filter(Boolean)))
}

export function normalizeSearch(value: string): string {
  return value.toLocaleLowerCase("zh-Hant").replace(/\s+/g, "")
}

export function includesSearch(source: string, query: string): boolean {
  if (!query.trim()) {
    return true
  }

  return normalizeSearch(source).includes(normalizeSearch(query))
}

export function publicStatus(value: string): string {
  if (!value) {
    return "待補資料"
  }

  if (value.includes("需查證")) {
    return "待查證"
  }

  if (value.includes("已入庫")) {
    return "已整理"
  }

  return value
}
