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
            classNames={
              {
                // base: "w-1/2",
                // wrapper: "w-1/2",
              }
            }
          >
            {items.label}
          </DropdownItem>
        )}
      </DropdownMenu>
    </Dropdown>
  );
}
