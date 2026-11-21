import { Checkbox as CheckboxPrimitive } from "radix-ui";
import type * as React from "react";
import { cn } from "@/lib/utils";

function Checkbox({ className, ...props }: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "group peer inline-flex shrink-0 items-center font-mono leading-[inherit] text-muted-foreground outline-none hover:text-foreground focus-visible:bg-accent focus-visible:text-accent-foreground disabled:cursor-not-allowed disabled:opacity-40 aria-invalid:text-red-ink data-[state=checked]:text-foreground data-[state=indeterminate]:text-foreground",
        className,
      )}
      {...props}
    >
      <span aria-hidden>[</span>
      <span className="inline-block w-[1ch] text-center font-bold text-accent-ink group-focus-visible:text-accent-foreground">
        <CheckboxPrimitive.Indicator data-slot="checkbox-indicator" className="contents">
          <span className="group-data-[state=indeterminate]:hidden">x</span>
          <span className="hidden group-data-[state=indeterminate]:inline">-</span>
        </CheckboxPrimitive.Indicator>
      </span>
      <span aria-hidden>]</span>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };
