"use server";

import { ActionResult } from "@/libs/types";
import { MemberEditFormType } from "@/libs/types/FormType";
import { Member } from "@prisma/client";
import { getAuthUserId } from "./authActions";
import { memberEditSchema } from "@/libs/schemas/MemberEditSchema";
import { prisma } from "@/libs/prisma";

export async function updateMemberProfile(
  data: MemberEditFormType
): Promise<ActionResult<Member>> {
  try {
    const userId = await getAuthUserId();
    // Server-side validation
    const validated = memberEditSchema.safeParse(data);
    // Return Validation Zod Errors, if form validation failed
    if (!validated.success) return { status: "error", error: validated.error.errors };
    const { name, description, city, country } = validated.data;
    // Update user data in the database
    const member = await prisma.member.update({
      where: { userId },
      data: {
        name,
        description,
        city,
        country,
      },
    });
    return { status: "success", data: member };
  } catch (error) {
    console.error(error);
    return { status: "error", error: "Something wen wrong" };
  }
}
