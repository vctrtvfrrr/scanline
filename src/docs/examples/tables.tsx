import { ArrowDown, ArrowUp, ArrowUpDown, Ellipsis } from "lucide-react";
import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Example } from "@/docs/kit/example";

const INVOICES = [
  { id: "INV001", status: "paid", method: "credit card", amount: 250 },
  { id: "INV002", status: "pending", method: "paypal", amount: 150 },
  { id: "INV003", status: "unpaid", method: "bank transfer", amount: 350 },
  { id: "INV004", status: "paid", method: "credit card", amount: 450 },
  { id: "INV005", status: "paid", method: "paypal", amount: 550 },
];

const STATUS_VARIANT = { paid: "success", pending: "warning", unpaid: "destructive" } as const;

type Task = { id: string; title: string; status: "todo" | "in progress" | "done" | "backlog"; priority: "low" | "medium" | "high"; progress: number };

const TASKS: Task[] = [
  { id: "TASK-8782", title: "Add file tree keyboard navigation", status: "in progress", priority: "high", progress: 64 },
  { id: "TASK-7878", title: "Write theming documentation", status: "backlog", priority: "medium", progress: 0 },
  { id: "TASK-7839", title: "Fix tooltip arrow alignment", status: "todo", priority: "low", progress: 10 },
  { id: "TASK-5562", title: "Ship command palette", status: "done", priority: "high", progress: 100 },
  { id: "TASK-8686", title: "Toast promise states", status: "done", priority: "medium", progress: 100 },
  { id: "TASK-1280", title: "CRT scanline effect toggle", status: "in progress", priority: "low", progress: 38 },
  { id: "TASK-7262", title: "Drawer snap points", status: "todo", priority: "medium", progress: 5 },
  { id: "TASK-1138", title: "Sidebar icon collapse mode", status: "done", priority: "high", progress: 100 },
  { id: "TASK-7184", title: "Pagination ellipsis logic", status: "backlog", priority: "low", progress: 0 },
  { id: "TASK-5160", title: "Progress bar glyph presets", status: "in progress", priority: "medium", progress: 72 },
  { id: "TASK-5618", title: "Dark/light Ayu palettes", status: "done", priority: "high", progress: 100 },
  { id: "TASK-6699", title: "Combobox empty state", status: "todo", priority: "low", progress: 0 },
];

const TASK_STATUS = { todo: "info", "in progress": "warning", done: "success", backlog: "cyan" } as const;
const PRIORITY = { low: "text-muted-foreground", medium: "text-yellow-ink", high: "text-red-ink" } as const;
const PRIORITY_GLYPH = { low: "▁", medium: "▃", high: "▇" } as const;

type SortKey = "id" | "title" | "priority" | "progress";
const PAGE_SIZE = 5;

