import * as React from "react";
import { Combobox } from "@/components/ui/combobox";
import { Label } from "@/components/ui/label";
import { Example } from "@/docs/kit/example";

const FRAMEWORKS = [
  { value: "next", label: "Next.js", hint: "react" },
  { value: "sveltekit", label: "SvelteKit", hint: "svelte" },
  { value: "nuxt", label: "Nuxt", hint: "vue" },
  { value: "remix", label: "Remix", hint: "react" },
  { value: "astro", label: "Astro", hint: "islands" },
  { value: "solid-start", label: "SolidStart", hint: "solid" },
];

const STATUSES = [
  { value: "backlog", label: "Backlog" },
  { value: "todo", label: "To Do" },
  { value: "in-progress", label: "In Progress" },
  { value: "done", label: "Done" },
  { value: "canceled", label: "Canceled" },
];

export default function ComboboxDemo() {
  const [framework, setFramework] = React.useState("");
  const [status, setStatus] = React.useState("in-progress");
  return (
    <>
      <Example title="framework picker" contentClassName="items-start gap-6">
        <div className="grid content-start gap-1">
          <Label>framework</Label>
          <Combobox options={FRAMEWORKS} value={framework} onValueChange={setFramework} placeholder="select framework..." searchPlaceholder="search framework..." />
          <span className="text-xs text-muted-foreground">
            value: <span className="text-accent-ink">{framework ? `"${framework}"` : "null"}</span>
          </span>
        </div>
        <div className="grid content-start gap-1">
          <Label>status</Label>
          <Combobox options={STATUSES} value={status} onValueChange={setStatus} className="w-48" />
        </div>
        <div className="grid content-start gap-1">
          <Label>disabled</Label>
          <Combobox options={STATUSES} disabled className="w-48" />
        </div>
      </Example>
    </>
  );
}
