import { getAuthUserId } from "@/app/actions/authActions";
import { getMemberByUserId, getMemberPhotosByUserId } from "@/app/actions/memberActions";
import { CardHeader, Divider, CardBody, Image } from "@nextui-org/react";
import React, { ReactElement } from "react";
import MemberPhotoUpload from "./MemberPhotoUpload";
import MemberPhotos from "@/components/Members/MemberPhotos";

export default async function PhotoPage(): Promise<ReactElement> {
  const userId = await getAuthUserId();
  // Access to the main image currently being used
  const member = await getMemberByUserId(userId);
  const photos = await getMemberPhotosByUserId(userId);
  return (
    <>
      <CardHeader className="flex flex-row items-center justify-between px-3">
        <h1 className="text-2xl font-semibold text-pink-600 italic">Edit Profile</h1>
        <MemberPhotoUpload />
      </CardHeader>
      <Divider />
      <CardBody>
        <MemberPhotos photos={photos!} editing={true} mainImageUrl={member?.image} />
      </CardBody>
    </>
  );
}
