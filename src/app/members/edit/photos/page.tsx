import { getAuthUserId } from "@/app/actions/authActions";
import { getMemberPhotosByUserId } from "@/app/actions/memberActions";
import DeleteButton from "@/components/button/DeleteButton";
import ImageUploadButton from "@/components/button/ImageUploadButton";
import StarButton from "@/components/button/StarButton";
import { CardHeader, Divider, CardBody, Image } from "@nextui-org/react";
import React, { ReactElement } from "react";
import MemberPhotoUpload from "./MemberPhotoUpload";
import MemberImage from "../../MemberImage";

export default async function PhotoPage(): Promise<ReactElement> {
  const userId = await getAuthUserId();
  const photos = await getMemberPhotosByUserId(userId);
  return (
    <>
      <CardHeader className="text-2xl font-semibold text-pink-600 italic">
        Edit Profile
      </CardHeader>
      <Divider />
      <CardBody>
        <MemberPhotoUpload />
        <div className="grid grid-cols-5 gap-3 p-5">
          {photos &&
            photos.map((photo) => (
              <div key={photo.id} className="relative">
                <MemberImage photo={photo} />
                <div className="absolute top-3 left-3 z-50">
                  <StarButton selected={false} loading={false} />
                </div>
                <div className="absolute top-3 right-3 z-50">
                  <DeleteButton loading={false} />
                </div>
              </div>
            ))}
        </div>
      </CardBody>
    </>
  );
}
