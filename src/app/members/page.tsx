import React from "react";
import { getMembers } from "../actions/memberActions";

// Server Component
export default async function MembersPage(): Promise<React.ReactElement> {
  const members = await getMembers();

  return (
    <div>
      <ul>
        {members && members.map((member) => <li key={member.id}>{member.name}</li>)}
      </ul>
    </div>
  );
}
