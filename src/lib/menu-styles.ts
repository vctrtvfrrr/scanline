export const menuContent =
  "z-50 min-w-[16ch] overflow-hidden border border-border-strong bg-surface p-px text-foreground shadow-tui outline-none data-[state=closed]:hidden";

export const menuItem =
  "relative flex h-6 cursor-default select-none items-center gap-2 px-2 outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-40 data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[state=open]:not-data-[highlighted]:bg-surface-2 data-[state=open]:not-data-[highlighted]:text-accent-ink data-[variant=destructive]:text-red-ink data-[variant=destructive]:data-[highlighted]:bg-red data-[variant=destructive]:data-[highlighted]:text-background [&_svg]:size-3.5 [&_svg]:shrink-0";

export const menuInsetItem = "data-[inset]:pl-[4ch]";

export const menuLabel = "flex h-6 items-center px-2 text-xs uppercase tracking-wider text-muted-foreground data-[inset]:pl-[4ch]";

export const menuSeparator = "mx-1 my-px h-px border-t border-dashed border-border-strong";

export const menuShortcut =
  "ml-auto pl-4 text-xs tracking-wide text-muted-foreground group-data-[highlighted]/item:text-accent-foreground/70";
