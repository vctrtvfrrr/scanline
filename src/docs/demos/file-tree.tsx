import * as React from "react";
import { FileTree, type FileTreeNode } from "@/components/ui/file-tree";
import { Kbd } from "@/components/ui/kbd";
import { Example } from "@/docs/kit/example";

const M = <span className="text-yellow-ink">M</span>;
const U = <span className="text-green-ink">U</span>;
const D = <span className="text-red-ink">D</span>;

const TREE: FileTreeNode[] = [
  {
    name: "src",
    children: [
      {
        name: "components",
        children: [
          { name: "ui", children: [{ name: "button.tsx", meta: M }, { name: "card.tsx" }, { name: "file-tree.tsx", meta: U }, { name: "dialog.tsx" }] },
          { name: "app-shell.tsx" },
        ],
      },
      { name: "lib", children: [{ name: "utils.ts" }, { name: "theme.tsx", meta: M }] },
      { name: "assets", children: [{ name: "logo.svg" }, { name: "hero.png" }] },
      { name: "index.css" },
      { name: "main.tsx" },
    ],
  },
  { name: "public", children: [{ name: "favicon.svg" }] },
  { name: "docs", children: [{ name: "getting-started.md" }, { name: "theming.md", meta: D }] },
  { name: ".gitignore" },
  { name: "bun.lock" },
  { name: "package.json", meta: M },
  { name: "README.md" },
  { name: "tsconfig.json" },
  { name: "vite.config.ts" },
];

export default function FileTreeDemo() {
  const [selected, setSelected] = React.useState("src/components/ui/button.tsx");
  return (
    <>
      <Example
        title="project explorer"
        description={
          <>
            focus the tree and use <Kbd>↑</Kbd> <Kbd>↓</Kbd> (or <Kbd>j</Kbd> <Kbd>k</Kbd>) to move, <Kbd>→</Kbd> <Kbd>←</Kbd> to expand / collapse and <Kbd>enter</Kbd> to open.
          </>
        }
        contentClassName="items-start gap-6"
      >
        <div className="relative w-full max-w-[48ch] border border-border-strong bg-surface py-3">
          <span className="border-label text-accent-ink">explorer</span>
          <span className="border-label right-[1ch] left-auto text-muted-foreground">git: main</span>
          <FileTree data={TREE} rootLabel="~/scanline" defaultExpanded={["src", "src/components", "src/components/ui"]} selected={selected} onSelect={setSelected} />
        </div>
        <div className="relative min-w-[30ch] flex-1 border border-border-strong bg-surface p-[2ch] py-3">
          <span className="border-label text-accent-ink">preview</span>
          <div className="text-muted-foreground">selected:</div>
          <div className="text-accent-ink">{selected}</div>
        </div>
      </Example>
      <Example title="minimal" contentClassName="block">
        <FileTree data={[{ name: "README.md" }, { name: "src", children: [{ name: "index.ts" }] }]} rootLabel="." showSummary={false} defaultExpanded={["src"]} />
      </Example>
    </>
  );
}
