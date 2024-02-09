"use client";

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

export function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <NextUIProvider navigate={router.push}>
      <NextThemeProvider
        attribute="class"
        defaultTheme="dark"
        themes={["light", "dark", "modern"]}
      >
        {children}
      </NextThemeProvider>
    </NextUIProvider>
  );
}
