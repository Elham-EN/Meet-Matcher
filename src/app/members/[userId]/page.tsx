import { getMemberByUserId } from "@/app/actions/memberActions";
import { notFound } from "next/navigation";
import React from "react";

// Dynamic Route. When we use layout page, this page going to be child of the
// layout page
async function MemberDetailsPage({ params }: { params: { userId: string } }) {
  const member = await getMemberByUserId(params.userId);
  if (!member) notFound();
  return (
    <div>
      <h1>Member ID: {params.userId}</h1>
      <h1>Member Name: {member?.name}</h1>
    </div>
  );
}

export default MemberDetailsPage;
