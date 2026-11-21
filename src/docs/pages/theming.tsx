import { CodeView } from "@/docs/kit/code-view";
import { Example } from "@/docs/kit/example";

const TOKENS = [
  ["background", "bg-background"],
  ["foreground", "bg-foreground"],
  ["surface", "bg-surface"],
  ["surface-2", "bg-surface-2"],
  ["muted-foreground", "bg-muted-foreground"],
  ["border", "bg-border"],
  ["border-strong", "bg-border-strong"],
  ["accent", "bg-accent"],
  ["accent-foreground", "bg-accent-foreground"],
] as const;

const ANSI = [
  ["black", "bg-black"],
  ["red", "bg-red"],
  ["green", "bg-green"],
  ["yellow", "bg-yellow"],
  ["blue", "bg-blue"],
  ["magenta", "bg-magenta"],
  ["cyan", "bg-cyan"],
  ["white", "bg-white"],
] as const;

function Palette({ dark }: { dark: boolean }) {
  return (
    <div className={dark ? "dark" : ""}>
      <div className="relative border border-border-strong bg-background p-[2ch] pt-4 text-foreground">
        <span className="border-label text-accent-ink">ayu-{dark ? "dark" : "light"}</span>
        <div className="grid gap-px">
          {TOKENS.map(([name, cls]) => (
            <div key={name} className="flex items-center gap-[1ch]">
              <span className={`h-[1lh] w-[4ch] shrink-0 border border-border-strong ${cls}`} />
              <span>--{name}</span>
            </div>
          ))}
        </div>
        <div className="mt-3 flex flex-wrap">
          {ANSI.map(([name, cls]) => (
            <span key={name} className="flex flex-col items-center text-2xs text-muted-foreground">
              <span className={`h-[2lh] w-[6ch] ${cls}`} />
              {name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

const SNIPPET = `/* index.css */
@custom-variant dark (&:where(.dark, .dark *));

:root {
  --background: #f8f9fa;
  --foreground: #5c6166;
  --accent: #ffaa33;
  --red: #ea6c6d;   /* ...the full Ayu Light terminal palette */
}

.dark {
  --background: #0b0e14;
  --foreground: #bfbdb6;
  --accent: #e6b450;
  --red: #ea6c73;   /* ...the full Ayu Dark terminal palette */
}

@theme inline {
  --color-background: var(--background);
  --color-accent: var(--accent);
  --shadow-tui: 4px 4px 0 0 var(--shadow-color);
}

/* toggle at runtime */
document.documentElement.classList.toggle("dark");`;

export default function Theming() {
  return (
    <>
      <Example title="palettes" description="Both palettes are rendered side by side regardless of the active theme." contentClassName="grid grid-cols-1 items-start gap-6 md:grid-cols-2">
        <Palette dark={false} />
        <Palette dark />
      </Example>
      <Example title="design rules" contentClassName="block">
        <ul className="grid list-['▸_'] gap-1 pl-[2ch] marker:text-accent-ink">
          <li>no border radius — every box is a character cell grid.</li>
          <li>spacing uses ch / lh units so components align to a terminal grid.</li>
          <li>focus and selection invert colors (accent background, dark text).</li>
          <li>floating layers get a hard, unblurred drop shadow (Turbo Vision style).</li>
          <li>labels sit inside borders: use the border-label utility on any positioned, bordered box.</li>
          <li>light theme derives darker *-ink text variants so colored text stays legible.</li>
        </ul>
      </Example>
      <CodeView code={SNIPPET} filename="theming.css" />
    </>
  );
}
