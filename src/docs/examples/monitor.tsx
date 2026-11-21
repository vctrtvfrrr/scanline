import { Cpu, HardDrive, MemoryStick, Wifi } from "lucide-react";
import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Example } from "@/docs/kit/example";

const BARS = "▁▂▃▄▅▆▇█";
const PROCS = ["bun", "vite", "node", "postgres", "redis-server", "nginx", "chrome", "zsh"];

function jitter(v: number, amount: number) {
  return Math.max(1, Math.min(99, v + (Math.random() - 0.5) * amount));
}

function useTicker<T>(initial: T, step: (prev: T) => T, ms = 1000) {
  const [state, setState] = React.useState(initial);
  React.useEffect(() => {
    const id = setInterval(() => setState(step), ms);
    return () => clearInterval(id);
  }, [step, ms]);
  return state;
}

const stepCores = (cores: number[]) => cores.map((c) => jitter(c, 30));
const stepNet = (net: number[]) => [...net.slice(1), jitter(net.at(-1) ?? 50, 40)];
const stepProcs = (procs: { name: string; cpu: number; mem: number; pid: number }[]) =>
  procs.map((p) => ({ ...p, cpu: Math.max(0, jitter(p.cpu * 4, 20) / 4) })).toSorted((a, b) => b.cpu - a.cpu);

function tone(v: number) {
  return v > 80 ? "red" : v > 55 ? "yellow" : "green";
}

export default function MonitorExample() {
  const cores = useTicker(
    Array.from({ length: 8 }, () => Math.random() * 80),
    stepCores,
  );
  const net = useTicker(
    Array.from({ length: 48 }, () => Math.random() * 60 + 20),
    stepNet,
    600,
  );
  const procs = useTicker(
    PROCS.map((name, i) => ({ name, pid: 1200 + i * 137, cpu: Math.random() * 20, mem: Math.round(Math.random() * 900) })),
    stepProcs,
    1500,
  );
  const avg = cores.reduce((s, c) => s + c, 0) / cores.length;

  return (
    <Example title="system monitor" description="A btop-inspired dashboard composed of Card, Progress and Table." contentClassName="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <Card label={<><Cpu /> cpu</>} labelEnd={`${avg.toFixed(0)}%`} footerLabel="8 cores · 3.2GHz">
        <CardContent className="grid gap-0.5 pb-1">
          {cores.map((v, i) => (
            <div key={i} className="flex items-center gap-[1ch]">
              <span className="w-[4ch] text-muted-foreground">C{i}</span>
              <Progress value={v} tone={tone(v)} />
            </div>
          ))}
        </CardContent>
      </Card>
      <div className="grid min-w-0 gap-6">
        <Card label={<><MemoryStick /> mem</>} labelEnd="16.0 GiB">
          <CardContent className="grid gap-0.5">
            {[
              ["used", 62, "magenta"],
              ["cache", 24, "cyan"],
              ["swap", 8, "yellow"],
            ].map(([label, v, t]) => (
              <div key={label as string} className="flex items-center gap-[1ch]">
                <span className="w-[6ch] text-muted-foreground">{label}</span>
                <Progress value={v as number} tone={t as "magenta"} glyphs="shade" />
              </div>
            ))}
          </CardContent>
        </Card>
        <Card label={<><Wifi /> net</>} labelEnd="eth0">
          <CardContent>
            <div className="overflow-hidden whitespace-nowrap text-lg leading-none text-green-ink">
              {net.map((v) => BARS[Math.min(BARS.length - 1, Math.floor((v / 100) * BARS.length))]).join("")}
            </div>
            <div className="mt-1 flex justify-between text-xs text-muted-foreground">
              <span>
                ▼ <span className="text-green-ink">{(net.at(-1)! / 8).toFixed(1)} MB/s</span>
              </span>
              <span>
                ▲ <span className="text-blue-ink">{(net.at(-2)! / 30).toFixed(1)} MB/s</span>
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
      <Card label={<><HardDrive /> proc</>} labelEnd={`${procs.length} running`} className="pb-0 lg:col-span-2">
        <CardContent className="px-0 [&_[data-slot=table-container]]:border-x-0 [&_[data-slot=table-container]]:border-b-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[8ch]">pid</TableHead>
                <TableHead>program</TableHead>
                <TableHead className="w-[30ch]">cpu%</TableHead>
                <TableHead className="w-[10ch] text-right">mem</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {procs.map((p) => (
                <TableRow key={p.pid}>
                  <TableCell className="text-muted-foreground tabular-nums">{p.pid}</TableCell>
                  <TableCell>{p.name}</TableCell>
                  <TableCell>
                    <Progress value={p.cpu} tone={tone(p.cpu)} cells={24} className="w-auto" />
                  </TableCell>
                  <TableCell className="text-right tabular-nums">{p.mem}M</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </Example>
  );
}
