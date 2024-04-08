import { ReactNode } from "react";

type Variant =
  | "orange red"
  | "orange pink"
  | "primary secondary"
  | "secondary primary";

interface GlowTextProps {
  variant: Variant;
  children: ReactNode;
}

export function GlowText({ variant, children }: GlowTextProps) {
  const variants: { [key: string]: string } = {
    "orange red": "bg-gradient-to-r from-orange-500 to-red-500",
    "orange pink": "bg-gradient-to-r from-orange-500 to-pink-500",
    "primary secondary": "bg-gradient-to-r from-primary-500 to-secondary-500",
    "secondary primary": "bg-gradient-to-r from-secondary-500 to-primary-500",
  };

  return (
    <span className="relative">
      <span className={`${variants[variant]} bg-clip-text text-transparent`}>
        {children}
      </span>
      <span
        className={`absolute left-0 blur-2xl ${variants[variant]} bg-clip-text text-transparent`}
      >
        {children}
      </span>
    </span>
  );
}
