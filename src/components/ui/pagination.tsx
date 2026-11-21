import { ChevronLeft, ChevronRight } from "lucide-react";
import type * as React from "react";
import { cn } from "@/lib/utils";

function Pagination({ className, ...props }: React.ComponentProps<"nav">) {
  return <nav role="navigation" aria-label="pagination" data-slot="pagination" className={cn("flex w-full justify-center", className)} {...props} />;
}

function PaginationContent({ className, ...props }: React.ComponentProps<"ul">) {
  return <ul data-slot="pagination-content" className={cn("flex flex-row items-center gap-[0.5ch]", className)} {...props} />;
}

function PaginationItem(props: React.ComponentProps<"li">) {
  return <li data-slot="pagination-item" {...props} />;
}

type PaginationLinkProps = React.ComponentProps<"a"> & { isActive?: boolean; disabled?: boolean };

function PaginationLink({ className, isActive, disabled, ...props }: PaginationLinkProps) {
  return (
    <a
      aria-current={isActive ? "page" : undefined}
      aria-disabled={disabled || undefined}
      data-slot="pagination-link"
      data-active={isActive || undefined}
      className={cn(
        "inline-flex h-6 min-w-[3ch] cursor-pointer select-none items-center justify-center gap-[0.5ch] px-[0.5ch] tabular-nums text-muted-foreground outline-none hover:bg-surface-2 hover:text-foreground focus-visible:bg-accent focus-visible:text-accent-foreground aria-disabled:pointer-events-none aria-disabled:opacity-40 [&_svg]:size-3.5",
        isActive && "bg-accent font-bold text-accent-foreground before:content-['['] after:content-[']'] hover:bg-accent hover:text-accent-foreground",
        className,
      )}
      {...props}
    />
  );
}

function PaginationPrevious({ className, ...props }: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink aria-label="Go to previous page" className={cn("px-[1ch]", className)} {...props}>
      <ChevronLeft />
      <span className="hidden sm:inline">prev</span>
    </PaginationLink>
  );
}

function PaginationNext({ className, ...props }: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink aria-label="Go to next page" className={cn("px-[1ch]", className)} {...props}>
      <span className="hidden sm:inline">next</span>
      <ChevronRight />
    </PaginationLink>
  );
}

function PaginationEllipsis({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span aria-hidden data-slot="pagination-ellipsis" className={cn("inline-flex h-6 w-[3ch] items-center justify-center text-muted-foreground", className)} {...props}>
      ···
      <span className="sr-only">More pages</span>
    </span>
  );
}

export { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious };
