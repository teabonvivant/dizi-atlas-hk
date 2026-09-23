import type { ReactNode } from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

export function Accordion({
  children,
  className
}: {
  readonly children: ReactNode
  readonly className?: string
  readonly type?: "single" | "multiple"
  readonly collapsible?: boolean
}) {
  return <div className={cn("grid", className)}>{children}</div>
}

export function AccordionItem({
  children,
  className
}: {
  readonly children: ReactNode
  readonly className?: string
  readonly value?: string
}) {
  return <details className={cn("group border-b", className)}>{children}</details>
}

export function AccordionTrigger({ children, className }: { readonly children: ReactNode; readonly className?: string }) {
  return (
    <summary
      className={cn(
        "flex cursor-pointer list-none items-center justify-between gap-4 py-4 font-sans text-base font-bold text-primary transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring [&::-webkit-details-marker]:hidden",
        className
      )}
    >
      <span className="min-w-0">{children}</span>
      <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200 group-open:rotate-180" aria-hidden="true" />
    </summary>
  )
}

export function AccordionContent({ children, className }: { readonly children: ReactNode; readonly className?: string }) {
  return <div className={cn("pb-4 font-sans text-sm leading-7 text-muted-foreground", className)}>{children}</div>
}
