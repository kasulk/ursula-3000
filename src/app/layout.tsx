import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import { getServerSession } from "next-auth";
import { NavBar } from "@/components";
import { getDBUserByEmailWithoutPassword } from "@/lib/data";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ursula 3000",
  description:
    "Ursula renders and processes fundamental data of ~3000 stocks of the largest publicly held companies in the US Russell 3000 Index.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();
  let user = null;

  if (session?.user?.email) {
    user = await getDBUserByEmailWithoutPassword(session.user.email);
  }

  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers session={session}>
          <header className="py-6">
            <NavBar user={user} />
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
