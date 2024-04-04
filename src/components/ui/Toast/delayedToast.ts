import { toast } from "./use-toast";

type ToastOptions = {
  title: string;
  description: string;
};

export default function delayedToast(
  delay: number,
  { title, description }: ToastOptions,
): void {
  setTimeout(() => {
    toast({ title, description });
  }, delay);
}
