import type * as React from "react";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Kbd } from "@/components/ui/kbd";
import { AsciiLogo } from "@/docs/kit/ascii-logo";
import { PAGES } from "@/docs/registry";
import { useTheme } from "@/lib/theme";

const SWATCHES = ["black", "red", "green", "yellow", "blue", "magenta", "cyan", "white"] as const;
const SWATCH_BG: Record<(typeof SWATCHES)[number], string> = {
  black: "bg-black",
  red: "bg-red",
  green: "bg-green",
  yellow: "bg-yellow",
  blue: "bg-blue",
  magenta: "bg-magenta",
  cyan: "bg-cyan",
  white: "bg-white",
};

export default function Home() {
  const { theme } = useTheme();
  const components = PAGES.filter((p) => p.group === "components");
  const examples = PAGES.filter((p) => p.group === "examples");

  const info: [string, React.ReactNode][] = [
    ["OS", "the web (any modern browser)"],
    ["Stack", "bun + react 19 + vite"],
    ["Styling", "tailwind css v4 + css variables"],
    ["Primitives", "radix ui · cmdk · vaul · sonner"],
    ["Theme", <span key="t">ayu-{theme}</span>],
    ["Font", "JetBrains Mono @ 0.8rem"],
    ["Icons", "lucide"],
    ["Components", `${components.length} pages · ${examples.length} examples`],
    ["License", "MIT"],
  ];

  return (
    <div className="flex flex-col gap-8">
      <section className="flex flex-col gap-6 xl:flex-row xl:items-start">
        <div className="shrink-0">
          <AsciiLogo className="text-[0.55rem] leading-[1.1] text-accent-ink sm:text-[0.7rem]" />
          <div className="mt-2 text-muted-foreground">
            TUI-flavoured components for the web <span className="animate-blink text-accent-ink">█</span>
          </div>
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-xs text-muted-foreground">
            <span className="text-green-ink">user@scanline</span>:<span className="text-blue-ink">~</span>
            <span className="text-accent-ink"> $ </span>
            <span className="text-foreground">fastfetch</span>
          </div>
          <div className="font-bold">
            <span className="text-accent-ink">user</span>@<span className="text-accent-ink">scanline</span>
          </div>
          <div className="text-border-strong">{"─".repeat(14)}</div>
          <dl className="grid grid-cols-[12ch_1fr] gap-x-[1ch]">
            {info.map(([key, value]) => (
              <div key={key} className="contents">
                <dt className="font-bold text-accent-ink">{key}</dt>
                <dd className="truncate">{value}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-2 flex">
            {SWATCHES.map((s) => (
              <span key={s} title={s} className={`h-[1lh] w-[3ch] ${SWATCH_BG[s]}`} />
            ))}
          </div>
        </div>
      </section>

      <section className="flex flex-wrap items-center gap-3">
        <Button asChild>
          <a href="#/button">
            browse components <ArrowRight />
          </a>
        </Button>
        <Button variant="outline" asChild>
          <a href="#/board">see the kanban example</a>
        </Button>
        <span className="text-muted-foreground">
          or press <Kbd>ctrl</Kbd> + <Kbd>K</Kbd>
        </span>
      </section>

      <section>
        <h2 className="mb-1 text-xs uppercase tracking-wider text-muted-foreground">~ components</h2>
        <div className="mb-3 overflow-hidden whitespace-nowrap text-border-strong">{"-".repeat(200)}</div>
        <div className="grid grid-cols-1 gap-px border border-border-strong bg-border-strong sm:grid-cols-2 xl:grid-cols-3">
          {[...components, ...examples].map((page) => (
            <a key={page.slug} href={`#/${page.slug}`} className="group flex flex-col gap-0.5 bg-background px-[2ch] py-2 outline-none hover:bg-accent hover:text-accent-foreground focus-visible:bg-accent focus-visible:text-accent-foreground">
              <span className="flex items-center gap-[1ch] font-bold">
                <span className="text-accent-ink group-hover:text-accent-foreground group-focus-visible:text-accent-foreground">▸</span>
                {page.title}
                {page.group === "examples" && (
                  <Badge variant="outline" className="ml-auto group-hover:border-accent-foreground/40 group-hover:text-accent-foreground">
                    example
                  </Badge>
                )}
              </span>
              <span className="line-clamp-2 text-muted-foreground group-hover:text-accent-foreground/80 group-focus-visible:text-accent-foreground/80">{page.description}</span>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
