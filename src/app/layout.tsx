// import { ThemeProvider } from "@/components/theme-provider";
// import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import type { Metadata, Viewport } from "next";
import { Inter as FontSans } from "next/font/google";

import "./globals.css";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  applicationName: "oss",
  authors: [{ name: '"Milo Hou"' }],
  description: "oss",
  icons: ["/icons/logo-48x48.png"],
  keywords: [],
  manifest: "/manifest.json",
  title: "oss",
};

export const viewport: Viewport = {
  initialScale: 1,
  minimumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  width: "device-width",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        {/* <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
        >
          <AntdRegistry>{children}</AntdRegistry>
          <Toaster />
        </ThemeProvider> */}
          <AntdRegistry>{children}</AntdRegistry>
      </body>
    </html>
  );
}
