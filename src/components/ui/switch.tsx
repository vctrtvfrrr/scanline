import { Switch as SwitchPrimitive } from "radix-ui";
import type * as React from "react";
import { cn } from "@/lib/utils";

function Switch({ className, ...props }: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "group peer relative inline-flex h-[1.4em] w-[6ch] shrink-0 items-center border border-border-strong bg-surface-2 p-px outline-none disabled:cursor-not-allowed disabled:opacity-40 data-[state=checked]:border-accent",
        className,
      )}
      {...props}
    >
      <span
        aria-hidden
        className="absolute inset-y-0 right-[0.6ch] flex items-center text-2xs text-muted-foreground group-data-[state=checked]:right-auto group-data-[state=checked]:left-[0.6ch] group-data-[state=checked]:text-accent-ink"
      >
        <span className="group-data-[state=checked]:hidden">off</span>
        <span className="hidden group-data-[state=checked]:inline">on</span>
      </span>
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className="block h-full w-[2ch] bg-muted-foreground transition-transform duration-100 data-[state=checked]:translate-x-[calc(6ch-2ch-4px)] data-[state=checked]:bg-accent"
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
