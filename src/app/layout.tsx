// app/layout.tsx
import type { Metadata } from "next";
import { Roboto, Roboto_Slab } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "@/components";
import { ThemeProviderWrapper } from "./ThemeProviderWrapper";

// Configure Roboto font
const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-roboto",
  display: "swap",
});

// Configure Roboto Slab font
const robotoSlab = Roboto_Slab({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-roboto-slab",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Handcrafted Haven",
  description: "Discover unique handcrafted treasures from talented artisans",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${roboto.variable} ${robotoSlab.variable}`}
        suppressHydrationWarning
      >
        <SessionProvider>
          <ThemeProviderWrapper>{children}</ThemeProviderWrapper>
        </SessionProvider>
      </body>
    </html>
  );
};

export default RootLayout;
