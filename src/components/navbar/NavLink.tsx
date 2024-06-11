"use client";
import { NavbarItem } from "@nextui-org/react";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import React, { ReactElement } from "react";

interface Props {
  href: string;
  label: string;
}

export default function NavLink({ href, label }: Props): ReactElement {
  const pathname = usePathname();
  return (
    <NavbarItem isActive={pathname === href} as={NextLink} href={href}>
      {label}
    </NavbarItem>
  );
}
