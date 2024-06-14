import { getMemberPhotosByUserId } from "@/app/actions/memberActions";
import { CardBody, CardHeader, Divider, Image } from "@nextui-org/react";
import React, { ReactElement } from "react";

interface PageProps {
  params: { userId: string };
}

// Server Component - fetch photos of member
async function PhotosPage({ params }: PageProps): Promise<ReactElement> {
  // Server Action to fetch collection of photos from database
  const photos = await getMemberPhotosByUserId(params.userId);
  return (
    <>
      <CardHeader className="text-2xl font-semibold text-pink-600 italic">
        Photos
      </CardHeader>
      <Divider />
      <CardBody>
        <div>
          {photos &&
            photos?.map((photo) => (
              <div key={photo.id} className="grid grid-cols-5 gap-3">
                <Image
                  src={photo.url}
                  alt={"member's collection of photos"}
                  height={300}
                  width={300}
                  isZoomed
                  className="object-cover aspect-square"
                />
              </div>
            ))}
        </div>
      </CardBody>
    </>
  );
}

export default PhotosPage;
