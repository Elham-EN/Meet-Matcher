"use client";
import { toggleLikeMember } from "@/app/actions/likeActions";
import { useRouter } from "next/navigation";
import React, { ReactElement } from "react";
import { MdOutlineWavingHand, MdWavingHand } from "react-icons/md";

interface LikeButtonProps {
  targetId: string;
  hasLiked: boolean;
}

function LikeButton({ targetId, hasLiked }: LikeButtonProps): ReactElement {
  const router = useRouter();

  const toggleLike = async () => {
    await toggleLikeMember(targetId, hasLiked);
    // Ensure UI update when the prop changes and it reflects it in the UI
    router.refresh();
  };

  return (
    <div
      onClick={toggleLike}
      className="relative hover:opacity-80 transition cursor-pointer"
    >
      <MdOutlineWavingHand
        size={28}
        className="fill-white absolute -top-[2px] -right-[2px]"
      />
      <MdWavingHand
        size={24}
        className={hasLiked ? "fill-rose-500" : "fill-neutral-500/70"}
      />
    </div>
  );
}

export default LikeButton;
