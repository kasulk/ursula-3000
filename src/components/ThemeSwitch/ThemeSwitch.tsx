"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

import { Button } from "@nextui-org/button";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";

import { ChevronDown } from "@/components/Icons";

const icons = {
  chevron: <ChevronDown fill="currentColor" size={16} />,
};

const items = [
  {
    key: "light",
    label: "Light",
  },
  {
    key: "dark",
    label: "Dark",
  },
  {
    key: "modern",
    label: "Modern",
  },
];

export function ThemeSwitch() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <Button
        variant="bordered"
        className="min-w-0 rounded-full px-2.5 lg:hidden"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      >
        {theme === "light" ? "🌙" : "🌞"}
      </Button>
      <div className="hidden lg:flex">
        <Dropdown backdrop="blur">
          <DropdownTrigger>
            <Button variant="bordered" endContent={icons.chevron}>
              Theme
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            className="text-right text-default"
            variant="faded"
            aria-label="Theme switch"
            items={items}
          >
            {(items) => (
              <DropdownItem
                key={items.key}
                className={items.key === theme ? "text-danger" : ""}
                color={items.key === theme ? "danger" : "default"}
                onClick={() => setTheme(items.key)}
              >
                {items.label}
              </DropdownItem>
            )}
          </DropdownMenu>
        </Dropdown>
      </div>
    </>
  );
}
