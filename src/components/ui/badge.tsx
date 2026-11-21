import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";
import type * as React from "react";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex w-fit shrink-0 items-center gap-[0.5ch] whitespace-nowrap border px-[0.75ch] text-xs font-medium leading-[1.4] [&_svg]:size-3",
  {
    variants: {
      variant: {
        default: "border-accent bg-accent text-accent-foreground",
        secondary: "border-border-strong bg-surface-2 text-foreground",
        outline: "border-border-strong text-foreground",
        destructive: "border-red bg-red text-background",
        success: "border-green/60 bg-green/10 text-green-ink",
        warning: "border-yellow/60 bg-yellow/10 text-yellow-ink",
        info: "border-blue/60 bg-blue/10 text-blue-ink",
        magenta: "border-magenta/60 bg-magenta/10 text-magenta-ink",
        cyan: "border-cyan/60 bg-cyan/10 text-cyan-ink",
        bracket:
          "border-transparent px-0 text-accent-ink before:text-muted-foreground before:content-['['] after:text-muted-foreground after:content-[']']",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "span";
  return <Comp data-slot="badge" className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
