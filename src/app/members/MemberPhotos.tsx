"use client";
import DeleteButton from "@/components/button/DeleteButton";
import StarButton from "@/components/button/StarButton";
import { Photo } from "@prisma/client";
import React, { ReactElement, useState } from "react";
import MemberImage from "./MemberImage";
import { useRouter } from "next/navigation";
import { setMainImage } from "../actions/userActions";

interface Props {
  photos: Photo[] | null;
  editing?: boolean;
  mainImageUrl?: string | null;
}

type LoadingType = {
  type: "main" | "";
  isLoading: boolean;
  id: string;
};

function MemberPhotos({ photos, editing, mainImageUrl }: Props): ReactElement {
  const router = useRouter();

  const [loading, setLoading] = useState<LoadingType>({
    type: "",
    isLoading: false,
    id: "",
  });

  const onSetMain = async (photo: Photo): Promise<void> => {
    // Check if this photo is already the main image URL
    if (photo.url === mainImageUrl) return;
    setLoading({ isLoading: true, id: photo.id, type: "main" });
    await setMainImage(photo);
    router.refresh();
    setLoading({ isLoading: false, id: "", type: "" });
  };

  return (
    <div className="grid grid-cols-5 gap-3 p-5">
      {photos &&
        photos.map((photo) => (
          <div key={photo.id} className="relative">
            <MemberImage photo={photo} />
            {editing && (
              <>
                <div
                  onClick={() => onSetMain(photo)}
                  className="absolute top-3 left-3 z-50"
                >
                  <StarButton
                    selected={photo.url === mainImageUrl}
                    loading={
                      loading.isLoading &&
                      loading.type === "main" &&
                      loading.id === photo.id
                    }
                  />
                </div>
                <div className="absolute top-3 right-3 z-50">
                  <DeleteButton loading={false} />
                </div>
              </>
            )}
          </div>
        ))}
    </div>
  );
}

export default MemberPhotos;
