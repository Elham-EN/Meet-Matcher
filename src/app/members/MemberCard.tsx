"use client";
import { calculateAge } from "@/libs/utils/date-manipulation";
import { truncateText } from "@/libs/utils/string-manipulation";
import { Card, CardFooter, Image } from "@nextui-org/react";
import { Member } from "@prisma/client";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";

interface MemberCardProps {
  member: Member;
}

function MemberCard({ member }: MemberCardProps): React.ReactElement {
  const [maxTextLength, setMaxTextLength] = useState(10);
  const imageRef = useRef<HTMLImageElement>(null);
  // Used to monitor changes in the width of the image. When the width changes,
  // the handleResize function is called to adjust the maximum text length.
  useEffect(() => {
    const handleResize = () => {
      if (imageRef.current) {
        const width = imageRef.current.clientWidth;
        const newLength = Math.floor(width / 20); // Adjust this value as needed
        setMaxTextLength(newLength);
      }
    };

    const observer = new ResizeObserver(handleResize);
    const currentImageRef = imageRef.current;

    if (currentImageRef) {
      observer.observe(currentImageRef);
    }

    // Initial call to set the max length
    handleResize();

    return () => {
      if (currentImageRef) {
        observer.unobserve(currentImageRef);
      }
    };
  }, []);

  return (
    <Card fullWidth as={Link} href={`/members/${member.userId}`}>
      <Image
        src={member.image || "images/user.png"}
        alt={member.name}
        isZoomed
        width={300}
        className="aspect-square object-cover"
        ref={imageRef}
      />
      <CardFooter
        className="flex justify-start bg-black overflow-hidden absolute 
                   bottom-0 z-10 bg-dark-gradient"
      >
        <div className="flex flex-col text-white">
          <span className="text-lg font-semibold">
            {member.name}, {calculateAge(member.dateOfBirth)}
          </span>
          <div className="flex space-x-1">
            <span className="text-sm">{member.city}</span>,{" "}
            <span className="text-sm">{truncateText(member.country, maxTextLength)}</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}

export default MemberCard;
