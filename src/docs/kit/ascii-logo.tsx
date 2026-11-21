const LETTERS: Record<string, string[]> = {
  S: ["███████╗", "██╔════╝", "███████╗", "╚════██║", "███████║", "╚══════╝"],
  C: [" ██████╗", "██╔════╝", "██║     ", "██║     ", "╚██████╗", " ╚═════╝"],
  A: [" █████╗ ", "██╔══██╗", "███████║", "██╔══██║", "██║  ██║", "╚═╝  ╚═╝"],
  N: ["███╗   ██╗", "████╗  ██║", "██╔██╗ ██║", "██║╚██╗██║", "██║ ╚████║", "╚═╝  ╚═══╝"],
  L: ["██╗     ", "██║     ", "██║     ", "██║     ", "███████╗", "╚══════╝"],
  I: ["██╗", "██║", "██║", "██║", "██║", "╚═╝"],
  E: ["███████╗", "██╔════╝", "█████╗  ", "██╔══╝  ", "███████╗", "╚══════╝"],
};

export function renderAscii(word: string) {
  const glyphs = [...word.toUpperCase()].map((ch) => LETTERS[ch]);
  return glyphs[0].map((_, row) => glyphs.map((g) => g[row]).join("")).join("\n");
}

export function AsciiLogo({ word = "scanline", className }: { word?: string; className?: string }) {
  return (
    <pre aria-label={word} className={className}>
      {renderAscii(word)}
    </pre>
  );
}
