import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";
import type * as React from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex shrink-0 select-none items-center justify-center gap-[1ch] whitespace-nowrap border font-mono font-medium transition-[transform,box-shadow,background-color,color] duration-75 disabled:pointer-events-none disabled:opacity-40 [&_svg]:pointer-events-none [&_svg]:size-3.5 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "border-accent bg-accent text-accent-foreground shadow-tui-sm hover:brightness-110 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none",
        secondary:
          "border-border-strong bg-surface-2 text-foreground shadow-tui-sm hover:border-foreground/50 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none",
        outline: "border-border-strong bg-transparent text-foreground hover:border-accent hover:text-accent-ink",
        ghost: "border-transparent bg-transparent text-foreground hover:bg-surface-2",
        destructive:
          "border-red bg-red text-background shadow-tui-sm hover:brightness-110 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none",
        bracket:
          "border-transparent bg-transparent text-foreground before:text-muted-foreground before:content-['['] after:text-muted-foreground after:content-[']'] hover:bg-accent hover:text-accent-foreground hover:before:text-accent-foreground hover:after:text-accent-foreground",
        link: "h-auto border-transparent px-0 text-accent-ink underline decoration-dashed underline-offset-4 hover:decoration-solid",
      },
      size: {
        sm: "h-6 px-[1ch] text-xs",
        default: "h-7 px-[2ch] text-base",
        lg: "h-8 px-[3ch] text-base",
        icon: "size-7",
        "icon-sm": "size-6",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

type ButtonProps = React.ComponentProps<"button"> & VariantProps<typeof buttonVariants> & { asChild?: boolean };

function Button({ className, variant, size, asChild = false, ...props }: ButtonProps) {
  const Comp = asChild ? Slot.Root : "button";
  return (
    <Comp
      data-slot="button"
      data-variant={variant ?? "default"}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants, type ButtonProps };
