"use client";

import { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react";

import { Logo, ThemeSwitch } from "@/components";
import UserMenu from "../UserMenu/UserMenu";

export function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // todo: const menuItems = getNavItemsFromAppFolder()
  const menuItems = [
    {
      title: "Dashboard",
      description: "",
      url: "",
    },
    {
      title: "All Stocks",
      description: "",
      url: "",
    },
    {
      title: "Features",
      description: "",
      url: "",
    },
    {
      title: "Help & Feedback",
      description: "",
      url: "",
    },
  ];

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Link href="/">
            <Logo />
            <span className="font-bold text-inherit">Ursula 3000</span>
          </Link>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent className="hidden gap-4 sm:flex" justify="center">
        {menuItems.map((item, index) => (
          <NavbarItem
            key={`${item}-${index}`}
            // Todo: isActive
          >
            <Link color="foreground" href="#">
              {item.title}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="/api/auth/signin" className="text-sm">
            Sign Up
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Button
            as={Link}
            color="primary"
            href="/api/auth/signin"
            variant="flat"
          >
            Login
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={
                index === 2
                  ? "primary"
                  : index === menuItems.length - 1
                    ? "danger"
                    : "foreground"
              }
              className="w-full"
              href="#"
              size="lg"
            >
              {item.title}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>

      <ThemeSwitch />
      <UserMenu />
    </Navbar>
  );
}
