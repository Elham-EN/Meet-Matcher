"use server";

import { auth } from "@/auth";
import { prisma } from "@/libs/prisma";

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
