import { ArrowLeft, ArrowRight, Keyboard, Moon, Search, Sun } from "lucide-react";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut } from "@/components/ui/command";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { PromptInput } from "@/components/ui/input";
import { Kbd } from "@/components/ui/kbd";
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { PageView } from "@/docs/page-view";
import { GROUP_LABELS, PAGES, type PageGroup } from "@/docs/registry";
import { useHashRoute } from "@/docs/kit/use-hash-route";
import { type Theme, useTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";

const GROUPS: PageGroup[] = ["overview", "components", "examples"];

function isTypingTarget(target: EventTarget | null) {
  return target instanceof HTMLElement && (target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName));
}

export function App() {
  const [route, navigate] = useHashRoute();
  const { theme, toggleTheme, crt, setCrt } = useTheme();
  const [paletteOpen, setPaletteOpen] = React.useState(false);
  const [helpOpen, setHelpOpen] = React.useState(false);
  const filterRef = React.useRef<HTMLInputElement>(null);

  const index = Math.max(0, PAGES.findIndex((p) => p.slug === route));
  const page = PAGES[index];
  const go = React.useCallback((delta: number) => navigate(PAGES[(index + delta + PAGES.length) % PAGES.length].slug), [index, navigate]);

  React.useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "k") {
        event.preventDefault();
        setPaletteOpen((o) => !o);
        return;
      }
      if (event.ctrlKey || event.metaKey || event.altKey || isTypingTarget(event.target) || document.querySelector("[role=dialog]")) return;
      const actions: Record<string, () => void> = {
        t: toggleTheme,
        "[": () => go(-1),
        "]": () => go(1),
        "?": () => setHelpOpen(true),
        "/": () => filterRef.current?.focus(),
      };
      if (actions[event.key]) {
        event.preventDefault();
        actions[event.key]();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [go, toggleTheme]);

  const runCommand = (fn: () => void) => {
    setPaletteOpen(false);
    fn();
  };

  return (
    <TooltipProvider>
      <SidebarProvider className="h-dvh flex-col">
        <TopBar onPalette={() => setPaletteOpen(true)} onHelp={() => setHelpOpen(true)} go={go} />
        <div className="flex min-h-0 flex-1">
          <DocsSidebar current={page.slug} filterRef={filterRef} />
          <SidebarInset className="overflow-y-auto" key={page.slug}>
            <PageView page={page} />
          </SidebarInset>
        </div>
        <StatusBar slug={page.slug} position={index + 1} total={PAGES.length} theme={theme} />
      </SidebarProvider>

      <CommandDialog open={paletteOpen} onOpenChange={setPaletteOpen} label="palette">
        <CommandInput placeholder="jump to a page or run a command..." />
        <CommandList className="max-h-[50vh]">
          <CommandEmpty>no results found</CommandEmpty>
          {GROUPS.map((group) => (
            <CommandGroup key={group} heading={GROUP_LABELS[group]}>
              {PAGES.filter((p) => p.group === group).map((p) => (
                <CommandItem key={p.slug} value={`${p.title} ${p.slug}`} onSelect={() => runCommand(() => navigate(p.slug))}>
                  <span className="text-muted-foreground group-data-[selected=true]/item:text-accent-foreground">▸</span>
                  {p.title}
                </CommandItem>
              ))}
            </CommandGroup>
          ))}
          <CommandSeparator />
          <CommandGroup heading="commands">
            <CommandItem onSelect={() => runCommand(toggleTheme)}>
              {theme === "dark" ? <Sun /> : <Moon />} switch to {theme === "dark" ? "light" : "dark"} theme <CommandShortcut>t</CommandShortcut>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => setCrt(!crt))}>
              <span className="whitespace-pre">[{crt ? "x" : " "}]</span> crt scanlines
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => setHelpOpen(true))}>
              <Keyboard /> keyboard shortcuts <CommandShortcut>?</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>

      <Dialog open={helpOpen} onOpenChange={setHelpOpen}>
        <DialogContent label="help" className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Keyboard shortcuts</DialogTitle>
            <DialogDescription>Everything is reachable without a mouse.</DialogDescription>
          </DialogHeader>
          <dl className="grid grid-cols-[14ch_1fr] gap-y-1">
            {[
              ["ctrl K", "command palette"],
              ["ctrl B", "toggle sidebar"],
              ["t", "toggle light / dark"],
              ["[  ]", "previous / next page"],
              ["/", "filter the sidebar"],
              ["?", "this help"],
              ["esc", "close dialogs and menus"],
            ].map(([keys, label]) => (
              <div key={keys} className="contents">
                <dt className="flex gap-1">
                  {keys.split(/\s+/).map((k) => (
                    <Kbd key={k}>{k}</Kbd>
                  ))}
                </dt>
                <dd>{label}</dd>
              </div>
            ))}
          </dl>
        </DialogContent>
      </Dialog>

      <Toaster position="bottom-right" offset={{ bottom: 40, right: 16 }} />
    </TooltipProvider>
  );
}

