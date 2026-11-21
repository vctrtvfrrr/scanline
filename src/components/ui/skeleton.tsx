import type * as React from "react";
import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      aria-hidden
      className={cn(
        "h-lh animate-shimmer bg-surface-2 bg-[repeating-linear-gradient(90deg,transparent_0,transparent_2ch,color-mix(in_oklab,var(--border-strong)_45%,transparent)_2ch,color-mix(in_oklab,var(--border-strong)_45%,transparent)_3ch)]",
        className,
      )}
      {...props}
    />
  );
}

export { Skeleton };
