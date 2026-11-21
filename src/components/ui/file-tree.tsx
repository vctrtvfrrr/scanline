import { Braces, File, FileCode, FileImage, FileLock, FileText, Folder, FolderOpen } from "lucide-react";
import * as React from "react";
import { cn } from "@/lib/utils";

type FileTreeNode = {
  name: string;
  children?: FileTreeNode[];
  meta?: React.ReactNode;
};

type FileTreeProps = Omit<React.ComponentProps<"div">, "onSelect"> & {
  data: FileTreeNode[];
  rootLabel?: React.ReactNode;
  defaultExpanded?: string[];
  selected?: string;
  onSelect?: (path: string, node: FileTreeNode) => void;
  showSummary?: boolean;
};

type VisibleRow = { path: string; node: FileTreeNode; level: number; guides: string; parent: string | null };

const isDir = (node: FileTreeNode) => node.children !== undefined;

function fileIcon(node: FileTreeNode, open: boolean) {
  if (isDir(node)) return open ? <FolderOpen className="text-blue-ink" /> : <Folder className="text-blue-ink" />;
  const ext = node.name.split(".").pop()?.toLowerCase();
  if (["ts", "tsx", "js", "jsx", "css", "html", "sh"].includes(ext ?? "")) return <FileCode className="text-yellow-ink" />;
  if (["json", "toml", "yaml", "yml"].includes(ext ?? "")) return <Braces className="text-magenta-ink" />;
  if (["md", "mdx", "txt"].includes(ext ?? "")) return <FileText className="text-cyan-ink" />;
  if (["png", "jpg", "jpeg", "gif", "svg", "webp"].includes(ext ?? "")) return <FileImage className="text-green-ink" />;
  if (ext === "lock" || ext === "lockb") return <FileLock className="text-muted-foreground" />;
  return <File className="text-muted-foreground" />;
}

function flatten(nodes: FileTreeNode[], expanded: Set<string>, parent: string | null = null, prefix = "", level = 1): VisibleRow[] {
  return nodes.flatMap((node, index) => {
    const last = index === nodes.length - 1;
    const path = parent ? `${parent}/${node.name}` : node.name;
    const row: VisibleRow = { path, node, level, guides: `${prefix}${last ? "└── " : "├── "}`, parent };
    const open = isDir(node) && expanded.has(path);
    const children = open ? flatten(node.children ?? [], expanded, path, `${prefix}${last ? "    " : "│   "}`, level + 1) : [];
    return [row, ...children];
  });
}

function countNodes(nodes: FileTreeNode[]): { dirs: number; files: number } {
  return nodes.reduce(
    (acc, node) => {
      if (!isDir(node)) return { ...acc, files: acc.files + 1 };
      const inner = countNodes(node.children ?? []);
      return { dirs: acc.dirs + 1 + inner.dirs, files: acc.files + inner.files };
    },
    { dirs: 0, files: 0 },
  );
}

function FileTree({ data, rootLabel = ".", defaultExpanded = [], selected: selectedProp, onSelect, showSummary = true, className, ...props }: FileTreeProps) {
  const id = React.useId();
  const [expanded, setExpanded] = React.useState(() => new Set(defaultExpanded));
  const [internalSelected, setInternalSelected] = React.useState<string>();
  const [focused, setFocused] = React.useState<string>();
  const selected = selectedProp ?? internalSelected;

  const rows = React.useMemo(() => flatten(data, expanded), [data, expanded]);
  const summary = React.useMemo(() => countNodes(data), [data]);
  const focusIndex = Math.max(0, rows.findIndex((r) => r.path === focused));
  const rowId = (path: string) => `${id}-${path.replace(/[^\w-]/g, "_")}`;

  const toggle = (path: string, open?: boolean) =>
    setExpanded((prev) => {
      const next = new Set(prev);
      const shouldOpen = open ?? !next.has(path);
      if (shouldOpen) next.add(path);
      else next.delete(path);
      return next;
    });

  const activate = (row: VisibleRow) => {
    setFocused(row.path);
    if (isDir(row.node)) toggle(row.path);
    setInternalSelected(row.path);
    onSelect?.(row.path, row.node);
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    const row = rows[focusIndex];
    if (!row) return;
    const move = (index: number) => {
      const target = rows[Math.min(rows.length - 1, Math.max(0, index))];
      setFocused(target.path);
      document.getElementById(rowId(target.path))?.scrollIntoView({ block: "nearest" });
    };
    const handlers: Record<string, () => void> = {
      ArrowDown: () => move(focusIndex + 1),
      j: () => move(focusIndex + 1),
      ArrowUp: () => move(focusIndex - 1),
      k: () => move(focusIndex - 1),
      Home: () => move(0),
      End: () => move(rows.length - 1),
      ArrowRight: () => {
        if (!isDir(row.node)) return;
        if (!expanded.has(row.path)) toggle(row.path, true);
        else move(focusIndex + 1);
      },
      ArrowLeft: () => {
        if (isDir(row.node) && expanded.has(row.path)) toggle(row.path, false);
        else if (row.parent) move(rows.findIndex((r) => r.path === row.parent));
      },
      Enter: () => activate(row),
      " ": () => activate(row),
    };
    const handler = handlers[event.key];
    if (handler) {
      event.preventDefault();
      handler();
    }
  };

  return (
    <div data-slot="file-tree" className={cn("flex flex-col font-mono", className)} {...props}>
      {rootLabel && <div className="px-[1ch] font-bold text-blue-ink">{rootLabel}</div>}
      <div
        role="tree"
        tabIndex={0}
        aria-activedescendant={rows[focusIndex] ? rowId(rows[focusIndex].path) : undefined}
        onKeyDown={onKeyDown}
        onFocus={() => setFocused((f) => f ?? rows[0]?.path)}
        className="group/tree outline-none"
      >
        {rows.map((row, index) => {
          const open = expanded.has(row.path);
          return (
            <div
              key={row.path}
              id={rowId(row.path)}
              role="treeitem"
              aria-level={row.level}
              aria-expanded={isDir(row.node) ? open : undefined}
              aria-selected={selected === row.path}
              data-focused={index === focusIndex && focused !== undefined ? true : undefined}
              onClick={() => activate(row)}
              className={cn(
                "flex h-[1.35em] cursor-pointer items-center whitespace-pre leading-[1.35] px-[1ch] hover:bg-surface-2 [&_svg]:size-3.5 [&_svg]:shrink-0",
                "aria-selected:text-accent-ink",
                "group-focus-visible/tree:data-[focused]:bg-accent group-focus-visible/tree:data-[focused]:text-accent-foreground group-focus-visible/tree:data-[focused]:[&_*]:text-accent-foreground",
              )}
            >
              <span aria-hidden className="text-border-strong">
                {row.guides}
              </span>
              {fileIcon(row.node, open)}
              <span className={cn("ml-[1ch] truncate", isDir(row.node) && "font-medium")}>
                {row.node.name}
                {isDir(row.node) && "/"}
              </span>
              {row.node.meta && <span className="ml-auto pl-[2ch] text-xs text-muted-foreground">{row.node.meta}</span>}
            </div>
          );
        })}
      </div>
      {showSummary && (
        <div className="mt-2 px-[1ch] text-xs text-muted-foreground">
          {summary.dirs} directories, {summary.files} files
        </div>
      )}
    </div>
  );
}

export { FileTree, type FileTreeNode, type FileTreeProps };
