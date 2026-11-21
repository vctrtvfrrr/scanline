import type * as React from "react";
import { cn } from "@/lib/utils";

type CardProps = React.ComponentProps<"div"> & {
  label?: React.ReactNode;
  labelEnd?: React.ReactNode;
  footerLabel?: React.ReactNode;
};

function Card({ className, label, labelEnd, footerLabel, children, ...props }: CardProps) {
  return (
    <div
      data-slot="card"
      className={cn("group/card relative flex min-w-0 flex-col gap-3 border border-border-strong bg-surface py-3 text-foreground", className)}
      {...props}
    >
      {label && <BorderLabel className="text-accent-ink">{label}</BorderLabel>}
      {labelEnd && <BorderLabel className="right-[1ch] left-auto text-muted-foreground">{labelEnd}</BorderLabel>}
      {footerLabel && (
        <BorderLabel position="bottom" className="text-muted-foreground">
          {footerLabel}
        </BorderLabel>
      )}
      {children}
    </div>
  );
}

function BorderLabel({ className, position = "top", ...props }: React.ComponentProps<"span"> & { position?: "top" | "bottom" }) {
  return (
    <span
      data-slot="border-label"
      className={cn(position === "top" ? "border-label" : "border-label-bottom", "flex items-center gap-[1ch] font-medium [&_svg]:size-3.5", className)}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn("grid auto-rows-min grid-rows-[auto_auto] items-start gap-0.5 px-[2ch] has-data-[slot=card-action]:grid-cols-[1fr_auto]", className)}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="card-title" className={cn("font-bold text-foreground", className)} {...props} />;
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="card-description" className={cn("text-muted-foreground", className)} {...props} />;
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="card-action" className={cn("col-start-2 row-span-2 row-start-1 self-start justify-self-end", className)} {...props} />;
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="card-content" className={cn("px-[2ch]", className)} {...props} />;
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center gap-2 border-t border-dashed border-border-strong px-[2ch] pt-3", className)}
      {...props}
    />
  );
}

export { Card, BorderLabel, CardHeader, CardTitle, CardDescription, CardAction, CardContent, CardFooter };
