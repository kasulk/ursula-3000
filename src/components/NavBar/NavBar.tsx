"use client";

import type { NavBarProps } from "../propTypes";
import { useState } from "react";
import { signIn, useSession } from "next-auth/react";
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
import { usePathname } from "next/navigation";

import { Logo, UserMenu, ThemeSwitch } from "@/components";

export function NavBar({ user }: NavBarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session } = useSession();
  const pathname = usePathname();

  // todo: const menuItems = getNavItemsFromAppFolder()
  const menuItems = [
    {
      title: "Dashboard",
      description: "",
      url: "/dashboard",
    },
    {
      title: "All Stocks",
      description: "",
      url: "/allstocks",
    },
    {
      title: "Features",
      description: "",
      url: "/features",
    },
    {
      title: "Help & Feedback",
      description: "",
      url: "/contact",
    },
  ];

  return (
    <Navbar
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      classNames={{
        item: [
          "flex",
          "relative",
          "h-full",
          "items-center",
          "data-[active=true]:after:content-['']",
          "data-[active=true]:after:absolute",
          "data-[active=true]:after:bottom-0",
          "data-[active=true]:after:left-0",
          "data-[active=true]:after:right-0",
          "data-[active=true]:after:h-[2px]",
          "data-[active=true]:after:rounded-[2px]",
          "data-[active=true]:after:bg-gradient-to-r from-danger to-warning",
          "data-[active=true]:after:opacity-85",
        ],
      }}
    >
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
      <NavbarContent className="hidden grow gap-4 md:flex" justify="center">
        {menuItems.map((item, index) => (
          <NavbarItem key={`${item}-${index}`} isActive={item.url === pathname}>
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
              <Button
                size="sm"
                className="md:hidden"
                color="primary"
                variant="flat"
                onClick={() => signIn()}
              >
                Login
              </Button>
              <Button
                size="md"
                className="hidden md:flex"
                color="primary"
                variant="flat"
                onClick={() => signIn()}
              >
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
        {session && <UserMenu user={user} />}
      </NavbarContent>

      {/* BurgerMenuLinks */}
      <NavbarMenu className="pt-12">
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={item.url === pathname ? "danger" : "foreground"}
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
