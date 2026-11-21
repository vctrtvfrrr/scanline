import { Separator as SeparatorPrimitive } from "radix-ui";
import type * as React from "react";
import { cn } from "@/lib/utils";

type SeparatorProps = React.ComponentProps<typeof SeparatorPrimitive.Root> & {
  variant?: "solid" | "dashed" | "double";
  label?: React.ReactNode;
};

function Separator({ className, orientation = "horizontal", decorative = true, variant = "solid", label, ...props }: SeparatorProps) {
  const line = cn(
    "shrink-0 border-border-strong",
    orientation === "horizontal" ? "w-full border-t" : "h-full self-stretch border-l",
    variant === "dashed" && "border-dashed",
    variant === "double" && (orientation === "horizontal" ? "border-t-[3px] border-double" : "border-l-[3px] border-double"),
  );
  if (label && orientation === "horizontal") {
    return (
      <div data-slot="separator" role={decorative ? "none" : "separator"} className={cn("flex w-full items-center gap-[1ch] text-xs text-muted-foreground", className)}>
        <span className={cn(line, "w-auto flex-1")} />
        {label}
        <span className={cn(line, "w-auto flex-1")} />
      </div>
    );
  }
  return <SeparatorPrimitive.Root data-slot="separator" decorative={decorative} orientation={orientation} className={cn(line, className)} {...props} />;
}

export { Separator };
