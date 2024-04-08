"use client";

import { useRouter } from "next/navigation";
import { ReactNode } from "react";

interface BackButtonProps {
  children: ReactNode;
  className?: string;
}
export function BackButton({ children, className }: BackButtonProps) {
  const router = useRouter();

  return (
    <button className={className} onClick={() => router.back()}>
      {children}
    </button>
  );
}
