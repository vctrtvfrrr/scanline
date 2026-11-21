import * as React from "react";
import { cn } from "@/lib/utils";

const GLYPHS = {
  block: { fill: "█", empty: "░", open: "", close: "" },
  shade: { fill: "▓", empty: "░", open: "", close: "" },
  ascii: { fill: "#", empty: ".", open: "[", close: "]" },
  arrow: { fill: "=", empty: " ", open: "[", close: "]" },
} as const;

const TONES = {
  accent: "text-accent-ink",
  green: "text-green-ink",
  yellow: "text-yellow-ink",
  red: "text-red-ink",
  blue: "text-blue-ink",
  magenta: "text-magenta-ink",
  cyan: "text-cyan-ink",
} as const;

type ProgressProps = Omit<React.ComponentProps<"div">, "children"> & {
  value?: number | null;
  max?: number;
  glyphs?: keyof typeof GLYPHS;
  tone?: keyof typeof TONES;
  showValue?: boolean;
  cells?: number;
};

function useCellCount(ref: React.RefObject<HTMLElement | null>, fixed?: number) {
  const [cells, setCells] = React.useState(fixed ?? 20);

  React.useLayoutEffect(() => {
    const el = ref.current;
    if (fixed || !el) return;
    const measure = () => {
      const probe = document.createElement("span");
      probe.textContent = "0".repeat(10);
      probe.style.cssText = "position:absolute;visibility:hidden;white-space:pre";
      el.appendChild(probe);
      const charWidth = probe.getBoundingClientRect().width / 10;
      probe.remove();
      setCells(Math.max(4, Math.floor(el.clientWidth / charWidth)));
    };
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    let active = true;
    document.fonts.ready.then(() => active && measure());
    return () => {
      active = false;
      observer.disconnect();
    };
  }, [ref, fixed]);

  return cells;
}

function Progress({ className, value = 0, max = 100, glyphs = "block", tone = "accent", showValue = true, cells: fixedCells, ...props }: ProgressProps) {
  const trackRef = React.useRef<HTMLSpanElement>(null);
  const g = GLYPHS[glyphs];
  const total = useCellCount(trackRef, fixedCells) - g.open.length - g.close.length;
  const indeterminate = value === null;
  const ratio = indeterminate ? 0 : Math.min(1, Math.max(0, value / max));
  const filled = Math.round(ratio * total);
  const head = glyphs === "arrow" && filled > 0 && filled < total ? ">" : "";

  return (
    <div
      data-slot="progress"
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={indeterminate ? undefined : value}
      className={cn("flex w-full items-center gap-[1ch] whitespace-pre", className)}
      {...props}
    >
      <span ref={trackRef} className="relative w-0 min-w-0 flex-1 overflow-hidden leading-none">
        <span className="text-muted-foreground">{g.open}</span>
        <span className={TONES[tone]}>{indeterminate ? "" : g.fill.repeat(Math.max(0, filled - head.length)) + head}</span>
        <span className="text-border-strong">{g.empty.repeat(Math.max(0, total - filled))}</span>
        <span className="text-muted-foreground">{g.close}</span>
      </span>
      {showValue && <span className="w-[4ch] shrink-0 text-right text-muted-foreground tabular-nums">{indeterminate ? "--" : `${Math.round(ratio * 100)}%`}</span>}
    </div>
  );
}

export { Progress, type ProgressProps };
