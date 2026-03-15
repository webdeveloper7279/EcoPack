"use client";

import { useMount } from "@/hooks/use-mount";
import { useThemeStore } from "@/store";
import { useEffect } from "react";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const mounted = useMount();
  const theme = useThemeStore((s) => s.theme);

  useEffect(() => {
    if (!mounted) return;
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
  }, [mounted, theme]);

  return <>{children}</>;
}