function TopBar({ onPalette, onHelp, go }: { onPalette: () => void; onHelp: () => void; go: (delta: number) => void }) {
  const { theme, setTheme, toggleTheme, crt, setCrt } = useTheme();
  const { toggleSidebar, open } = useSidebar();

  return (
    <header className="flex h-8 shrink-0 items-center gap-[1ch] border-b border-border-strong bg-surface px-[1ch]">
      <SidebarTrigger className="md:hidden" />
      <a href="#/" className="flex items-center gap-[0.5ch] px-[0.5ch] font-bold outline-none focus-visible:bg-accent focus-visible:text-accent-foreground">
        <span className="text-accent-ink">▌</span>scanline<span className="font-normal text-muted-foreground">/ui</span>
      </a>
      <span className="hidden text-border-strong sm:inline">│</span>
      <Menubar className="hidden sm:flex">
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent className="w-56">
            <MenubarItem onSelect={onPalette}>
              command palette <MenubarShortcut>^K</MenubarShortcut>
            </MenubarItem>
            <MenubarItem asChild>
              <a href="https://github.com/MrLesk/Backlog.md" target="_blank" rel="noreferrer">
                open Backlog.md ↗
              </a>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem disabled>quit :q</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>View</MenubarTrigger>
          <MenubarContent className="w-56">
            <MenubarCheckboxItem checked={open} onCheckedChange={toggleSidebar}>
              sidebar <MenubarShortcut>^B</MenubarShortcut>
            </MenubarCheckboxItem>
            <MenubarCheckboxItem checked={crt} onCheckedChange={setCrt}>
              crt scanlines
            </MenubarCheckboxItem>
            <MenubarSeparator />
            <MenubarRadioGroup value={theme} onValueChange={(v) => setTheme(v as Theme)}>
              <MenubarRadioItem value="light">ayu light</MenubarRadioItem>
              <MenubarRadioItem value="dark">ayu dark</MenubarRadioItem>
            </MenubarRadioGroup>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>Go</MenubarTrigger>
          <MenubarContent className="w-52">
            <MenubarItem onSelect={() => go(-1)}>
              <ArrowLeft /> previous page <MenubarShortcut>[</MenubarShortcut>
            </MenubarItem>
            <MenubarItem onSelect={() => go(1)}>
              <ArrowRight /> next page <MenubarShortcut>]</MenubarShortcut>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem asChild>
              <a href="#/">introduction</a>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>Help</MenubarTrigger>
          <MenubarContent className="w-52">
            <MenubarItem onSelect={onHelp}>
              <Keyboard /> shortcuts <MenubarShortcut>?</MenubarShortcut>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
      <div className="ml-auto flex items-center gap-[1ch]">
        <button
          type="button"
          onClick={onPalette}
          className="hidden h-6 w-[32ch] items-center gap-[1ch] border border-border-strong bg-background px-[1ch] text-muted-foreground outline-none hover:border-accent focus-visible:border-accent md:flex"
        >
          <Search className="size-3.5" />
          search...
          <span className="ml-auto flex gap-0.5">
            <Kbd>ctrl</Kbd>
            <Kbd>K</Kbd>
          </span>
        </button>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon-sm" onClick={toggleTheme} aria-label="Toggle theme">
              {theme === "dark" ? <Sun /> : <Moon />}
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            ayu-{theme === "dark" ? "light" : "dark"} <span className="opacity-60">(t)</span>
          </TooltipContent>
        </Tooltip>
      </div>
    </header>
  );
}

