import { getMemberByUserId } from "@/app/actions/memberActions";
import { CardBody, CardHeader, Divider } from "@nextui-org/react";
import { notFound } from "next/navigation";
import React from "react";

// Dynamic Route. When we use layout page, this page going to be child of the
// layout page
async function MemberDetailsPage({ params }: { params: { userId: string } }) {
  const member = await getMemberByUserId(params.userId);
  if (!member) notFound();
  return (
    <>
      <CardHeader className="text-2xl font-semibold text-pink-600 italic">
        Profile
      </CardHeader>
      <Divider />
      <CardBody>{member.description}</CardBody>
    </>
  );
}

export default MemberDetailsPage;
