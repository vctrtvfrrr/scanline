import type * as React from "react";

type PageHeaderProps = { path: string; title: string; description: React.ReactNode; children?: React.ReactNode };

export function PageHeader({ path, title, description, children }: PageHeaderProps) {
  const segments = path.split("/");
  return (
    <header className="flex flex-col gap-1 pb-4">
      <div className="text-xs text-muted-foreground">
        <span className="text-green-ink">user@scanline</span>
        <span>:</span>
        <span className="text-blue-ink">{["~", ...segments.slice(0, -1)].join("/")}</span>
        <span>/{segments.at(-1)}</span>
        <span className="text-accent-ink"> $ </span>
        <span className="text-foreground">cat README.md</span>
      </div>
      <h1 className="text-3xl font-bold tracking-tight text-foreground">
        <span className="mr-[1ch] text-accent-ink">#</span>
        {title}
      </h1>
      <div aria-hidden className="overflow-hidden whitespace-nowrap text-border-strong">
        {"─".repeat(200)}
      </div>
      <p className="max-w-[80ch] text-foreground/85">{description}</p>
      {children}
    </header>
  );
}
