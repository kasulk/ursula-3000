import { ReactNode } from "react";
import { toast } from "./use-toast";
import type { ToastProps } from "./toast";

interface DelayedToast extends ToastProps {
  description?: ReactNode;
}

export default function delayedToast(
  delay: number,
  { title, description, className, variant }: DelayedToast,
): void {
  setTimeout(() => {
    toast({ title, description, className, variant });
  }, delay);
}
