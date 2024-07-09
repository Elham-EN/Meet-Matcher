"use client";
import { Photo } from "@prisma/client";
import { CldImage } from "next-cloudinary";
import { Image } from "@nextui-org/react";
import React, { ReactElement } from "react";

interface Props {
  photo: Photo | null;
}

export default function MemberImage({ photo }: Props): ReactElement {
  // if photo has publicId, it comes from cloudinary
  return (
    <div>
      {photo?.publicId ? (
        <CldImage
          src={photo.publicId}
          alt="Image of member"
          width={300}
          height={300}
          crop={"fill"}
          gravity="faces"
          className="rounded-2xl"
        />
      ) : (
        <Image
          width={220}
          height={220}
          src={photo?.url || "/images/user.png"}
          isZoomed
          alt="Image of user"
        />
      )}
    </div>
  );
}
