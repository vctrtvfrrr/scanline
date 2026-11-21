import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";
import { cn } from "@/lib/utils";

const alertVariants = cva(
  "relative grid w-full grid-cols-[0_1fr] items-start gap-y-0.5 border border-l-[3px] px-[2ch] py-2 has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] has-[>svg]:gap-x-[1.5ch] [&>svg]:mt-[0.2lh] [&>svg]:size-3.5",
  {
    variants: {
      variant: {
        default: "border-border-strong border-l-foreground bg-surface text-foreground",
        info: "border-blue/40 border-l-blue bg-blue/5 text-blue-ink",
        success: "border-green/40 border-l-green bg-green/5 text-green-ink",
        warning: "border-yellow/40 border-l-yellow bg-yellow/5 text-yellow-ink",
        destructive: "border-red/40 border-l-red bg-red/5 text-red-ink",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

function Alert({ className, variant, ...props }: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>) {
  return <div data-slot="alert" role="alert" className={cn(alertVariants({ variant }), className)} {...props} />;
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="alert-title" className={cn("col-start-2 font-bold", className)} {...props} />;
}

function AlertDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={cn("col-start-2 grid gap-1 text-foreground/80 [&_p]:leading-relaxed", className)}
      {...props}
    />
  );
}

export { Alert, AlertTitle, AlertDescription };
