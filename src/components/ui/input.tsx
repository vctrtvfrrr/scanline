import type * as React from "react";
import { cn } from "@/lib/utils";

const inputBase =
  "w-full min-w-0 border border-border-strong bg-background px-[1ch] text-foreground outline-none placeholder:text-muted-foreground/70 focus-visible:border-accent focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-40 aria-invalid:border-red aria-invalid:focus-visible:border-red";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        inputBase,
        "h-7 caret-[var(--cursor)] file:mr-[1ch] file:h-full file:border-0 file:border-r file:border-border-strong file:bg-surface-2 file:px-[1ch] file:font-mono file:text-foreground file:hover:bg-accent file:hover:text-accent-foreground",
        type === "file" && "pl-0 text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}

type PromptInputProps = React.ComponentProps<"input"> & { prompt?: React.ReactNode };

function PromptInput({ className, prompt = ">", ...props }: PromptInputProps) {
  return (
    <div
      data-slot="prompt-input"
      className={cn(
        "flex h-7 w-full items-center gap-[1ch] border border-border-strong bg-background px-[1ch] focus-within:border-accent has-aria-invalid:border-red",
        className,
      )}
    >
      <span aria-hidden className="shrink-0 font-bold text-accent-ink">
        {prompt}
      </span>
      <input
        className="h-full w-full min-w-0 bg-transparent caret-[var(--cursor)] outline-none placeholder:text-muted-foreground/70 focus-visible:outline-none"
        {...props}
      />
    </div>
  );
}

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(inputBase, "field-sizing-content min-h-[5lh] py-1 caret-[var(--cursor)]", className)}
      {...props}
    />
  );
}

export { Input, PromptInput, Textarea };
