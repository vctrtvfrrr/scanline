import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Kbd } from "@/components/ui/kbd";
import { Example } from "@/docs/kit/example";
import { cn } from "@/lib/utils";

type Task = { id: number; title: string; labels: string[]; assignee?: string; priority?: "high" | "medium" | "low" };
type Column = { name: string; tone: string; tasks: Task[] };

const INITIAL: Column[] = [
  {
    name: "To Do",
    tone: "text-blue-ink",
    tasks: [
      { id: 12, title: "Add combobox empty state", labels: ["ui"], priority: "low" },
      { id: 14, title: "Document theming tokens", labels: ["docs"], assignee: "@victor" },
      { id: 15, title: "Drawer snap points", labels: ["ui", "a11y"], priority: "medium" },
      { id: 18, title: "Publish to npm", labels: ["release"], priority: "high" },
    ],
  },
  {
    name: "In Progress",
    tone: "text-yellow-ink",
    tasks: [
      { id: 9, title: "File tree keyboard navigation", labels: ["ui", "a11y"], assignee: "@victor", priority: "high" },
      { id: 11, title: "CRT scanline toggle", labels: ["fx"], priority: "low" },
    ],
  },
  {
    name: "Done",
    tone: "text-green-ink",
    tasks: [
      { id: 1, title: "Project scaffold (bun + vite)", labels: ["infra"] },
      { id: 3, title: "Ayu light/dark palettes", labels: ["theme"] },
      { id: 5, title: "Command palette", labels: ["ui"] },
    ],
  },
];

const PRIORITY_TONE = { high: "text-red-ink", medium: "text-yellow-ink", low: "text-muted-foreground" } as const;

