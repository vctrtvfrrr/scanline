import { Check } from "lucide-react";
import * as React from "react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

type ComboboxOption = { value: string; label: string; hint?: string };

type ComboboxProps = {
  options: ComboboxOption[];
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  className?: string;
  disabled?: boolean;
};

function Combobox({
  options,
  value,
  onValueChange,
  placeholder = "select...",
  searchPlaceholder = "search...",
  emptyText = "no results",
  className,
  disabled,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const selected = options.find((o) => o.value === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild disabled={disabled}>
        <button
          type="button"
          role="combobox"
          aria-expanded={open}
          data-slot="combobox-trigger"
          className={cn(
            "flex h-7 w-64 items-center justify-between gap-[1ch] border border-border-strong bg-background px-[1ch] text-left outline-none focus-visible:border-accent focus-visible:outline-none disabled:opacity-40 data-[state=open]:border-accent",
            className,
          )}
        >
          <span className={cn("truncate", !selected && "text-muted-foreground/70")}>{selected?.label ?? placeholder}</span>
          <span aria-hidden className="text-xs text-muted-foreground">
            [▾]
          </span>
        </button>
      </PopoverTrigger>
      <PopoverContent align="start" sideOffset={2} className="w-[var(--radix-popover-trigger-width)] min-w-56 p-0 py-0 shadow-tui">
        <Command>
          <CommandInput placeholder={searchPlaceholder} />
          <CommandList>
            <CommandEmpty>{emptyText}</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.label}
                  onSelect={() => {
                    onValueChange?.(option.value === value ? "" : option.value);
                    setOpen(false);
                  }}
                >
                  <Check className={cn(option.value === value ? "opacity-100" : "opacity-0")} />
                  <span className="truncate">{option.label}</span>
                  {option.hint && <span className="ml-auto text-xs text-muted-foreground group-data-[selected=true]/item:text-accent-foreground/70">{option.hint}</span>}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export { Combobox, type ComboboxOption, type ComboboxProps };
