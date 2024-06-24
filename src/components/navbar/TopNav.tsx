import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Link,
} from "@nextui-org/react";
import React, { useState } from "react";
import { GiMatchHead } from "react-icons/gi";
import NavLink from "./NavLink";
import { auth } from "@/auth";
import UserMenu from "./UserMenu";
import { getUserInfoForNav } from "@/app/actions/userActions";

// Server Component
export default async function TopNav(): Promise<React.JSX.Element> {
  const session = await auth();
  // First check if user session exist, if exist then get the
  // lastest user data: name and image
  const userInfo = session?.user && (await getUserInfoForNav());
  const menuItems = ["Matches", "Lists", "Messages"];
  const menuLinks = ["members", "lists", "messages"];
  return (
    <Navbar
      maxWidth="xl"
      className="bg-gradient-to-r from-pink-400 to-pink-700"
      classNames={{
        item: [
          "text-xl",
          "text-white",
          "uppercase",
          "data-[active=true]:text-yellow-200",
        ],
      }}
    >
      <NavbarContent>
        <NavbarMenuToggle
          // aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="md:hidden"
        />
        <NavbarBrand as={Link} href={"/"}>
          <GiMatchHead size={40} className="text-gray-200" />
          <div className="font-bold text-3xl flex">
            <span className="text-gray-900">Biz</span>
            <span className="text-gray-200">Buddy</span>
          </div>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent className="hidden md:flex gap-4" justify="center">
        <NavLink href="/members" label="Matches" />
        <NavLink href="/lists" label="Lists" />
        <NavLink href="/messages" label="Messages" />
      </NavbarContent>
      <NavbarContent justify="end">
        {userInfo ? (
          <UserMenu userInfo={userInfo} />
        ) : (
          <>
            <Button
              variant="bordered"
              className="text-white hidden lg:flex"
              as={Link}
              href="/login"
            >
              Login
            </Button>
            <Button variant="bordered" className="text-white" as={Link} href="/register">
              Register
            </Button>
          </>
        )}
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="hover:bg-pink-300 text-xl rounded-md px-3 w-full"
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
