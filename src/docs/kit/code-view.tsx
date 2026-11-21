import { Check, Copy } from "lucide-react";
import * as React from "react";
import { Button } from "@/components/ui/button";

export function CodeView({ code, filename }: { code: string; filename: string }) {
  const [copied, setCopied] = React.useState(false);
  const lines = code.replace(/\n$/, "").split("\n");
  const gutter = String(lines.length).length;

  const copy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="relative mt-3 border border-border-strong bg-surface">
      <span className="border-label text-accent-ink">{filename}</span>
      <span className="border-label right-[1ch] left-auto text-muted-foreground">{lines.length} lines · tsx · utf-8</span>
      <Button variant="bracket" size="sm" className="absolute top-2 right-[1ch] z-10" onClick={copy}>
        {copied ? <Check /> : <Copy />}
        {copied ? "copied" : "copy"}
      </Button>
      <pre className="max-h-[70vh] overflow-auto py-3 text-sm leading-relaxed">
        <code className="block min-w-max">
          {lines.map((line, i) => (
            <span key={i} className="flex hover:bg-surface-2">
              <span className="sticky left-0 select-none border-r border-border bg-surface pr-[1ch] pl-[1.5ch] text-right text-muted-foreground/60" style={{ width: `${gutter + 3}ch` }}>
                {i + 1}
              </span>
              <span className="pl-[1.5ch] pr-[2ch] whitespace-pre">{line || " "}</span>
            </span>
          ))}
        </code>
      </pre>
    </div>
  );
}
