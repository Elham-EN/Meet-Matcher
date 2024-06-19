"use client";

import { calculateAge } from "@/libs/utils/date-manipulation";
import { Button, Card, CardBody, CardFooter, Divider, Image } from "@nextui-org/react";
import { Member } from "@prisma/client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { ReactElement } from "react";

type NavLinkType = { name: string; href: string };
interface Props {
  member: Member;
  navLinks: NavLinkType[];
}

export default function MemberSidebar({ member, navLinks }: Props): ReactElement {
  // e.g. /members/clxbgdzxj000311miy0jnlqeb
  const pathname = usePathname();

  return (
    <Card className="w-full mt-10 items-center h-[80vh]">
      <Image
        src={member.image || "/images/user.png"}
        alt="User profile main image"
        width={200}
        height={200}
        className="rounded-full mt-6 aspect-square object-cover"
      />
      <CardBody>
        <div className="flex flex-col items-center">
          <div className="text-2xl font-semibold">
            {member.name}, {calculateAge(member.dateOfBirth)}
          </div>
          <div className="text-lg text-neutral-500">
            {member.city}, {member.country}
          </div>
        </div>
        <Divider className="my-3" />
        <nav className="flex flex-col p-4 ml-4 text-2xl gap-4">
          {navLinks.map((link) => (
            <Link
              href={link.href}
              key={link.name}
              className={`block rounded ${
                pathname === link.href
                  ? "text-pink-600 font-semibold"
                  : "hover:text-pink-500"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </CardBody>
      <CardFooter>
        <Button
          as={Link}
          href="/members"
          fullWidth
          className="bg-pink-500 text-white"
          variant="solid"
        >
          Go back
        </Button>
      </CardFooter>
    </Card>
  );
}
