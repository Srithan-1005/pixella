import * as React from "react"
import { cn } from "@/lib/utils"

export interface GlassButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  glowColor?: string
}

export const GlassButton = React.forwardRef<HTMLButtonElement, GlassButtonProps>(
  ({ className, children, glowColor, ...props }, ref) => {
    return (
      <div className="glass-button-wrap">
        <div className="glass-button-shadow" />
        <button
          ref={ref}
          className={cn(
            "glass-button rounded-2xl font-semibold cursor-pointer active:scale-[0.98]",
            className
          )}
          {...props}
        >
          <span className="glass-button-text relative z-10 flex items-center justify-center">
            {children}
          </span>
        </button>
      </div>
    )
  }
)

GlassButton.displayName = "GlassButton"
