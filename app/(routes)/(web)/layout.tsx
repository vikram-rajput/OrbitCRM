import React from "react";
import { cn } from "@/lib/common/utils";
import "./website.css";

import { Navbar } from "@/components/layout/landing/navbar";
import { ThemeProvider } from "@/components/layout/landing/theme-provider";



export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body
        className={cn(
          "from-muted to-primary/5 min-h-screen bg-gradient-to-tl"
        )}
        suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange>
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
