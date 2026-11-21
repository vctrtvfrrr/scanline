# scanline

Biblioteca de componentes React com cara de aplicação de terminal (TUI), fortemente inspirada no [shadcn/ui](https://ui.shadcn.com), no [Backlog.md](https://github.com/MrLesk/Backlog.md) e no [Astro@Distro](https://astro-distro.pages.dev/). Bordas duras, títulos embutidos nas bordas, foco com cores invertidas, sombras sem blur e glifos ASCII (`[x]`, `(•)`, `├──`, `█░`, `⠋`).

## Stack

- Bun + React 19 + Vite
- Tailwind CSS v4 com tokens em variáveis CSS
- Radix UI, cmdk, vaul e sonner como primitivas
- Ícones Lucide
- Fonte JetBrains Mono, tamanho base `0.8rem`
- Paletas Ayu Light e Ayu Dark

## Rodando

```bash
bun install
bun run dev        # http://localhost:5173
bun run build      # typecheck + build de produção
```

## Estrutura

- `src/components/ui/` — os componentes (copie e cole, no estilo shadcn)
- `src/index.css` — tokens do tema (Ayu), escala tipográfica e utilitários (`border-label`, `dither`, `crt`)
- `src/lib/` — `cn`, provider de tema e hooks
- `src/docs/` — app de documentação: demos, exemplos (tabelas, formulários, tipografia, kanban, monitor) e o shell TUI

## Atalhos na documentação

| tecla | ação |
| --- | --- |
| `ctrl K` | paleta de comandos |
| `ctrl B` | mostrar/ocultar sidebar |
| `t` | alternar tema claro/escuro |
| `[` `]` | página anterior/próxima |
| `/` | filtrar a sidebar |
| `?` | ajuda |
