import type * as React from "react";
import { cn } from "@/lib/utils";

type ExampleProps = React.ComponentProps<"section"> & {
  title: string;
  description?: React.ReactNode;
  contentClassName?: string;
};

export function Example({ title, description, className, contentClassName, children, ...props }: ExampleProps) {
  const isGridLayout = /(^|\s)grid(\s|$)/.test(contentClassName ?? "");
  return (
    <section className={cn("relative mt-3 border border-border-strong bg-background", className)} {...props}>
      <h3 className="border-label font-medium text-accent-ink">{title}</h3>
      {description && <p className="border-b border-dashed border-border px-[2ch] pt-3 pb-2 text-muted-foreground">{description}</p>}
      <div className={cn(isGridLayout ? "items-start" : "flex flex-wrap items-center", "gap-3 px-[2ch] py-5", !description && "pt-6", contentClassName)}>{children}</div>
    </section>
  );
}

export function Stack({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("flex w-full flex-col gap-3", className)} {...props} />;
}
