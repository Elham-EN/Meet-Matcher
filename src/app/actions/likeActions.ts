"use server";

import { prisma } from "@/libs/prisma";
import { getAuthUserId } from "./authActions";

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
export async function fetchCurrentUserLikeIds() {
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
