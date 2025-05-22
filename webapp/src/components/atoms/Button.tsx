import React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none shadow-md hover:shadow-lg",
  {
    variants: {
      variant: {
        default: "bg-primary-main text-white hover:bg-primary-light/90 hover:brightness-110",
        secondary: "bg-secondary-main text-white hover:bg-secondary-light/90 hover:brightness-110",
        accent: "bg-accent-main text-primary-dark hover:bg-accent-light/90 hover:brightness-110",
        outline: "bg-transparent ring-2 ring-secondary-main text-secondary-main hover:bg-secondary-main/10",
        ghost: "hover:bg-surface-lighter hover:text-text-primary",
        link: "text-secondary-main underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 py-2 px-4",
        sm: "h-9 px-3",
        lg: "h-11 px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, ...props }, ref) => {
  return <button className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
})
Button.displayName = "Button"

export { Button, buttonVariants }
