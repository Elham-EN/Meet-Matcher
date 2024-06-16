import React from "react";
import { getMembers } from "../actions/memberActions";
import MemberCard from "./MemberCard";
import { fetchCurrentUserLikeIds } from "../actions/likeActions";

// Server Component
export default async function MembersPage(): Promise<React.ReactElement> {
  const members = await getMembers();
  const likeIds = await fetchCurrentUserLikeIds();

  return (
    <div
      className="mt-10 px-2 grid grid-cols-2 sm:grid-cols-3 
      lg:grid-cols-4 xl:grid-cols-6 gap-6 justify-items-center "
    >
      {members &&
        members.map((member) => (
          <MemberCard key={member.id} member={member} likeIds={likeIds} />
        ))}
    </div>
  );
}
