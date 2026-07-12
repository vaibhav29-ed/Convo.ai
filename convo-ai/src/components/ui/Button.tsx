"use client";

import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline" | "destructive";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-xl font-medium transition-all duration-200",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          "disabled:pointer-events-none disabled:opacity-50",
          {
            "bg-brand-600 text-white hover:bg-brand-700 shadow-lg shadow-brand-500/25 hover:shadow-brand-500/40 active:scale-[0.98]":
              variant === "primary",
            "bg-secondary text-secondary-foreground hover:bg-secondary/80 active:scale-[0.98]":
              variant === "secondary",
            "text-muted-foreground hover:text-foreground hover:bg-accent":
              variant === "ghost",
            "border border-border bg-background text-foreground hover:bg-accent":
              variant === "outline",
            "bg-destructive text-white hover:bg-destructive/90": variant === "destructive",
          },
          {
            "h-8 px-3 text-xs gap-1.5": size === "sm",
            "h-10 px-5 text-sm gap-2": size === "md",
            "h-12 px-8 text-base gap-2.5": size === "lg",
          },
          className
        )}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && (
          <svg
            className="animate-spin -ml-1 h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
