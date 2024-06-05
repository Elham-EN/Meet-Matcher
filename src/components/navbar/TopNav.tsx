"use client";

import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Link,
} from "@nextui-org/react";
import React, { useState } from "react";
import { GiMatchHead } from "react-icons/gi";

export default function TopNav(): React.ReactElement {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const menuItems = ["Matches", "Lists", "Messages"];
  const menuLinks = ["members", "lists", "messages"];
  return (
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
      maxWidth="xl"
      className="bg-gradient-to-r from-pink-400 to-pink-700"
      classNames={{ item: ["text-xl", "text-white", "uppercase"] }}
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="md:hidden"
        />
        <NavbarBrand as={Link} href={"/"}>
          <GiMatchHead size={40} className="text-gray-200" />
          <div className="font-bold text-3xl flex">
            <span className="text-gray-900">Meet</span>
            <span className="text-gray-200">Matcher</span>
          </div>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent className="hidden md:flex gap-4" justify="center">
        <NavbarItem as={Link} href={"/members"}>
          Matches
        </NavbarItem>
        <NavbarItem as={Link} href={"/lists"}>
          Lists
        </NavbarItem>
        <NavbarItem as={Link} href={"/messages"}>
          Messages
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <Button variant="bordered" className="text-white hidden lg:flex">
          Login
        </Button>
        <Button variant="bordered" className="text-white">
          Register
        </Button>
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="hover:bg-pink-300 px-3 w-full"
              color="foreground"
              href={menuLinks[index]}
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
