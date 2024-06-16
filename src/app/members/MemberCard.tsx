"use client";
import LikeButton from "@/components/LikeButton";
import { calculateAge } from "@/libs/utils/date-manipulation";
import { truncateText } from "@/libs/utils/string-manipulation";
import { Card, CardFooter, Image } from "@nextui-org/react";
import { Member } from "@prisma/client";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";

interface MemberCardProps {
  member: Member;
  likeIds: string[];
}

function MemberCard({ member, likeIds }: MemberCardProps): React.ReactElement {
  const [maxTextLength, setMaxTextLength] = useState(10);
  const cardRef = useRef<HTMLDivElement>(null);
  const hasLiked = likeIds.includes(member.userId);

  useEffect(() => {
    const handleResize = () => {
      if (cardRef.current) {
        const width = cardRef.current.clientWidth;
        const newLength = Math.floor(width / 20); // Adjust this value as needed
        setMaxTextLength(newLength);
      }
    };

    const observer = new ResizeObserver(handleResize);
    const currentCardRef = cardRef.current;

    if (currentCardRef) {
      observer.observe(currentCardRef);
    }

    // Initial call to set the max length
    handleResize();

    return () => {
      if (currentCardRef) {
        observer.unobserve(currentCardRef);
      }
    };
  }, []);

  // stop the default action of a link and prevent the event from propagating further
  // up the DOM tree. Stops the event from bubbling up to parent elements, which
  // prevents any parent handlers from being triggered.
  const preventLinkAction = (event: React.MouseEvent) => {
    event.preventDefault();
    // The preventLinkAction function is used on a div that wraps the LikeButton.
    // When the LikeButton is clicked, the default link navigation is prevented,
    // and the click event does not propagate to the Card component.
    event.stopPropagation();
  };

  return (
    <Card
      ref={cardRef}
      className="w-full max-w-xs md:max-w-sm lg:max-w-md"
      as={Link}
      href={`/members/${member.userId}`}
    >
      <Image
        src={member.image || "images/user.png"}
        alt={member.name}
        width="100%"
        height="auto"
        isZoomed
        className="w-full h-auto aspect-square object-cover"
      />
      <div onClick={preventLinkAction}>
        <div className="absolute top-3 right-3 z-50">
          <LikeButton targetId={member.userId} hasLiked={hasLiked} />
        </div>
      </div>
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
