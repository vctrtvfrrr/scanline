import type * as React from "react";
import { cn } from "@/lib/utils";

type ButtonGroupProps = React.ComponentProps<"div"> & { orientation?: "horizontal" | "vertical" };

function ButtonGroup({ className, orientation = "horizontal", ...props }: ButtonGroupProps) {
  return (
    <div
      role="group"
      data-slot="button-group"
      data-orientation={orientation}
      className={cn(
        "inline-flex w-fit items-stretch shadow-tui-sm *:shadow-none *:active:translate-0 [&>*:focus-visible]:relative [&>*:focus-visible]:z-10",
        orientation === "horizontal" ? "[&>*:not(:first-child)]:-ml-px" : "flex-col [&>*:not(:first-child)]:-mt-px",
        className,
      )}
      {...props}
    />
  );
}

function ButtonGroupText({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="button-group-text"
      className={cn("inline-flex items-center gap-[1ch] border border-border-strong bg-surface-2 px-[1ch] text-muted-foreground [&_svg]:size-3.5", className)}
      {...props}
    />
  );
}

export { ButtonGroup, ButtonGroupText };
