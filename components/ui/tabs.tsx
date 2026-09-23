"use client"

import { createContext, type ReactNode, useContext, useMemo, useState } from "react"
import { cn } from "@/lib/utils"

type TabsContextValue = Readonly<{
  value: string
  setValue: (value: string) => void
}>

const TabsContext = createContext<TabsContextValue | null>(null)

function useTabsContext(): TabsContextValue {
  const context = useContext(TabsContext)
  if (!context) {
    throw new Error("Tabs components must be used inside Tabs")
  }
  return context
}

export function Tabs({
  children,
  defaultValue
}: {
  readonly children: ReactNode
  readonly defaultValue: string
}) {
  const [value, setValue] = useState(defaultValue)
  const context = useMemo(() => ({ value, setValue }), [value])
  return <TabsContext.Provider value={context}>{children}</TabsContext.Provider>
}

export function TabsList({ children, className }: { readonly children: ReactNode; readonly className?: string }) {
  return (
    <div className={cn("inline-flex min-h-11 flex-wrap items-center gap-1 rounded-md border bg-card p-1", className)} role="tablist">
      {children}
    </div>
  )
}

export function TabsTrigger({
  children,
  value,
  className
}: {
  readonly children: ReactNode
  readonly value: string
  readonly className?: string
}) {
  const context = useTabsContext()
  const selected = context.value === value
  const safeValue = value.replace(/[^a-zA-Z0-9_-]/g, "-")
  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    const tabs = Array.from(event.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>("[role='tab']") ?? [])
    const index = tabs.indexOf(event.currentTarget)
    let next = index
    if (event.key === "ArrowRight") next = (index + 1) % tabs.length
    else if (event.key === "ArrowLeft") next = (index - 1 + tabs.length) % tabs.length
    else if (event.key === "Home") next = 0
    else if (event.key === "End") next = tabs.length - 1
    else return
    event.preventDefault()
    const target = tabs[next]
    const targetValue = target?.dataset["value"]
    if (target && targetValue) { context.setValue(targetValue); target.focus() }
  }
  return (
    <button
      type="button"
      role="tab"
      id={`tab-${safeValue}`}
      aria-controls={`panel-${safeValue}`}
      aria-selected={selected}
      tabIndex={selected ? 0 : -1}
      data-value={value}
      className={cn(
        "inline-flex min-h-9 items-center justify-center rounded px-3 py-2 font-sans text-sm font-bold text-muted-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        selected ? "bg-primary text-primary-foreground hover:text-primary-foreground" : "",
        className
      )}
      onClick={() => context.setValue(value)}
      onKeyDown={handleKeyDown}
    >
      {children}
    </button>
  )
}

export function TabsContent({
  children,
  value,
  className
}: {
  readonly children: ReactNode
  readonly value: string
  readonly className?: string
}) {
  const context = useTabsContext()
  if (context.value !== value) {
    return null
  }
  return (
    <div id={`panel-${value.replace(/[^a-zA-Z0-9_-]/g, "-")}`} aria-labelledby={`tab-${value.replace(/[^a-zA-Z0-9_-]/g, "-")}`} tabIndex={0} className={cn("mt-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", className)} role="tabpanel">
      {children}
    </div>
  )
}
