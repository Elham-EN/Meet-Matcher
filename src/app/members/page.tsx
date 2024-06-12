import React from "react";
import { getMembers } from "../actions/memberActions";
import MemberCard from "./MemberCard";

// Server Component
export default async function MembersPage(): Promise<React.ReactElement> {
  const members = await getMembers();

  return (
    <div
      className="mt-10 px-2 grid grid-cols-2 sm:grid-cols-3 
      lg:grid-cols-4 xl:grid-cols-6 gap-6 justify-items-center "
    >
      {members && members.map((member) => <MemberCard key={member.id} member={member} />)}
    </div>
  );
}
