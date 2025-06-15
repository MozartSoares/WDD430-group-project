// src/lib/theme.ts
"use-client";
import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    accent: Palette["primary"];
  }

  interface PaletteOptions {
    accent?: PaletteOptions["primary"];
  }
}

export const theme = createTheme({
  palette: {
    primary: {
      main: "#4F7CAC", // Steel Blue
      light: "#7BA3D0",
      dark: "#365578",
      contrastText: "#ffffff",
    },
    accent: {
      main: "#A63D40", // Redwood
      light: "#D16B6E",
      dark: "#7B2B2E",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#6B7280", // Gray for secondary elements
      light: "#9CA3AF",
      dark: "#4B5563",
      contrastText: "#ffffff",
    },
    background: {
      default: "#FAFAFA",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#1F2937",
      secondary: "#6B7280",
    },
  },
  typography: {
    fontFamily: 'var(--font-roboto), "Helvetica", "Arial", sans-serif',
    h1: {
      fontFamily: "var(--font-roboto-slab), var(--font-roboto), serif",
      fontWeight: 700,
    },
    h2: {
      fontFamily: "var(--font-roboto-slab), var(--font-roboto), serif",
      fontWeight: 600,
    },
    h3: {
      fontFamily: "var(--font-roboto-slab), var(--font-roboto), serif",
      fontWeight: 600,
    },
    h4: {
      fontFamily: "var(--font-roboto-slab), var(--font-roboto), serif",
      fontWeight: 500,
    },
    h5: {
      fontFamily: "var(--font-roboto-slab), var(--font-roboto), serif",
      fontWeight: 500,
    },
    h6: {
      fontFamily: "var(--font-roboto-slab), var(--font-roboto), serif",
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 8,
          fontWeight: 500,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          "&:hover": {
            boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
          },
        },
      },
    },
  },
});
