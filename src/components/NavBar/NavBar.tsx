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
      url: "#",
    },
    {
      title: "All Stocks",
      description: "",
      url: "/AllStocks",
    },
    {
      title: "Features",
      description: "",
      url: "#",
    },
    {
      title: "Help & Feedback",
      description: "",
      url: "#",
    },
  ];

  return (
    <Navbar isBordered onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        {/* BurgerMenuToggle */}
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="md:hidden"
        />
        {/* Brand */}
        <NavbarBrand>
          <Link href="/" className="sm: text-xl md:text-2xl xl:text-3xl">
            <Logo className="text-danger" />
            <span className="font-bold text-inherit">Ursula 3000</span>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      {/* NavLinks */}
      <NavbarContent className="hidden gap-4 md:flex" justify="center">
        {menuItems.map((item, index) => (
          <NavbarItem
            key={`${item}-${index}`}
            // Todo: isActive
          >
            <Link color="foreground" href={item.url}>
              {item.title}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      {/* Login/SignUp-Buttons, UserMenu & ThemeSwitch */}
      <NavbarContent justify="end">
        {!session && (
          <>
            <NavbarItem>
              <Button color="primary" variant="flat" onClick={() => signIn()}>
                Login
              </Button>
            </NavbarItem>
            <NavbarItem className="hidden lg:flex">
              <Button
                as={Link}
                color="primary"
                variant="bordered"
                href="/api/auth/signin"
              >
                Sign Up
              </Button>
            </NavbarItem>
          </>
        )}
        <ThemeSwitch />
        {session && <UserMenu />}
      </NavbarContent>

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
              href={item.url}
              size="lg"
            >
              {item.title}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
