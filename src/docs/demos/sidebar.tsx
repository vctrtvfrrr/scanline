import { Calendar, ChevronsUpDown, House, Inbox, Search, Settings } from "lucide-react";
import * as React from "react";
import { Button } from "@/components/ui/button";
import {
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
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Example } from "@/docs/kit/example";

const ITEMS = [
  { title: "home", icon: House },
  { title: "inbox", icon: Inbox, badge: 24 },
  { title: "calendar", icon: Calendar },
  { title: "search", icon: Search },
  { title: "settings", icon: Settings },
];

export default function SidebarDemo() {
  const [active, setActive] = React.useState("inbox");
  const [collapsible, setCollapsible] = React.useState<"icon" | "offcanvas">("icon");

  return (
    <Example
      title="app shell"
      description="An embedded sidebar with icon collapse. The docs navigation on the left is the same component."
      contentClassName="block"
    >
      <div className="mb-3 flex gap-2">
        {(["icon", "offcanvas"] as const).map((mode) => (
          <Button key={mode} size="sm" variant={collapsible === mode ? "default" : "secondary"} onClick={() => setCollapsible(mode)}>
            collapsible="{mode}"
          </Button>
        ))}
      </div>
      <SidebarProvider keyboardShortcut={false} className="h-80 border border-border-strong">
        <Sidebar collapsible={collapsible}>
          <SidebarHeader className="pt-[1ch]">
            <button type="button" className="flex items-center gap-[1ch] px-[1ch] py-0.5 text-left hover:bg-surface-2">
              <span className="flex size-6 shrink-0 items-center justify-center bg-accent font-bold text-accent-foreground">A</span>
              <span className="grid min-w-0 flex-1 group-data-[collapsible=icon]/sidebar:hidden">
                <span className="truncate font-bold">acme inc</span>
                <span className="truncate text-xs text-muted-foreground">enterprise</span>
              </span>
              <ChevronsUpDown className="size-3.5 text-muted-foreground group-data-[collapsible=icon]/sidebar:hidden" />
            </button>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>application</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {ITEMS.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton isActive={active === item.title} onClick={() => setActive(item.title)} tooltip={item.title}>
                        <item.icon />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                      {item.badge && <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>}
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            <SidebarGroup>
              <SidebarGroupLabel>projects</SidebarGroupLabel>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <span className="text-accent-ink">▸</span>
                    <span>scanline</span>
                  </SidebarMenuButton>
                  <SidebarMenuSub>
                    {["design", "engineering", "marketing"].map((sub) => (
                      <SidebarMenuSubItem key={sub}>
                        <SidebarMenuSubButton isActive={sub === "engineering"}>
                          <span>{sub}</span>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
            <div className="flex items-center gap-[1ch] px-[1ch] text-xs text-muted-foreground group-data-[collapsible=icon]/sidebar:hidden">
              <span className="text-green-ink">●</span> online · v0.1.0
            </div>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset>
          <header className="flex h-8 items-center gap-[1ch] border-b border-border-strong px-[1ch]">
            <SidebarTrigger />
            <span className="text-muted-foreground">
              acme / <span className="text-foreground">{active}</span>
            </span>
          </header>
          <div className="grid flex-1 grid-cols-3 gap-2 p-[2ch]">
            {Array.from({ length: 6 }, (_, i) => (
              <div key={i} className="border border-dashed border-border-strong" />
            ))}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </Example>
  );
}
