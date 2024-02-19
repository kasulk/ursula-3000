"use client";

import { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
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
  const { data: session } = useSession();

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
    <Navbar
      isBordered
      onMenuOpenChange={setIsMenuOpen}
      classNames={{
        brand: "grow-0 justify-start",
      }}
    >
      {/* BurgerMenu */}
      <NavbarMenuToggle
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        className="md:hidden"
      />
      {/* BurgerMenuLinks */}
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

      {/* Brand */}
      <NavbarBrand>
        <Link href="/" className="text-2xl">
          <Logo className="text-danger" />
          <span className="font-bold">Ursula 3000</span>
        </Link>
      </NavbarBrand>

      {/* NavLinks */}
      <NavbarContent className="hidden gap-4 md:flex" justify="center">
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

      {/* Login/SignUp-Buttons */}
      {!session && (
        <NavbarContent justify="end">
          <NavbarItem className="hidden lg:flex">
            <Button
              as={Link}
              color="primary"
              variant="light"
              href="/api/auth/signin"
            >
              Sign Up
            </Button>
          </NavbarItem>
          <NavbarItem>
            <Button color="primary" variant="flat" onClick={() => signIn()}>
              Login
            </Button>
          </NavbarItem>
        </NavbarContent>
      )}

      <ThemeSwitch />
      {session && <UserMenu />}
    </Navbar>
  );
}
