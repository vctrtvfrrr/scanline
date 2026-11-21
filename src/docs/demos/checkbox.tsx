import * as React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Example } from "@/docs/kit/example";

const TASKS = ["write docs", "fix flaky test", "release v0.2.0"];

export default function CheckboxDemo() {
  const [done, setDone] = React.useState<string[]>(["write docs"]);
  const all = done.length === TASKS.length ? true : done.length === 0 ? false : "indeterminate";

  return (
    <>
      <Example title="checkbox" contentClassName="items-start gap-10">
        <div className="grid content-start gap-1">
          <Label>
            <Checkbox defaultChecked /> accept terms and conditions
          </Label>
          <Label>
            <Checkbox /> subscribe to newsletter
          </Label>
          <Label>
            <Checkbox disabled /> disabled
          </Label>
          <Label>
            <Checkbox disabled defaultChecked /> disabled checked
          </Label>
          <Label>
            <Checkbox aria-invalid /> invalid
          </Label>
        </div>
        <div className="grid content-start gap-1">
          <Label className="font-bold">
            <Checkbox checked={all} onCheckedChange={(v) => setDone(v === true ? TASKS : [])} />
            todo ({done.length}/{TASKS.length})
          </Label>
          {TASKS.map((task, i) => (
            <Label key={task} className="pl-[2ch] text-foreground/90">
              <span className="text-border-strong">{i === TASKS.length - 1 ? "└─" : "├─"}</span>
              <Checkbox checked={done.includes(task)} onCheckedChange={(v) => setDone((d) => (v ? [...d, task] : d.filter((t) => t !== task)))} />
              <span className={done.includes(task) ? "text-muted-foreground line-through" : ""}>{task}</span>
            </Label>
          ))}
        </div>
      </Example>
      <Example title="radio group" contentClassName="items-start gap-10">
        <RadioGroup defaultValue="comfortable" aria-label="density">
          {["default", "comfortable", "compact"].map((v) => (
            <Label key={v}>
              <RadioGroupItem value={v} /> {v}
            </Label>
          ))}
        </RadioGroup>
        <RadioGroup defaultValue="pro" className="grid-cols-1 gap-2 sm:grid-cols-3" aria-label="plan">
          {[
            { v: "free", price: "$0", d: "1 project" },
            { v: "pro", price: "$12", d: "unlimited projects" },
            { v: "team", price: "$49", d: "SSO & audit log" },
          ].map((p) => (
            <Label key={p.v} className="items-start border border-border-strong p-2 has-[[data-state=checked]]:border-accent has-[[data-state=checked]]:bg-accent/5">
              <RadioGroupItem value={p.v} />
              <span className="grid">
                <span className="font-bold">
                  {p.v} <span className="text-accent-ink">{p.price}</span>
                </span>
                <span className="text-xs text-muted-foreground">{p.d}</span>
              </span>
            </Label>
          ))}
        </RadioGroup>
      </Example>
    </>
  );
}
