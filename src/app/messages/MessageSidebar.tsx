"use client";

import React, { ReactElement, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { GoInbox } from "react-icons/go";
import { MdOutlineOutbox } from "react-icons/md";
import { IconType } from "react-icons";
import clsx from "clsx";
import { Chip } from "@nextui-org/react";

type ItemType = {
  key: string;
  label: string;
  icon: IconType;
  chip: boolean;
};

export default function MessageSidebar(): ReactElement {
  // query string is either inbox or outbox
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  // What item has been selected
  const [selected, setSelected] = useState<string>(
    searchParams.get("container") || "inbox"
  );

  const items: ItemType[] = [
    {
      key: "inbox",
      label: "Inbox",
      icon: GoInbox,
      chip: true,
    },
    {
      key: "outbox",
      label: "Outbox",
      icon: MdOutlineOutbox,
      chip: false,
    },
  ];

  const handleSelect = (key: string): void => {
    setSelected(key);
    // Modify query parameter in the browser
    const params = new URLSearchParams();
    params.set("container", key);
    router.replace(`${pathname}?${params}`);
  };

  return (
    <div className="flex flex-col shadow-md rounded-lg cursor-pointer">
      {items.map(({ key, label, icon: Icon, chip }) => (
        <div
          key={key}
          className={clsx("flex flex-row items-center rounded-t-lg gap-2 p-3", {
            "text-secondary font-semibold": selected === key,
            "text-black hover:text-secondary/70": selected !== key,
          })}
          onClick={() => handleSelect(key)}
        >
          <Icon size={24} />
          <div className="flex justify-between flex-grow">
            <span>{label}</span>
            {chip && <Chip>5</Chip>}
          </div>
        </div>
      ))}
    </div>
  );
}
