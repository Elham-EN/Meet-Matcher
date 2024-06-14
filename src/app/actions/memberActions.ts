"use server";

import { auth } from "@/auth";
import { prisma } from "@/libs/prisma";
import { Photo } from "@prisma/client";

export async function getMembers() {
  const session = await auth();
  if (!session?.user) return null;
  try {
    const members = await prisma.member.findMany({
      where: {
        NOT: {
          userId: session.user.id,
        },
      },
    });
    return members;
  } catch (error) {
    console.error(error);
  }
}

export async function getMemberByUserId(userId: string) {
  try {
    const member = await prisma.member.findUnique({
      where: {
        userId: userId,
      },
    });
    return member;
  } catch (error) {
    console.error(error);
  }
}

// return an array of photos
export async function getMemberPhotosByUserId(userId: string) {
  try {
    const member = await prisma.member.findUnique({
      where: { userId: userId },
      select: { photos: true }, // Give us photos only
    });
    if (!member) return null;

    return member.photos.map((photo) => photo) as Photo[];
  } catch (error) {}
}
