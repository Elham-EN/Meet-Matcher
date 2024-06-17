"use server";

import { prisma } from "@/libs/prisma";
import { getAuthUserId } from "./authActions";
import MemberType from "@/libs/types/MemberType";

/**
 * This function allow user to toggle the like status between one user and another.
 * This will check to see what the status is of the 'like' at the moment and create
 * a row if a user is liking another user. But if they are removing the like, then
 * simply delete that row from the database
 *
 * @param targetUserId - string
 * @param isLiked - boolean
 */
export async function toggleLikeMember(targetUserId: string, isLiked: boolean) {
  try {
    // First check if user is authenticated in order to use the like functionaility
    const userId = await getAuthUserId();
    // Check if the user has been liked already, then remove the like. If not then
    // create a new one
    if (isLiked) {
      await prisma.like.delete({
        where: {
          // Composite Primary Key of the Like Table
          sourceUserId_targetUserId: {
            sourceUserId: userId,
            targetUserId: targetUserId,
          },
        },
      });
    } else {
      await prisma.like.create({
        data: {
          sourceUserId: userId,
          targetUserId: targetUserId,
        },
      });
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

/**
 * Return to the current user a list of user Ids that the current user has liked
 * This help to update the user interface to display the fact that they liked
 * another user.
 */
export async function fetchCurrentUserLikeIds(): Promise<string[]> {
  try {
    const userId = await getAuthUserId();
    // Get a list of user IDs that this current user has liked
    const likeIds = await prisma.like.findMany({
      where: {
        sourceUserId: userId,
      },
      // Select only the userId property from the member
      select: {
        targetUserId: true,
      },
    });
    return likeIds.map((like) => like.targetUserId);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

type UserType = "source" | "target" | "mutual" | null;

/**
 * Get list of liked members by the current user. Type can be about the current
 * user is the source likes a target user
 * @param type - source user or target user
 */
export async function fetchLikedMembers(type: UserType | string = "source") {
  try {
    // Get current user of the app
    const userId = await getAuthUserId();

    switch (type) {
      case "source":
        return await fetchSourceLikes(userId);
      case "target":
        return await fetchTargetLikes(userId);
      case "mutual":
        return await fetchMutualLikes(userId);
      default:
        return [];
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// Return other members that current user liked
async function fetchSourceLikes(userId: string): Promise<MemberType[]> {
  const sourceList = await prisma.like.findMany({
    where: { sourceUserId: userId },
    select: { targetMember: true },
  });
  return sourceList.map((x) => x.targetMember) as MemberType[];
}

async function fetchTargetLikes(userId: string): Promise<MemberType[]> {
  const targetList = await prisma.like.findMany({
    where: { targetUserId: userId },
    select: { sourceMember: true },
  });
  return targetList.map((x) => x.sourceMember) as MemberType[];
}

// Give us mutual likes between two members
async function fetchMutualLikes(userId: string): Promise<MemberType[]> {
  // Get list of members (source user has liked)
  const likedUsers = await prisma.like.findMany({
    where: { sourceUserId: userId },
    select: { targetUserId: true },
  });
  const likedIds: string[] = likedUsers.map((x) => x.targetUserId);
  // Then find out if any of those users Ids are inside the target members as well
  const mutualList = await prisma.like.findMany({
    where: {
      AND: [{ targetUserId: userId }, { sourceUserId: { in: likedIds } }],
    },
    select: { sourceMember: true },
  });
  return mutualList.map((x) => x.sourceMember) as MemberType[];
}
