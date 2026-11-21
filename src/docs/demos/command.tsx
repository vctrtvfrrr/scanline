import { Calculator, Calendar, CreditCard, Settings, Smile, User } from "lucide-react";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut } from "@/components/ui/command";
import { Kbd } from "@/components/ui/kbd";
import { Example } from "@/docs/kit/example";

function Items() {
  return (
    <>
      <CommandEmpty>no results found</CommandEmpty>
      <CommandGroup heading="suggestions">
        <CommandItem>
          <Calendar /> calendar
        </CommandItem>
        <CommandItem>
          <Smile /> search emoji
        </CommandItem>
        <CommandItem disabled>
          <Calculator /> calculator
        </CommandItem>
      </CommandGroup>
      <CommandSeparator />
      <CommandGroup heading="settings">
        <CommandItem>
          <User /> profile <CommandShortcut>⌘P</CommandShortcut>
        </CommandItem>
        <CommandItem>
          <CreditCard /> billing <CommandShortcut>⌘B</CommandShortcut>
        </CommandItem>
        <CommandItem>
          <Settings /> settings <CommandShortcut>⌘S</CommandShortcut>
        </CommandItem>
      </CommandGroup>
    </>
  );
}

export default function CommandDemo() {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <Example title="inline" contentClassName="block">
        <Command className="max-w-md border border-border-strong shadow-tui">
          <CommandInput placeholder="type a command or search..." />
          <CommandList>
            <Items />
          </CommandList>
        </Command>
      </Example>
      <Example title="dialog">
        <Button variant="outline" onClick={() => setOpen(true)}>
          open palette <Kbd>^J</Kbd>
        </Button>
        <span className="text-muted-foreground">
          tip: the docs app has its own palette on <Kbd>ctrl</Kbd> + <Kbd>K</Kbd>
        </span>
        <CommandDialog open={open} onOpenChange={setOpen} label="palette">
          <CommandInput placeholder="type a command or search..." />
          <CommandList>
            <Items />
          </CommandList>
        </CommandDialog>
      </Example>
    </>
  );
}
