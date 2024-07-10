"use server";

import { ActionResult } from "@/libs/types";
import { getAuthUserId } from "./authActions";
import { messageSchema } from "@/libs/schemas/MessageSchema";
import { prisma } from "@/libs/prisma";
import { MessageType } from "@/libs/types/MessageType";

/**
 * Creates a new message in the database.
 *
 * This server-side function performs the following steps:
 * 1. Authenticates the user and retrieves their ID.
 * 2. Validates the input data against the message schema.
 * 3. Creates a new message in the database with the validated text, recipient, and sender.
 *
 * @param recipientUserId - The ID of the user who will receive the message.
 * @param data - An object of type MessageType containing the message details
 * @returns A Promise resolving to an ActionResult containing the created message or an error.
 * @throws Will return an error result if authentication fails, validation fails, or if there's a database error.
 */
export async function createMessage(
  recipientUserId: string,
  data: MessageType
): Promise<ActionResult<MessageType>> {
  try {
    const userId = await getAuthUserId();
    const validated = messageSchema.safeParse(data);
    if (!validated.success) return { status: "error", error: validated.error.errors };
    const { text } = validated.data;
    const message = await prisma.message.create({
      data: {
        text,
        recipientId: recipientUserId,
        senderId: userId,
      },
    });
    return { status: "success", data: message };
  } catch (error) {
    console.error(error);
    return { status: "error", error: "Something went wrong" };
  }
}
