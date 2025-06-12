// app/ThemeProviderWrapper.tsx
"use client";

import { ThemeProvider, CssBaseline } from "@mui/material";
import { useEffect, useState } from "react";
import theme from "@/lib/theme";

interface ThemeProviderWrapperProps {
  children: React.ReactNode;
}

export function ThemeProviderWrapper({ children }: ThemeProviderWrapperProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Return a div with minimal styling to prevent layout shift
    return <div suppressHydrationWarning>{children}</div>;
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
