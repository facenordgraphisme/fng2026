"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface ThemeContextType {
  theme: string | undefined;
  setTheme: (theme: string) => void;
  resolvedTheme: string | undefined;
  systemTheme: string | undefined;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "system",
  setTheme: () => null,
  resolvedTheme: "light",
  systemTheme: "light",
});

export function ThemeProvider({ children, defaultTheme = "system" }: { children: ReactNode, attribute?: string, defaultTheme?: string, enableSystem?: boolean }) {
  const [theme, setThemeState] = useState<string>("system");
  const [resolvedTheme, setResolvedTheme] = useState<string>("light");
  const [systemTheme, setSystemTheme] = useState<string>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = window.localStorage.getItem("theme");
    if (stored) setThemeState(stored);
    
    // Check system preference
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const applySystem = (e: MediaQueryListEvent | MediaQueryList) => setSystemTheme(e.matches ? "dark" : "light");
    applySystem(mediaQuery);
    
    mediaQuery.addEventListener("change", applySystem);
    return () => mediaQuery.removeEventListener("change", applySystem);
  }, []);

  const setTheme = (newTheme: string) => {
    setThemeState(newTheme);
    window.localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    if (!mounted) return;
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    
    let activeTheme = theme;
    if (theme === "system") {
      activeTheme = systemTheme;
    }
    
    root.classList.add(activeTheme);
    setResolvedTheme(activeTheme);
  }, [theme, systemTheme, mounted]);

  // To prevent hydration warnings due to lack of the actual injected script,
  // we just render children seamlessly. The flash will be minimal in app environments.
  return <ThemeContext.Provider value={{ theme, setTheme, resolvedTheme, systemTheme }}>{children}</ThemeContext.Provider>;
}

// Ensure drop-in replaceability for next-themes
export const useTheme = () => useContext(ThemeContext);
