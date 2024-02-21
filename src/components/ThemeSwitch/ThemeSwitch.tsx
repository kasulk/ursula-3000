"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

import { Button } from "@nextui-org/button";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Switch,
} from "@nextui-org/react";

import { ChevronDown, MoonIcon, SunIcon } from "@/components/Icons";

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
      <Switch
        defaultSelected
        size="md"
        color="primary"
        aria-label="Toggle dark mode"
        onChange={(event) => setTheme(event.target.checked ? "light" : "dark")}
        thumbIcon={({ isSelected, className }) =>
          isSelected ? (
            <SunIcon className={className} />
          ) : (
            <MoonIcon className={className} />
          )
        }
      />

      {/* <div className="hidden lg:flex">
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
      </div> */}
    </>
  );
}
