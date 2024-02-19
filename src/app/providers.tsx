"use client";

import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { NextUIProvider } from "@nextui-org/react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
// import { ThemeProvider as NextThemeProvider } from "next-themes";
//:: WORKAROUND:
//:: Fixes warnings in browser console:
//:: 1. "Prop `data-key` did not match.""
//:: 2. "Extra attributes from the server: class,style"
//:: https://github.com/nextui-org/nextui/issues/1729#issuecomment-1889921451
//:: vvvvv
const NextThemeProvider = dynamic(
  () => import("next-themes").then((mod) => mod.ThemeProvider),
  { ssr: false },
);
//:: ^^^^^

interface ProvidersProps {
  children: React.ReactNode;
  session: Session | null;
}

export function Providers({ session, children }: ProvidersProps) {
  const router = useRouter();

  return (
    <SessionProvider session={session}>
      <NextUIProvider navigate={router.push}>
        <NextThemeProvider
          attribute="class"
          defaultTheme="dark"
          themes={["light", "dark", "modern"]}
        >
          {children}
        </NextThemeProvider>
      </NextUIProvider>
    </SessionProvider>
  );
}
