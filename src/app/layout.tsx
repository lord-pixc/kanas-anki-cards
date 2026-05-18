import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import { Navbar } from "@/components/ui/Navbar";

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kana Cards — Hiragana & Katakana",
  description: "Estudia hiragana y katakana con flashcards estilo Anki, animaciones de trazos y más.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={notoSansJP.className}>
        <ThemeProvider>
          <Navbar />
          <main className="min-h-[calc(100dvh-64px)] pt-16">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
