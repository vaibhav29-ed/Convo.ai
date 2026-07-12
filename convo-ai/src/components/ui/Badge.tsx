import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "success" | "warning" | "error" | "info";
}

export default function Badge({
  className,
  variant = "default",
  children,
  ...props
}: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        {
          "bg-secondary text-secondary-foreground": variant === "default",
          "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200": variant === "success",
          "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200": variant === "warning",
          "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200": variant === "error",
          "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200": variant === "info",
        },
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
