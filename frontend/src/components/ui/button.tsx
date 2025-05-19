import { type ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "link";
  size?: "default" | "sm" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ className, children, variant = "default", size = "default", ...props }, ref) => {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-offset-1 disabled:pointer-events-none disabled:opacity-50",
        {
          "bg-blue-600 text-white shadow hover:bg-blue-500": variant === "default",
          "border border-gray-300 bg-transparent hover:bg-gray-100": variant === "outline",
          "bg-transparent hover:bg-gray-100": variant === "ghost",
          "text-blue-600 underline-offset-4 hover:underline": variant === "link",
          "h-9 px-4 py-2 text-sm": size === "default",
          "h-7 px-3 text-xs": size === "sm",
          "h-10 px-8 text-base": size === "lg",
        },
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";

export { Button, type ButtonProps };
