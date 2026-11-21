import * as React from "react";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Example } from "@/docs/kit/example";

const REPOS = ["@radix-ui/primitives", "@radix-ui/colors", "@stitches/react"];

export default function CollapsibleDemo() {
  const [open, setOpen] = React.useState(false);
  return (
    <Example title="starred repositories" contentClassName="block">
      <Collapsible open={open} onOpenChange={setOpen} className="flex w-full max-w-[50ch] flex-col gap-1">
        <div className="flex items-center justify-between gap-4">
          <span className="font-bold">
            <span className="text-accent-ink">@peduarte</span> starred 3 repositories
          </span>
          <CollapsibleTrigger asChild>
            <Button variant="bracket" size="sm">
              {open ? "collapse" : "expand"}
            </Button>
          </CollapsibleTrigger>
        </div>
        <div className="border border-border-strong px-[1ch] py-0.5">{REPOS[0]}</div>
        <CollapsibleContent className="flex flex-col gap-1">
          {REPOS.slice(1).map((repo) => (
            <div key={repo} className="border border-border-strong px-[1ch] py-0.5">
              {repo}
            </div>
          ))}
        </CollapsibleContent>
      </Collapsible>
    </Example>
  );
}
