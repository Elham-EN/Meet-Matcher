"use client";

import { signOutUser } from "@/app/actions/authActions";
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from "@nextui-org/react";
import { Session } from "next-auth";
import Link from "next/link";
import React, { ReactElement } from "react";

interface UserMenuProps {
  userInfo: {
    name: string | null;
    image: string | null;
  } | null;
}

// Component client
function UserMenu({ userInfo }: UserMenuProps): ReactElement {
  return (
    <Dropdown placement="bottom-start">
      <DropdownTrigger>
        <Avatar
          isBordered={true}
          as={"button"}
          className="transition-transform"
          name={userInfo?.name || "user avatar"}
          size="md"
          src={userInfo?.image || "/images/user.png"}
        />
      </DropdownTrigger>
      <DropdownMenu className="text-black" variant="flat" aria-label="User actions menu">
        <DropdownSection showDivider>
          <DropdownItem
            isReadOnly
            as={"span"}
            className="h-14 flex flex-row"
            aria-label="username"
          >
            Signed in as {userInfo?.name}
          </DropdownItem>
        </DropdownSection>
        <DropdownItem color="danger" as={Link} href="/members/edit">
          Edit profile
        </DropdownItem>
        <DropdownItem
          color="danger"
          className="text-left"
          as={"button"}
          onClick={async () => signOutUser()}
        >
          Log Out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}

export default UserMenu;