function DocsSidebar({ current, filterRef }: { current: string; filterRef: React.RefObject<HTMLInputElement | null> }) {
  const [filter, setFilter] = React.useState("");
  const { setOpenMobile } = useSidebar();
  const matches = (title: string) => title.toLowerCase().includes(filter.toLowerCase());

  return (
    <Sidebar collapsible="offcanvas" className="max-md:h-full">
      <SidebarHeader className="pt-[1ch]">
        <PromptInput
          ref={filterRef}
          prompt="/"
          placeholder="filter..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              setFilter("");
              e.currentTarget.blur();
            }
          }}
          aria-label="Filter pages"
        />
      </SidebarHeader>
      <SidebarContent>
        {GROUPS.map((group) => {
          const pages = PAGES.filter((p) => p.group === group && matches(p.title));
          if (pages.length === 0) return null;
          return (
            <SidebarGroup key={group}>
              <SidebarGroupLabel>
                {GROUP_LABELS[group]} <span className="text-border-strong">{pages.length}</span>
              </SidebarGroupLabel>
              <SidebarMenu>
                {pages.map((p) => (
                  <SidebarMenuItem key={p.slug}>
                    <SidebarMenuButton asChild isActive={p.slug === current}>
                      <a href={`#/${p.slug}`} onClick={() => setOpenMobile(false)}>
                        <span className={cn("w-[1ch] shrink-0", p.slug === current ? "" : "text-border-strong")}>{p.slug === current ? "▸" : "·"}</span>
                        <span>{p.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroup>
          );
        })}
      </SidebarContent>
      <SidebarFooter className="text-xs text-muted-foreground">
        <div className="flex items-center justify-between px-[1ch]">
          <span>v0.1.0</span>
          <span>
            <Kbd>?</Kbd> help
          </span>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

function StatusBar({ slug, position, total, theme }: { slug: string; position: number; total: number; theme: Theme }) {
  const [clock, setClock] = React.useState(() => new Date());
  React.useEffect(() => {
    const id = setInterval(() => setClock(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <footer className="flex h-6 shrink-0 items-center overflow-hidden whitespace-nowrap border-t border-border-strong bg-surface text-xs">
      <span className="flex h-full items-center bg-accent px-[1ch] font-bold text-accent-foreground">NORMAL</span>
      <span className="flex h-full items-center bg-surface-2 px-[1ch] text-foreground">
        <span className="text-muted-foreground">~/</span>
        {slug || "index"}
      </span>
      <span className="hidden items-center gap-[2ch] px-[1ch] text-muted-foreground md:flex">
        <span>
          <span className="text-foreground">^K</span> palette
        </span>
        <span>
          <span className="text-foreground">^B</span> sidebar
        </span>
        <span>
          <span className="text-foreground">t</span> theme
        </span>
        <span>
          <span className="text-foreground">[ ]</span> prev/next
        </span>
        <span>
          <span className="text-foreground">?</span> help
        </span>
      </span>
      <span className="ml-auto flex h-full items-center">
        <span className="hidden px-[1ch] text-muted-foreground sm:inline">utf-8</span>
        <span className="hidden px-[1ch] text-muted-foreground sm:inline">ayu-{theme}</span>
        <span className="flex h-full items-center bg-surface-2 px-[1ch] tabular-nums">
          {position}/{total}
        </span>
        <span className="flex h-full items-center bg-accent px-[1ch] font-bold tabular-nums text-accent-foreground">
          {clock.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
        </span>
      </span>
    </footer>
  );
}
