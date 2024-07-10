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

/**
 * Retrieves a message thread between the authenticated user and a specified recipient.
 *
 * This function performs the following operations:
 * 1. Authenticates the current user and retrieves their ID.
 * 2. Queries the database for messages where either:
 *    a) The authenticated user is the sender and the specified recipient is the receiver, or
 *    b) The specified recipient is the sender and the authenticated user is the receiver.
 * 3. Orders the messages by creation date in ascending order (oldest first).
 * 4. Selects specific fields from the messages and related user data.
 *
 * @param recipientId - The ID of the other user in the conversation.
 * @returns A Promise resolving to an array of message objects, each containing:
 *          id, text, creation date, read date, and sender/recipient details.
 * @throws Will throw an error if authentication fails or if there's a database error.
 */
export async function getMessageThread(recipientId: string) {
  try {
    const userId = await getAuthUserId();
    return prisma.message.findMany({
      where: {
        OR: [
          {
            senderId: userId,
            recipientId: recipientId,
          },
          {
            senderId: recipientId,
            recipientId: userId,
          },
        ],
      },
      // Order: Display new message at the bottom of chat window
      orderBy: {
        created: "asc", // oldest first followed by newest messages
      },
      select: {
        id: true,
        text: true,
        created: true,
        dateRead: true,
        sender: {
          select: {
            userId: true,
            name: true,
            image: true,
          },
        },
        recipient: {
          select: {
            userId: true,
            name: true,
            image: true,
          },
        },
      },
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
}
