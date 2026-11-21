import { ChevronDown } from "lucide-react";
import { NavigationMenu as NavigationMenuPrimitive } from "radix-ui";
import type * as React from "react";
import { cn } from "@/lib/utils";

function NavigationMenu({ className, children, ...props }: React.ComponentProps<typeof NavigationMenuPrimitive.Root>) {
  return (
    <NavigationMenuPrimitive.Root data-slot="navigation-menu" className={cn("relative flex max-w-max flex-1 items-center justify-center", className)} {...props}>
      {children}
      <div className="absolute top-full left-0 z-50 flex justify-center">
        <NavigationMenuPrimitive.Viewport
          data-slot="navigation-menu-viewport"
          className="relative mt-1 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden border border-border-strong bg-surface text-foreground shadow-tui md:w-[var(--radix-navigation-menu-viewport-width)]"
        />
      </div>
    </NavigationMenuPrimitive.Root>
  );
}

function NavigationMenuList({ className, ...props }: React.ComponentProps<typeof NavigationMenuPrimitive.List>) {
  return <NavigationMenuPrimitive.List data-slot="navigation-menu-list" className={cn("flex flex-1 list-none items-center gap-px", className)} {...props} />;
}

function NavigationMenuItem({ className, ...props }: React.ComponentProps<typeof NavigationMenuPrimitive.Item>) {
  return <NavigationMenuPrimitive.Item data-slot="navigation-menu-item" className={cn("relative", className)} {...props} />;
}

const navigationMenuTriggerStyle =
  "group inline-flex h-7 w-max items-center justify-center gap-[1ch] px-[1.5ch] outline-none hover:bg-surface-2 focus-visible:bg-accent focus-visible:text-accent-foreground disabled:pointer-events-none disabled:opacity-40 data-[active]:text-accent-ink data-[state=open]:bg-surface-2 data-[state=open]:text-accent-ink";

function NavigationMenuTrigger({ className, children, ...props }: React.ComponentProps<typeof NavigationMenuPrimitive.Trigger>) {
  return (
    <NavigationMenuPrimitive.Trigger data-slot="navigation-menu-trigger" className={cn(navigationMenuTriggerStyle, className)} {...props}>
      {children}
      <ChevronDown aria-hidden className="size-3 transition-transform duration-150 group-data-[state=open]:rotate-180" />
    </NavigationMenuPrimitive.Trigger>
  );
}

function NavigationMenuContent({ className, ...props }: React.ComponentProps<typeof NavigationMenuPrimitive.Content>) {
  return <NavigationMenuPrimitive.Content data-slot="navigation-menu-content" className={cn("top-0 left-0 w-full p-1 md:absolute md:w-auto", className)} {...props} />;
}

function NavigationMenuLink({ className, ...props }: React.ComponentProps<typeof NavigationMenuPrimitive.Link>) {
  return (
    <NavigationMenuPrimitive.Link
      data-slot="navigation-menu-link"
      className={cn(
        "flex flex-col gap-0.5 px-[1.5ch] py-1.5 outline-none hover:bg-accent hover:text-accent-foreground focus-visible:bg-accent focus-visible:text-accent-foreground data-[active=true]:text-accent-ink [&:hover_*]:text-accent-foreground [&:focus-visible_*]:text-accent-foreground",
        className,
      )}
      {...props}
    />
  );
}

export { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle };
