import { RadioGroup as RadioGroupPrimitive } from "radix-ui";
import type * as React from "react";
import { cn } from "@/lib/utils";

function RadioGroup({ className, ...props }: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return <RadioGroupPrimitive.Root data-slot="radio-group" className={cn("grid gap-1", className)} {...props} />;
}

function RadioGroupItem({ className, ...props }: React.ComponentProps<typeof RadioGroupPrimitive.Item>) {
  return (
    <RadioGroupPrimitive.Item
      data-slot="radio-group-item"
      className={cn(
        "group peer inline-flex shrink-0 items-center font-mono leading-[inherit] text-muted-foreground outline-none hover:text-foreground focus-visible:bg-accent focus-visible:text-accent-foreground disabled:cursor-not-allowed disabled:opacity-40 data-[state=checked]:text-foreground",
        className,
      )}
      {...props}
    >
      <span aria-hidden>(</span>
      <span className="inline-block w-[1ch] text-center text-accent-ink group-focus-visible:text-accent-foreground">
        <RadioGroupPrimitive.Indicator data-slot="radio-group-indicator">•</RadioGroupPrimitive.Indicator>
      </span>
      <span aria-hidden>)</span>
    </RadioGroupPrimitive.Item>
  );
}

export { RadioGroup, RadioGroupItem };
