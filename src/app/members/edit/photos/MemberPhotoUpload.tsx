"use client";
import { addImage } from "@/app/actions/userActions";
import ImageUploadButton from "@/components/button/ImageUploadButton";
import { CloudinaryUploadWidgetResults } from "next-cloudinary";
import { useRouter } from "next/navigation";
import React, { ReactElement } from "react";
import { toast } from "react-toastify";

export default function MemberPhotoUpload(): ReactElement {
  const router = useRouter();
  const onAddImage = async (result: CloudinaryUploadWidgetResults) => {
    if (result.info && typeof result.info === "object") {
      await addImage(result.info.secure_url, result.info.public_id);
      router.refresh();
    } else {
      toast.error("Problem adding image");
    }
  };
  return (
    <div className="">
      <ImageUploadButton onUploadImage={onAddImage} />
    </div>
  );
}
