import { CardHeader, Divider, CardBody } from "@nextui-org/react";
import React from "react";
import EditForm from "./EditForm";
import { getAuthUserId } from "@/app/actions/authActions";
import { getMemberByUserId } from "@/app/actions/memberActions";
import { notFound } from "next/navigation";

async function MemberEditPage(): Promise<React.ReactElement> {
  const userId = await getAuthUserId();
  const member = await getMemberByUserId(userId);
  if (!member) notFound();
  return (
    <>
      <CardHeader className="text-2xl font-semibold text-pink-600 italic">
        Edit Profile
      </CardHeader>
      <Divider />
      <CardBody>
        <EditForm member={member} />
      </CardBody>
    </>
  );
}

export default MemberEditPage;
