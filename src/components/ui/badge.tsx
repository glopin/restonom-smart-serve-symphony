import * as React from "react"
import { type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { badgeVariants } from "./badge.variants"

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge }
// Re-export badgeVariants if it's intended to be part of the public API of the badge component
// For now, assuming it's an internal detail or only BadgeProps (which uses its type) is needed publicly.
// If other components directly import badgeVariants from "./badge", then it should be re-exported.
// export { badgeVariants };
