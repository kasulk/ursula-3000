import Link from "next/link";
import { ThemeSwitch } from "..";

export function Navigation() {
  return (
    <nav className="container flex items-center justify-between">
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
      </ul>
      <ThemeSwitch />
    </nav>
  );
}