function DataTable() {
  const [query, setQuery] = React.useState("");
  const [sort, setSort] = React.useState<{ key: SortKey; dir: 1 | -1 }>({ key: "id", dir: 1 });
  const [selected, setSelected] = React.useState<Set<string>>(new Set());
  const [page, setPage] = React.useState(1);

  const rows = React.useMemo(() => {
    const rank = { low: 0, medium: 1, high: 2 };
    const filtered = TASKS.filter((t) => `${t.id} ${t.title} ${t.status}`.toLowerCase().includes(query.toLowerCase()));
    return filtered.toSorted((a, b) => {
      const av = sort.key === "priority" ? rank[a.priority] : a[sort.key];
      const bv = sort.key === "priority" ? rank[b.priority] : b[sort.key];
      return (av < bv ? -1 : av > bv ? 1 : 0) * sort.dir;
    });
  }, [query, sort]);

  const pages = Math.max(1, Math.ceil(rows.length / PAGE_SIZE));
  const visible = rows.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const allVisibleSelected = visible.length > 0 && visible.every((r) => selected.has(r.id));
  const someVisibleSelected = visible.some((r) => selected.has(r.id));

  const toggleSort = (key: SortKey) => setSort((s) => ({ key, dir: s.key === key ? ((-s.dir) as 1 | -1) : 1 }));
  const SortIcon = ({ k }: { k: SortKey }) => (sort.key !== k ? <ArrowUpDown className="opacity-40" /> : sort.dir === 1 ? <ArrowUp /> : <ArrowDown />);
  const SortHead = ({ k, children }: { k: SortKey; children: React.ReactNode }) => (
    <button type="button" className="inline-flex items-center gap-[1ch] uppercase hover:text-foreground [&_svg]:size-3" onClick={() => toggleSort(k)}>
      {children} <SortIcon k={k} />
    </button>
  );

  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <Input
          placeholder="filter tasks..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setPage(1);
          }}
          className="max-w-xs"
        />
        <span className="text-xs text-muted-foreground">
          <span className="text-accent-ink">{selected.size}</span> of {TASKS.length} row(s) selected
        </span>
      </div>
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="w-[5ch]">
              <Checkbox
                aria-label="Select page"
                checked={allVisibleSelected ? true : someVisibleSelected ? "indeterminate" : false}
                onCheckedChange={(v) =>
                  setSelected((s) => {
                    const next = new Set(s);
                    for (const r of visible) v ? next.add(r.id) : next.delete(r.id);
                    return next;
                  })
                }
              />
            </TableHead>
            <TableHead>
              <SortHead k="id">task</SortHead>
            </TableHead>
            <TableHead>
              <SortHead k="title">title</SortHead>
            </TableHead>
            <TableHead>status</TableHead>
            <TableHead>
              <SortHead k="priority">priority</SortHead>
            </TableHead>
            <TableHead className="w-[28ch]">
              <SortHead k="progress">progress</SortHead>
            </TableHead>
            <TableHead className="w-[5ch]" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {visible.length === 0 && (
            <TableRow>
              <TableCell colSpan={7} className="h-20 text-center text-muted-foreground">
                -- no results --
              </TableCell>
            </TableRow>
          )}
          {visible.map((task) => (
            <TableRow key={task.id} data-state={selected.has(task.id) ? "selected" : undefined}>
              <TableCell>
                <Checkbox
                  aria-label={`Select ${task.id}`}
                  checked={selected.has(task.id)}
                  onCheckedChange={(v) =>
                    setSelected((s) => {
                      const next = new Set(s);
                      v ? next.add(task.id) : next.delete(task.id);
                      return next;
                    })
                  }
                />
              </TableCell>
              <TableCell className="text-muted-foreground">{task.id}</TableCell>
              <TableCell className="max-w-[40ch] truncate">{task.title}</TableCell>
              <TableCell>
                <Badge variant={TASK_STATUS[task.status]}>{task.status}</Badge>
              </TableCell>
              <TableCell className={PRIORITY[task.priority]}>
                {PRIORITY_GLYPH[task.priority]} {task.priority}
              </TableCell>
              <TableCell>
                <Progress value={task.progress} tone={task.progress === 100 ? "green" : "accent"} />
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon-sm" aria-label="Row actions">
                      <Ellipsis />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>{task.id}</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => navigator.clipboard.writeText(task.id)}>copy id</DropdownMenuItem>
                    <DropdownMenuItem>edit</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem variant="destructive">delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs text-muted-foreground">
          page {page} of {pages}
        </span>
        <Pagination className="w-auto">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} />
            </PaginationItem>
            {Array.from({ length: pages }, (_, i) => (
              <PaginationItem key={i}>
                <PaginationLink isActive={page === i + 1} onClick={() => setPage(i + 1)}>
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext onClick={() => setPage((p) => Math.min(pages, p + 1))} disabled={page === pages} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}

export default function TablesExample() {
  return (
    <>
      <Example title="basic table" contentClassName="block">
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[12ch]">invoice</TableHead>
              <TableHead>status</TableHead>
              <TableHead>method</TableHead>
              <TableHead className="text-right">amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {INVOICES.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell className="font-medium">{invoice.id}</TableCell>
                <TableCell>
                  <Badge variant={STATUS_VARIANT[invoice.status as keyof typeof STATUS_VARIANT]}>{invoice.status}</Badge>
                </TableCell>
                <TableCell>{invoice.method}</TableCell>
                <TableCell className="text-right tabular-nums">${invoice.amount.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>total</TableCell>
              <TableCell className="text-right tabular-nums text-accent-ink">${INVOICES.reduce((s, i) => s + i.amount, 0).toFixed(2)}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </Example>
      <Example title="data table" description="Filter, sort by clicking headers, select rows and paginate." contentClassName="block">
        <DataTable />
      </Example>
      <Example title="ascii table" contentClassName="block">
        <pre className="overflow-x-auto text-sm leading-tight">
          {`┌──────────┬────────────┬──────────┬─────────┐
│ ${"NAME".padEnd(8)} │ ${"STATUS".padEnd(10)} │ ${"CPU".padEnd(8)} │ ${"MEM".padEnd(7)} │
├──────────┼────────────┼──────────┼─────────┤
│ nginx    │ running    │ 0.3%     │ 12M     │
│ postgres │ running    │ 2.1%     │ 214M    │
│ redis    │ stopped    │ 0.0%     │ 0B      │
└──────────┴────────────┴──────────┴─────────┘`}
        </pre>
      </Example>
    </>
  );
}
