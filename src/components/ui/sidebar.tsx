import { PanelLeft } from "lucide-react";
import { Slot } from "radix-ui";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useIsMobile } from "@/lib/use-media-query";
import { cn } from "@/lib/utils";

type SidebarContextValue = {
  state: "expanded" | "collapsed";
  open: boolean;
  setOpen: (open: boolean) => void;
  openMobile: boolean;
  setOpenMobile: (open: boolean) => void;
  isMobile: boolean;
  toggleSidebar: () => void;
};

const SidebarContext = React.createContext<SidebarContextValue | null>(null);

function useSidebar() {
  const context = React.use(SidebarContext);
  if (!context) throw new Error("useSidebar must be used within a SidebarProvider.");
  return context;
}

type SidebarProviderProps = React.ComponentProps<"div"> & {
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  keyboardShortcut?: string | false;
};

function SidebarProvider({
  defaultOpen = true,
  open: openProp,
  onOpenChange,
  keyboardShortcut = "b",
  className,
  style,
  children,
  ...props
}: SidebarProviderProps) {
  const isMobile = useIsMobile();
  const [openMobile, setOpenMobile] = React.useState(false);
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
  const open = openProp ?? internalOpen;

  const setOpen = React.useCallback(
    (value: boolean) => {
      onOpenChange?.(value);
      if (openProp === undefined) setInternalOpen(value);
    },
    [onOpenChange, openProp],
  );

  const toggleSidebar = React.useCallback(() => {
    if (isMobile) setOpenMobile((o) => !o);
    else setOpen(!open);
  }, [isMobile, open, setOpen]);

  React.useEffect(() => {
    if (!keyboardShortcut) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === keyboardShortcut && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        toggleSidebar();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [keyboardShortcut, toggleSidebar]);

  const value = React.useMemo<SidebarContextValue>(
    () => ({ state: open ? "expanded" : "collapsed", open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar }),
    [open, setOpen, isMobile, openMobile, toggleSidebar],
  );

  return (
    <SidebarContext value={value}>
      <div
        data-slot="sidebar-wrapper"
        style={{ "--sidebar-width": "30ch", "--sidebar-width-icon": "5ch", ...style } as React.CSSProperties}
        className={cn("group/sidebar-wrapper flex min-h-0 w-full", className)}
        {...props}
      >
        {children}
      </div>
    </SidebarContext>
  );
}

type SidebarProps = React.ComponentProps<"aside"> & {
  side?: "left" | "right";
  collapsible?: "offcanvas" | "icon" | "none";
  label?: React.ReactNode;
};

function Sidebar({ side = "left", collapsible = "offcanvas", label, className, children, ...props }: SidebarProps) {
  const { isMobile, state, openMobile, setOpenMobile } = useSidebar();
  const panel = cn(
    "group/sidebar relative flex h-full shrink-0 flex-col bg-surface text-foreground",
    side === "left" ? "border-r border-border-strong" : "border-l border-border-strong",
  );

  if (isMobile) {
    if (!openMobile) return null;
    return (
      <div data-slot="sidebar-mobile" className="fixed inset-0 z-50 flex" style={{ justifyContent: side === "left" ? "flex-start" : "flex-end" }}>
        <button type="button" aria-label="Close sidebar" className="dither absolute inset-0" onClick={() => setOpenMobile(false)} />
        <aside data-slot="sidebar" data-state="expanded" data-mobile="true" className={cn(panel, "relative w-[min(36ch,85vw)] shadow-tui", className)} {...props}>
          {children}
        </aside>
      </div>
    );
  }

  return (
    <aside
      data-slot="sidebar"
      data-state={state}
      data-collapsible={state === "collapsed" ? collapsible : ""}
      data-side={side}
      className={cn(
        panel,
        "w-[var(--sidebar-width)] transition-[width] duration-150 ease-out",
        "data-[collapsible=icon]:w-[var(--sidebar-width-icon)] data-[collapsible=offcanvas]:w-0 data-[collapsible=offcanvas]:overflow-hidden data-[collapsible=offcanvas]:border-0",
        className,
      )}
      {...props}
    >
      {label && <span className="border-label text-accent-ink group-data-[collapsible=icon]/sidebar:hidden">{label}</span>}
      {children}
    </aside>
  );
}

function SidebarTrigger({ className, onClick, ...props }: React.ComponentProps<typeof Button>) {
  const { toggleSidebar } = useSidebar();
  return (
    <Button
      data-slot="sidebar-trigger"
      variant="ghost"
      size="icon-sm"
      className={className}
      onClick={(event) => {
        onClick?.(event);
        toggleSidebar();
      }}
      {...props}
    >
      <PanelLeft />
      <span className="sr-only">Toggle sidebar</span>
    </Button>
  );
}

function SidebarInset({ className, ...props }: React.ComponentProps<"main">) {
  return <main data-slot="sidebar-inset" className={cn("relative flex min-w-0 flex-1 flex-col bg-background", className)} {...props} />;
}

function SidebarHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="sidebar-header" className={cn("flex flex-col gap-2 border-b border-border-strong p-[1ch] pt-3", className)} {...props} />;
}

