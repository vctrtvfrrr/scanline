import * as React from "react";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import { Example, Stack } from "@/docs/kit/example";

export default function ProgressDemo() {
  const [value, setValue] = React.useState(13);
  React.useEffect(() => {
    const id = setInterval(() => setValue((v) => (v >= 100 ? 0 : v + 3)), 300);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      <Example title="glyph sets">
        <Stack className="max-w-[80ch]">
          {(["block", "shade", "ascii", "arrow"] as const).map((glyphs) => (
            <div key={glyphs} className="grid grid-cols-[8ch_1fr] items-center">
              <span className="text-muted-foreground">{glyphs}</span>
              <Progress value={value} glyphs={glyphs} />
            </div>
          ))}
        </Stack>
      </Example>
      <Example title="tones · fixed width">
        <Stack className="max-w-[80ch]">
          {(["green", "yellow", "red", "blue", "magenta", "cyan"] as const).map((tone, i) => (
            <div key={tone} className="flex items-center gap-[2ch]">
              <span className="w-[8ch] text-muted-foreground">{tone}</span>
              <Progress value={[92, 64, 18, 45, 77, 33][i]} tone={tone} cells={30} className="w-auto" />
            </div>
          ))}
          <div className="flex items-center gap-[2ch]">
            <span className="w-[8ch] text-muted-foreground">pending</span>
            <Progress value={null} cells={30} className="w-auto" />
          </div>
        </Stack>
      </Example>
      <Example title="spinners">
        {(["braille", "dots", "line", "blocks", "arc"] as const).map((variant) => (
          <span key={variant} className="inline-flex items-center gap-[1ch] border border-border-strong px-[1ch]">
            <Spinner variant={variant} /> {variant}
          </span>
        ))}
        <span className="text-muted-foreground">
          <Spinner className="text-green-ink" /> installing dependencies...
        </span>
      </Example>
      <Example title="skeleton" contentClassName="items-start">
        <div className="flex w-full max-w-md items-start gap-[2ch]">
          <Skeleton className="size-12 shrink-0" />
          <div className="grid flex-1 gap-1">
            <Skeleton className="w-3/4" />
            <Skeleton className="w-1/2" />
            <Skeleton className="w-5/6" />
          </div>
        </div>
      </Example>
    </>
  );
}
