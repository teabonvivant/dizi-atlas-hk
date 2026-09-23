import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-3 py-1 font-sans text-xs font-bold transition-colors",
  {
    variants: {
      variant: {
        default: "border-primary/20 bg-primary/5 text-primary",
        secondary: "border-border bg-muted text-muted-foreground",
        accent: "border-accent/20 bg-accent/8 text-accent",
        outline: "border-border bg-card text-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