function SidebarFooter({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="sidebar-footer" className={cn("mt-auto flex flex-col gap-2 border-t border-border-strong p-[1ch]", className)} {...props} />;
}

function SidebarContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-content"
      className={cn("flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto overflow-x-hidden py-1 group-data-[collapsible=icon]/sidebar:overflow-hidden", className)}
      {...props}
    />
  );
}

function SidebarGroup({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="sidebar-group" className={cn("flex w-full min-w-0 flex-col px-[1ch] py-1", className)} {...props} />;
}

function SidebarGroupLabel({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-group-label"
      className={cn(
        "flex h-6 shrink-0 items-center gap-[1ch] px-[1ch] text-xs uppercase tracking-wider text-muted-foreground after:h-px after:flex-1 after:border-t after:border-dashed after:border-border-strong group-data-[collapsible=icon]/sidebar:hidden",
        className,
      )}
      {...props}
    />
  );
}

function SidebarGroupContent({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="sidebar-group-content" className={cn("w-full", className)} {...props} />;
}

function SidebarSeparator({ className, ...props }: React.ComponentProps<"hr">) {
  return <hr data-slot="sidebar-separator" className={cn("mx-[1ch] border-dashed border-border-strong", className)} {...props} />;
}

function SidebarMenu({ className, ...props }: React.ComponentProps<"ul">) {
  return <ul data-slot="sidebar-menu" className={cn("flex w-full min-w-0 flex-col", className)} {...props} />;
}

function SidebarMenuItem({ className, ...props }: React.ComponentProps<"li">) {
  return <li data-slot="sidebar-menu-item" className={cn("group/menu-item relative", className)} {...props} />;
}

const sidebarMenuButtonClass =
  "peer/menu-button flex h-6 w-full min-w-0 items-center gap-[1ch] overflow-hidden px-[1ch] text-left outline-none hover:bg-surface-2 focus-visible:bg-accent focus-visible:text-accent-foreground disabled:pointer-events-none disabled:opacity-40 data-[active=true]:bg-accent data-[active=true]:font-medium data-[active=true]:text-accent-foreground group-data-[collapsible=icon]/sidebar:w-[3ch] group-data-[collapsible=icon]/sidebar:justify-center group-data-[collapsible=icon]/sidebar:px-0 [&>span:last-child]:truncate group-data-[collapsible=icon]/sidebar:[&>span]:hidden [&_svg]:size-3.5 [&_svg]:shrink-0";

type SidebarMenuButtonProps = React.ComponentProps<"button"> & {
  asChild?: boolean;
  isActive?: boolean;
  tooltip?: string;
};

function SidebarMenuButton({ asChild = false, isActive = false, tooltip, className, ...props }: SidebarMenuButtonProps) {
  const Comp = asChild ? Slot.Root : "button";
  const { state, isMobile } = useSidebar();
  const button = (
    <Comp data-slot="sidebar-menu-button" data-active={isActive} aria-current={isActive ? "page" : undefined} className={cn(sidebarMenuButtonClass, className)} {...props} />
  );
  if (!tooltip) return button;
  return (
    <Tooltip>
      <TooltipTrigger asChild>{button}</TooltipTrigger>
      <TooltipContent side="right" align="center" hidden={state !== "collapsed" || isMobile}>
        {tooltip}
      </TooltipContent>
    </Tooltip>
  );
}

function SidebarMenuBadge({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="sidebar-menu-badge"
      className={cn(
        "pointer-events-none absolute top-0 right-[1ch] flex h-6 items-center text-xs tabular-nums text-muted-foreground peer-data-[active=true]/menu-button:text-accent-foreground group-data-[collapsible=icon]/sidebar:hidden",
        className,
      )}
      {...props}
    />
  );
}

function SidebarMenuSub({ className, ...props }: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="sidebar-menu-sub"
      className={cn("ml-[1.5ch] flex min-w-0 flex-col border-l border-border-strong py-px group-data-[collapsible=icon]/sidebar:hidden", className)}
      {...props}
    />
  );
}

function SidebarMenuSubItem({ className, ...props }: React.ComponentProps<"li">) {
  return <li data-slot="sidebar-menu-sub-item" className={cn("relative before:absolute before:top-1/2 before:left-0 before:w-[1ch] before:border-t before:border-border-strong", className)} {...props} />;
}

function SidebarMenuSubButton({ asChild = false, isActive = false, className, ...props }: React.ComponentProps<"a"> & { asChild?: boolean; isActive?: boolean }) {
  const Comp = asChild ? Slot.Root : "a";
  return (
    <Comp
      data-slot="sidebar-menu-sub-button"
      data-active={isActive}
      className={cn(
        "ml-[1.5ch] flex h-6 min-w-0 cursor-pointer items-center gap-[1ch] overflow-hidden px-[1ch] text-muted-foreground outline-none hover:bg-surface-2 hover:text-foreground focus-visible:bg-accent focus-visible:text-accent-foreground data-[active=true]:text-accent-ink [&>span:last-child]:truncate [&_svg]:size-3.5",
        className,
      )}
      {...props}
    />
  );
}

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
};
