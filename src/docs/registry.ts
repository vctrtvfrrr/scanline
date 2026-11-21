import type * as React from "react";

export type PageGroup = "overview" | "components" | "examples";

export type PageEntry = {
  slug: string;
  title: string;
  group: PageGroup;
  description: string;
  files?: string[];
  Component: React.ComponentType;
  usage?: { filename: string; code: string };
  sources: { filename: string; code: string }[];
};

type Meta = Omit<PageEntry, "Component" | "usage" | "sources"> & { module?: string };

const demoModules = import.meta.glob<React.ComponentType>(["./demos/*.tsx", "./examples/*.tsx", "./pages/*.tsx"], { import: "default", eager: true });
const demoSources = import.meta.glob<string>(["./demos/*.tsx", "./examples/*.tsx"], { query: "?raw", import: "default", eager: true });
const uiSources = import.meta.glob<string>("../components/ui/*.tsx", { query: "?raw", import: "default", eager: true });

const META: Meta[] = [
  { slug: "", title: "Introduction", group: "overview", module: "./pages/home.tsx", description: "TUI-flavoured React components, inspired by shadcn/ui." },
  { slug: "theming", title: "Theming", group: "overview", module: "./pages/theming.tsx", description: "Ayu Light and Ayu Dark palettes exposed as CSS variables and Tailwind tokens." },

  { slug: "accordion", title: "Accordion", group: "components", files: ["accordion"], description: "A vertically stacked set of interactive headings that each reveal a section of content." },
  { slug: "alert", title: "Alert", group: "components", files: ["alert"], description: "Displays a callout for user attention, styled like a log line with severity." },
  { slug: "badge", title: "Badge", group: "components", files: ["badge"], description: "Displays a badge or a component that looks like a badge." },
  { slug: "button", title: "Button / Button Group", group: "components", files: ["button", "button-group"], description: "Displays a button with a hard drop shadow, or a group of joined buttons." },
  { slug: "card", title: "Card", group: "components", files: ["card"], description: "A bordered panel with labels embedded in its border, like a TUI window." },
  { slug: "checkbox", title: "Checkbox / Radio Group", group: "components", files: ["checkbox", "radio-group"], description: "Checkable controls rendered as [x] and (•) glyphs." },
  { slug: "collapsible", title: "Collapsible", group: "components", files: ["collapsible"], description: "An interactive component which expands/collapses a panel." },
  { slug: "combobox", title: "Combobox", group: "components", files: ["combobox", "command", "popover"], description: "Autocomplete input and command palette with a list of suggestions." },
  { slug: "command", title: "Command", group: "components", files: ["command"], description: "Fast, composable command menu powered by cmdk." },
  { slug: "context-menu", title: "Context Menu", group: "components", files: ["context-menu"], description: "Displays a menu triggered by a right click." },
  { slug: "dialog", title: "Dialog", group: "components", files: ["dialog"], description: "A double-bordered window overlaid on a dithered backdrop." },
  { slug: "drawer", title: "Drawer", group: "components", files: ["drawer"], description: "A panel that slides in from the edge of the screen, powered by vaul." },
  { slug: "dropdown-menu", title: "Dropdown Menu", group: "components", files: ["dropdown-menu"], description: "Displays a menu of actions or functions triggered by a button." },
  { slug: "file-tree", title: "File Tree", group: "components", files: ["file-tree"], description: "A keyboard navigable tree with `tree`-style guides and git status markers." },
  { slug: "inputs", title: "Input / Select / Switch", group: "components", files: ["input", "select", "switch", "label"], description: "Text fields, prompt inputs, selects and toggles." },
  { slug: "menubar", title: "Menubar / Navigation Menu", group: "components", files: ["menubar", "navigation-menu"], description: "Persistent application menus and site navigation." },
  { slug: "pagination", title: "Pagination", group: "components", files: ["pagination"], description: "Pagination with page navigation, next and previous links." },
  { slug: "popover", title: "Popover", group: "components", files: ["popover"], description: "Displays rich content in a portal, triggered by a button." },
  { slug: "progress", title: "Progress / Spinner", group: "components", files: ["progress", "spinner", "skeleton"], description: "Character-cell progress bars, braille spinners and shimmering skeletons." },
  { slug: "sidebar", title: "Sidebar", group: "components", files: ["sidebar"], description: "A composable, collapsible sidebar. Toggle the docs sidebar with ctrl+b." },
  { slug: "tabs", title: "Tabs", group: "components", files: ["tabs"], description: "Layered sections of content, with optional lazygit-style numbering." },
  { slug: "toast", title: "Toast", group: "components", files: ["sonner"], description: "Opinionated toast notifications, powered by sonner." },
  { slug: "tooltip", title: "Tooltip", group: "components", files: ["tooltip", "kbd"], description: "An inverted popup that displays information on hover or focus." },

  { slug: "tables", title: "Tables", group: "examples", files: ["table"], description: "Basic and data tables with filtering, sorting, selection and pagination." },
  { slug: "forms", title: "Forms", group: "examples", description: "A settings form composed from inputs, selects, radios, switches and validation." },
  { slug: "typography", title: "Typography", group: "examples", files: ["kbd", "separator"], description: "Headings, prose, lists, code and the type scale in JetBrains Mono." },
  { slug: "board", title: "Kanban Board", group: "examples", description: "A keyboard driven task board inspired by Backlog.md." },
  { slug: "monitor", title: "System Monitor", group: "examples", description: "A live dashboard inspired by btop." },
];

function moduleFor(meta: Meta) {
  if (meta.module) return meta.module;
  return meta.group === "examples" ? `./examples/${meta.slug}.tsx` : `./demos/${meta.slug}.tsx`;
}

export const PAGES: PageEntry[] = META.map((meta) => {
  const path = moduleFor(meta);
  const code = demoSources[path];
  return {
    ...meta,
    Component: demoModules[path],
    usage: code ? { filename: path.replace(/^\.\//, "docs/"), code } : undefined,
    sources: (meta.files ?? []).map((name) => ({ filename: `components/ui/${name}.tsx`, code: uiSources[`../components/ui/${name}.tsx`] ?? "" })),
  };
});

export const GROUP_LABELS: Record<PageGroup, string> = { overview: "getting started", components: "components", examples: "examples" };
