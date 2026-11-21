import * as React from "react";

type Theme = "light" | "dark";

type ThemeContextValue = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  crt: boolean;
  setCrt: (crt: boolean) => void;
};

const STORAGE_KEY = "scanline-theme";
const ThemeContext = React.createContext<ThemeContextValue | null>(null);

function readInitialTheme(): Theme {
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = React.useState<Theme>(readInitialTheme);
  const [crt, setCrt] = React.useState(false);

  React.useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", theme === "dark" ? "#0b0e14" : "#f8f9fa");
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {}
  }, [theme]);

  React.useEffect(() => {
    document.body.classList.toggle("crt", crt);
  }, [crt]);

  const value = React.useMemo<ThemeContextValue>(
    () => ({ theme, setTheme, toggleTheme: () => setTheme((t) => (t === "dark" ? "light" : "dark")), crt, setCrt }),
    [theme, crt],
  );

  return <ThemeContext value={value}>{children}</ThemeContext>;
}

function useTheme() {
  const context = React.use(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
}

export { ThemeProvider, useTheme, type Theme };
