import * as React from "react";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Example } from "@/docs/kit/example";

function pageWindow(page: number, total: number): (number | "…")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  if (page <= 4) return [1, 2, 3, 4, 5, "…", total];
  if (page >= total - 3) return [1, "…", total - 4, total - 3, total - 2, total - 1, total];
  return [1, "…", page - 1, page, page + 1, "…", total];
}

export default function PaginationDemo() {
  const [page, setPage] = React.useState(6);
  const total = 20;
  return (
    <>
      <Example title="interactive" contentClassName="flex-col">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} />
            </PaginationItem>
            {pageWindow(page, total).map((p, i) => (
              <PaginationItem key={i}>
                {p === "…" ? (
                  <PaginationEllipsis />
                ) : (
                  <PaginationLink isActive={p === page} onClick={() => setPage(p)}>
                    {p}
                  </PaginationLink>
                )}
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext onClick={() => setPage((p) => Math.min(total, p + 1))} disabled={page === total} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
        <span className="text-xs text-muted-foreground">
          page {page} of {total} · showing {(page - 1) * 10 + 1}-{page * 10} of {total * 10} rows
        </span>
      </Example>
      <Example title="compact" contentClassName="justify-between">
        <span className="text-muted-foreground">
          <span className="text-foreground">1-10</span> of 128
        </span>
        <Pagination className="w-auto">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious disabled />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#/pagination" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </Example>
    </>
  );
}
