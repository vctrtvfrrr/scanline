import { Kbd } from "@/components/ui/kbd";
import { Separator } from "@/components/ui/separator";
import { Example } from "@/docs/kit/example";

export default function TypographyExample() {
  return (
    <>
      <Example title="prose" contentClassName="block">
        <article className="max-w-[78ch] space-y-4 leading-relaxed">
          <h1 className="text-4xl font-extrabold tracking-tight">
            <span className="text-accent-ink"># </span>The Joke Tax Chronicles
          </h1>
          <p className="text-lg text-muted-foreground">
            Once upon a time, in a far-off land, there was a very lazy king who spent all day lounging on his throne.
          </p>
          <h2 className="border-b border-dashed border-border-strong pb-1 text-2xl font-bold">
            <span className="text-accent-ink">## </span>The King's Plan
          </h2>
          <p>
            The king thought long and hard, and finally came up with{" "}
            <a href="#/typography" className="text-accent-ink underline decoration-dashed underline-offset-4 hover:decoration-solid">
              a brilliant plan
            </a>
            : he would tax the jokes in the kingdom.
          </p>
          <blockquote className="border-l-[3px] border-accent bg-surface py-1 pl-[2ch] italic text-foreground/85">
            "After all," he said, "everyone enjoys a good joke, so it's only fair that they should pay for the privilege."
          </blockquote>
          <h3 className="text-xl font-bold">
            <span className="text-accent-ink">### </span>The Joke Tax
          </h3>
          <p>The king's subjects were not amused. They grumbled and complained, but the king was firm:</p>
          <ul className="ml-[2ch] list-['-_'] space-y-0.5 marker:text-accent-ink">
            <li>1st level of puns: 5 gold coins</li>
            <li>2nd level of jokes: 10 gold coins</li>
            <li>3rd level of one-liners: 20 gold coins</li>
          </ul>
          <ol className="ml-[3ch] list-decimal space-y-0.5 marker:text-muted-foreground">
            <li>collect the jokes</li>
            <li>count the laughs</li>
            <li>send the invoice</li>
          </ol>
          <h4 className="text-lg font-bold">
            <span className="text-accent-ink">#### </span>People stopped telling jokes
          </h4>
          <p>
            Press <Kbd>ctrl</Kbd> + <Kbd>K</Kbd> to search, or run <code className="bg-surface-2 px-[0.5ch] text-accent-ink">bun run dev</code> in your terminal. Use{" "}
            <strong className="font-bold text-foreground">bold</strong>, <em className="italic">italic</em>, <del className="text-muted-foreground">strikethrough</del> and{" "}
            <mark className="bg-accent px-[0.5ch] text-accent-foreground">highlight</mark> for emphasis. <small className="text-xs text-muted-foreground">small print.</small>
          </p>
          <div className="relative border border-border-strong bg-surface">
            <span className="border-label text-muted-foreground">bash</span>
            <pre className="overflow-x-auto px-[2ch] py-3 text-sm">
            <span className="text-muted-foreground">$ </span>bun create vite my-app --template react-ts{"\n"}
            <span className="text-muted-foreground">$ </span>cd my-app && bun install{"\n"}
            <span className="text-green-ink">✓</span> 85 packages installed [1.48s]
            </pre>
          </div>
        </article>
      </Example>
      <Example title="type scale" contentClassName="grid gap-1">
        {[
          ["text-4xl", "1.9rem"],
          ["text-3xl", "1.5rem"],
          ["text-2xl", "1.2rem"],
          ["text-xl", "1rem"],
          ["text-lg", "0.9rem"],
          ["text-base", "0.8rem"],
          ["text-sm", "0.75rem"],
          ["text-xs", "0.7rem"],
          ["text-2xs", "0.65rem"],
        ].map(([cls, size]) => (
          <div key={cls} className="flex items-baseline gap-[2ch]">
            <span className="w-[20ch] shrink-0 text-xs text-muted-foreground">
              {cls} <span className="text-border-strong">{size}</span>
            </span>
            <span className={`${cls} min-w-0 truncate`}>The quick brown fox jumps over the lazy dog</span>
          </div>
        ))}
      </Example>
      <Example title="weights · glyphs" contentClassName="grid gap-2">
        <div className="flex flex-wrap gap-x-[3ch]">
          {["font-light", "font-normal", "font-medium", "font-semibold", "font-bold", "font-extrabold"].map((w) => (
            <span key={w} className={w}>
              {w.replace("font-", "")}
            </span>
          ))}
        </div>
        <Separator variant="dashed" />
        <div className="text-lg tracking-wide">{"-> => <= >= != === !== |> <| ::  /* */ // && || ?? 0O 1lI"}</div>
        <div className="text-lg text-muted-foreground">{"─ │ ┌ ┐ └ ┘ ├ ┤ ┬ ┴ ┼ ═ ║ ╔ ╗ ╚ ╝ ░ ▒ ▓ █ ▁ ▂ ▃ ▄ ▅ ▆ ▇ ⠋ ⠙ ⠹ ● ○ ◆ ◇ ▸ ▾"}</div>
        <Separator variant="double" label="separators" />
      </Example>
    </>
  );
}
