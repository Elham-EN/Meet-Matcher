"use client";
import { CldUploadButton, CloudinaryUploadWidgetResults } from "next-cloudinary";
import React, { ReactElement } from "react";
import { HiPhoto } from "react-icons/hi2";

interface Props {
  onUploadImage: (result: CloudinaryUploadWidgetResults) => void;
}

/**
 * creates a button element that uses an instance of the Cloudinary
 * Upload Widget to give you an easy way to add upload capabilities
 * to your Next.js app
 */
function ImageUploadButton({ onUploadImage }: Props): ReactElement {
  return (
    <CldUploadButton
      options={{ maxFiles: 1 }}
      onSuccess={onUploadImage}
      signatureEndpoint={"/api/sign-image"} // API Request to this endpoint
      uploadPreset="nm-nextJS-app"
      className="flex items-center gap-2 bg-pink-600 text-white 
        rounded-lg py-2 px-2 hover:bg-pink-600/70"
    >
      <HiPhoto />
      Upload new image
    </CldUploadButton>
  );
}

export default ImageUploadButton;