export default function BoardExample() {
  const [columns, setColumns] = React.useState(INITIAL);
  const [cursor, setCursor] = React.useState({ col: 0, row: 0 });
  const [open, setOpen] = React.useState<Task | null>(null);
  const boardRef = React.useRef<HTMLDivElement>(null);

  const clampRow = (col: number, row: number) => Math.max(0, Math.min(columns[col].tasks.length - 1, row));

  const moveTask = (dir: -1 | 1) => {
    const target = cursor.col + dir;
    const task = columns[cursor.col].tasks[cursor.row];
    if (!task || target < 0 || target >= columns.length) return;
    setColumns((cols) =>
      cols.map((c, i) => {
        if (i === cursor.col) return { ...c, tasks: c.tasks.filter((t) => t.id !== task.id) };
        if (i === target) return { ...c, tasks: [task, ...c.tasks] };
        return c;
      }),
    );
    setCursor({ col: target, row: 0 });
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    const key = event.key;
    const nav: Record<string, () => void> = {
      ArrowLeft: () => setCursor((c) => ({ col: Math.max(0, c.col - 1), row: clampRow(Math.max(0, c.col - 1), c.row) })),
      h: () => nav.ArrowLeft(),
      ArrowRight: () => setCursor((c) => ({ col: Math.min(columns.length - 1, c.col + 1), row: clampRow(Math.min(columns.length - 1, c.col + 1), c.row) })),
      l: () => nav.ArrowRight(),
      ArrowDown: () => setCursor((c) => ({ ...c, row: clampRow(c.col, c.row + 1) })),
      j: () => nav.ArrowDown(),
      ArrowUp: () => setCursor((c) => ({ ...c, row: clampRow(c.col, c.row - 1) })),
      k: () => nav.ArrowUp(),
      "<": () => moveTask(-1),
      ">": () => moveTask(1),
      Enter: () => setOpen(columns[cursor.col].tasks[cursor.row] ?? null),
    };
    if (nav[key]) {
      event.preventDefault();
      nav[key]();
    }
  };

  const total = columns.reduce((s, c) => s + c.tasks.length, 0);

  return (
    <Example
      title="backlog board"
      description={
        <>
          Click the board to focus it. <Kbd>←↑↓→</Kbd> / <Kbd>hjkl</Kbd> navigate · <Kbd>&lt;</Kbd> <Kbd>&gt;</Kbd> move task · <Kbd>enter</Kbd> open.
        </>
      }
      contentClassName="block"
    >
      <div ref={boardRef} tabIndex={0} onKeyDown={onKeyDown} className="group/board flex flex-col border border-border-strong bg-background outline-none focus-visible:border-accent focus-visible:outline-none">
        <div className="flex h-7 items-center justify-between border-b border-border-strong bg-surface-2 px-[1ch]">
          <span>
            <span className="font-bold text-accent-ink">Backlog</span> board · <span className="text-muted-foreground">scanline</span>
          </span>
          <span className="text-xs text-muted-foreground">{total} tasks</span>
        </div>
        <div className="grid grid-cols-1 gap-[2ch] p-[2ch] pt-5 md:grid-cols-3">
          {columns.map((column, ci) => (
            <section key={column.name} className="relative flex min-h-56 flex-col gap-1 border border-border-strong bg-background p-[1ch] pt-3">
              <h3 className={cn("border-label font-bold", column.tone, cursor.col === ci && "group-focus-visible/board:bg-accent group-focus-visible/board:text-accent-foreground")}>
                {column.name} ({column.tasks.length})
              </h3>
              {column.tasks.length === 0 && <div className="py-4 text-center text-muted-foreground">-- empty --</div>}
              {column.tasks.map((task, ri) => {
                const active = cursor.col === ci && cursor.row === ri;
                return (
                  <button
                    type="button"
                    key={task.id}
                    tabIndex={-1}
                    onClick={() => {
                      setCursor({ col: ci, row: ri });
                      boardRef.current?.focus();
                    }}
                    onDoubleClick={() => setOpen(task)}
                    className={cn(
                      "flex flex-col gap-0.5 border border-border px-[1ch] py-1 text-left hover:border-border-strong",
                      active && "border-accent bg-accent/8 group-focus-visible/board:border-accent",
                    )}
                  >
                    <span className="flex items-baseline gap-[1ch]">
                      <span className={cn("text-muted-foreground", active && "text-accent-ink")}>{active ? "▸" : " "}</span>
                      <span className="text-muted-foreground">task-{task.id}</span>
                      <span className="truncate">{task.title}</span>
                    </span>
                    <span className="flex flex-wrap items-center gap-[1ch] pl-[2ch] text-xs">
                      {task.labels.map((l) => (
                        <span key={l} className="text-magenta-ink">
                          #{l}
                        </span>
                      ))}
                      {task.assignee && <span className="text-cyan-ink">{task.assignee}</span>}
                      {task.priority && <span className={cn("ml-auto", PRIORITY_TONE[task.priority])}>!{task.priority}</span>}
                    </span>
                  </button>
                );
              })}
            </section>
          ))}
        </div>
        <div className="flex h-6 items-center gap-[2ch] overflow-x-auto whitespace-nowrap border-t border-border-strong bg-surface-2 px-[1ch] text-xs text-muted-foreground">
          <span>
            <span className="text-foreground">←→</span> column
          </span>
          <span>
            <span className="text-foreground">↑↓</span> task
          </span>
          <span>
            <span className="text-foreground">&lt; &gt;</span> move
          </span>
          <span>
            <span className="text-foreground">enter</span> view
          </span>
          <span className="ml-auto">
            {columns[cursor.col].name} · {cursor.row + 1}/{Math.max(1, columns[cursor.col].tasks.length)}
          </span>
        </div>
      </div>
      <Dialog open={open !== null} onOpenChange={(o) => !o && setOpen(null)}>
        <DialogContent label={open ? `task-${open.id}` : undefined}>
          {open && (
            <>
              <DialogHeader>
                <DialogTitle>{open.title}</DialogTitle>
                <DialogDescription>Created 2026-11-20 · {open.assignee ?? "unassigned"}</DialogDescription>
              </DialogHeader>
              <dl className="grid grid-cols-[12ch_1fr] gap-y-1">
                <dt className="text-muted-foreground">status</dt>
                <dd>{columns.find((c) => c.tasks.some((t) => t.id === open.id))?.name}</dd>
                <dt className="text-muted-foreground">priority</dt>
                <dd className={open.priority ? PRIORITY_TONE[open.priority] : "text-muted-foreground"}>{open.priority ?? "none"}</dd>
                <dt className="text-muted-foreground">labels</dt>
                <dd className="flex gap-1">
                  {open.labels.map((l) => (
                    <Badge key={l} variant="magenta">
                      {l}
                    </Badge>
                  ))}
                </dd>
              </dl>
              <div className="border-t border-dashed border-border-strong pt-2">
                <div className="text-xs uppercase tracking-wider text-muted-foreground">acceptance criteria</div>
                <div>[x] #1 implementation merged</div>
                <div>[ ] #2 docs updated</div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </Example>
  );
}
