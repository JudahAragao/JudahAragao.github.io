import type { Metadata } from "next";
import { Inconsolata } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/theme-provider";

const inconsolata = Inconsolata({
  subsets: ["latin"],
  variable: '--font-inconsolata'
});

export const metadata: Metadata = {
  title: "Judah Aragão | Portfólio",
  description: "Judah Aragão | Full-Stack Developer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" suppressHydrationWarning={true}>
      <body className={`font-mono`} suppressHydrationWarning={true} >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
