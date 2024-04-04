import { toast } from "./use-toast";

type ToastOptions = {
  title?: string;
  description?: string;
  className?: string;
};

export default function delayedToast(
  delay: number,
  { title, description, className }: ToastOptions,
): void {
  setTimeout(() => {
    toast({ title, description, className });
  }, delay);
}
