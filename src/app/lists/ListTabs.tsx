"use client";
import { Tab, Tabs } from "@nextui-org/react";
import { Member } from "@prisma/client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { Key } from "react";
import MemberCard from "../members/MemberCard";

interface ListTabsProps {
  members: Member[];
  likeIds: string[];
}

type UserType = "source" | "target" | "mutual";

type TabType = { id: UserType; label: string };

function ListTabs({ members, likeIds }: ListTabsProps): React.ReactElement {
  const searchParams = useSearchParams(); // current URL's search params
  const router = useRouter();
  const pathname = usePathname(); // current URL's pathname
  const tabs: TabType[] = [
    { id: "source", label: "Members I like to team up with" },
    { id: "target", label: "Members that wants to team up with me" },
    { id: "mutual", label: "We both like to partner up" },
  ];

  // When clicking on different tabs - the function is updating the query string
  // in the URL and using that tab to identify which method condition is going to
  // call inside the fetch likes (action methods)
  const handleTabChange = (key: Key) => {
    // Modify the query string when tab clicked
    const params = new URLSearchParams(searchParams);
    // Set the query string
    params.set("type", key.toString());
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex w-full flex-col mt-10 gap-5">
      <Tabs
        aria-label="Like tabs"
        items={tabs}
        color="secondary"
        onSelectionChange={(key) => handleTabChange(key)}
      >
        {(item) => (
          <Tab key={item.id} title={item.label}>
            {members.length > 0 ? (
              <div
                className="px-2 grid grid-cols-2 sm:grid-cols-3 
              lg:grid-cols-4 xl:grid-cols-6 gap-6 justify-items-center"
              >
                {members.map((member) => (
                  <MemberCard key={member.id} member={member} likeIds={likeIds} />
                ))}
              </div>
            ) : (
              <div>No members for this filter</div>
            )}
          </Tab>
        )}
      </Tabs>
    </div>
  );
}

export default ListTabs;
