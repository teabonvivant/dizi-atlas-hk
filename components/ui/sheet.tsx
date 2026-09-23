import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

export function Sheet({ children }: { readonly children: ReactNode }) {
  return <div>{children}</div>
}

export function SheetTrigger({ children }: { readonly children: ReactNode; readonly asChild?: boolean }) {
  return <>{children}</>
}

export function SheetContent({ children, className }: { readonly children: ReactNode; readonly className?: string }) {
  return <div className={cn("rounded-md border bg-card p-4", className)}>{children}</div>
}

export function SheetHeader({ children, className }: { readonly children: ReactNode; readonly className?: string }) {
  return <div className={cn("grid gap-2", className)}>{children}</div>
}

export function SheetTitle({ children, className }: { readonly children: ReactNode; readonly className?: string }) {
  return <h2 className={cn("font-serif text-2xl font-bold text-primary", className)}>{children}</h2>
}

export function SheetDescription({ children, className }: { readonly children: ReactNode; readonly className?: string }) {
  return <p className={cn("font-sans text-sm leading-6 text-muted-foreground", className)}>{children}</p>
}

export function SheetClose({ children }: { readonly children: ReactNode }) {
  return <>{children}</>
}
