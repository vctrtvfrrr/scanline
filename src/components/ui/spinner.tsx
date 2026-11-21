import * as React from "react";
import { cn } from "@/lib/utils";

const FRAMES = {
  braille: ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"],
  line: ["|", "/", "-", "\\"],
  dots: ["⣾", "⣽", "⣻", "⢿", "⡿", "⣟", "⣯", "⣷"],
  blocks: ["▖", "▘", "▝", "▗"],
  arc: ["◜", "◠", "◝", "◞", "◡", "◟"],
} as const;

type SpinnerProps = React.ComponentProps<"span"> & { variant?: keyof typeof FRAMES; interval?: number };

function Spinner({ className, variant = "braille", interval = 80, ...props }: SpinnerProps) {
  const frames = FRAMES[variant];
  const [frame, setFrame] = React.useState(0);

  React.useEffect(() => {
    const id = setInterval(() => setFrame((f) => (f + 1) % frames.length), interval);
    return () => clearInterval(id);
  }, [frames.length, interval]);

  return (
    <span data-slot="spinner" role="status" aria-label="Loading" className={cn("inline-block w-[1ch] text-center text-accent-ink", className)} {...props}>
      {frames[frame]}
    </span>
  );
}

export { Spinner, type SpinnerProps };
