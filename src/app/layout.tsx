import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Navigation } from "../components";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ursula 3000",
  description:
    "Ursula renders and processes fundamental data of ~3000 stocks of the largest publicly held companies in the US Russell 3000 Index.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <header className="py-6">
            <Navigation />
          </header>
          <main className="flex min-h-screen flex-col items-center justify-between bg-background p-24 text-foreground">
            {children}
          </main>
          <footer></footer>
        </Providers>
      </body>
    </html>
  );
}
