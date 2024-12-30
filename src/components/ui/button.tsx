'use client'

import { cn } from "@/lib/utils"
import { ButtonHTMLAttributes, forwardRef } from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'secondary'
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  className,
  children,
  variant = 'default',
  ...props
}, ref) => {
  return (
    <button
      className={cn(
        "px-6 py-3 rounded-lg font-medium transition-all duration-200",
        variant === 'default' && "bg-[var(--text)] text-[var(--background)] hover:opacity-90",
        variant === 'secondary' && "border border-[var(--text)] text-[var(--text)] hover:bg-[var(--text)] hover:text-[var(--background)]",
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </button>
  )
})

Button.displayName = 'Button'; 