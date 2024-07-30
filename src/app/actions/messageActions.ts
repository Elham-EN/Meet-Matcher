"use server";

import { ActionResult, MessageDto } from "@/libs/types";
import { getAuthUserId } from "./authActions";
import { messageSchema } from "@/libs/schemas/MessageSchema";
import { prisma } from "@/libs/prisma";
import { MessageType } from "@/libs/types/MessageType";
import { mapMessageToMessageDto } from "@/libs/mappings";
import { pusherServer } from "@/libs/pusher";
import { createChatId } from "@/libs/utils/string-manipulation";

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
): Promise<ActionResult<MessageDto>> {
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
      select: messageSelect,
    });
    const messageDto = mapMessageToMessageDto(message);
    // Trigger takes an arg for channel, Push the message to that channel that's the
    // combination of the two users, arg for event, arg for sending the data
    await pusherServer.trigger(
      createChatId(userId, recipientUserId),
      "message:new",
      messageDto
    );
    return { status: "success", data: messageDto };
  } catch (error) {
    console.error(error);
    return { status: "error", error: "Something went wrong with the server" };
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
    const messages = await prisma.message.findMany({
      where: {
        OR: [
          {
            senderId: userId,
            recipientId: recipientId,
            senderDeleted: false,
          },
          {
            senderId: recipientId,
            recipientId: userId,
            recipientDeleted: false,
          },
        ],
      },
      // Order: Display new message at the bottom of chat window
      orderBy: {
        created: "asc", // oldest first followed by newest messages
      },
      select: messageSelect,
    });
    // Message read functionaility
    if (messages.length > 0) {
      // Update 'read' property of any messages where the recipient id equals
      // the user id
      await prisma.message.updateMany({
        where: {
          senderId: recipientId,
          recipientId: userId,
          dateRead: null,
        },
        data: {
          dateRead: new Date(),
        },
      });
    }
    // Map one object to another object
    return messages.map((message) => mapMessageToMessageDto(message));
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getMessageByContainer(container: string) {
  try {
    const userId = await getAuthUserId();
    // If user delete the message as the user sent or recevied the message
    // then it's not going to be deleted & how to prevent user from seeing
    // a message that have been deleted but is still on the database?
    const conditions = {
      // If user use outbox, then need to get the messages where the user id
      // equals the sender id and if using the inbox then need to get messages
      // where the user id is equal to the recipient id
      [container === "outbox" ? "senderId" : "recipientId"]: userId,
      // If user is in the outbox, then then the 'senderDeleted' is false
      // or if user is in the inbox then 'recipientDeleted is false
      ...(container === "outbox"
        ? { senderDeleted: false }
        : { recipientDeleted: false }),
    };
    const message = await prisma.message.findMany({
      where: conditions,
      orderBy: {
        created: "desc",
      },
      select: messageSelect,
    });
    return message.map((message) => mapMessageToMessageDto(message));
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function deleteMessage(messageId: string, isOutbox: boolean) {
  const selector = isOutbox ? "senderDeleted" : "recipientDeleted";
  try {
    // Get current authenticated user id
    const userId = await getAuthUserId();
    // update 'senderDeleted' if it's the outbox or the 'recipientDeleted' if
    // it's the inbox to true.
    await prisma.message.update({
      where: {
        id: messageId,
      },
      data: {
        [selector]: true,
      },
    });
    // Check to see if both the sender of the message and the recipient of the
    // message have both deleted the message.
    const messageToDelete = await prisma.message.findMany({
      where: {
        OR: [
          { senderId: userId, senderDeleted: true, recipientDeleted: true },
          { recipientId: userId, senderDeleted: true, recipientDeleted: true },
        ],
      },
    });
    // If they have, than remove the message from the database
    if (messageToDelete.length > 0) {
      await prisma.message.deleteMany({
        where: { OR: messageToDelete.map((m) => ({ id: m.id })) },
      });
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

const messageSelect = {
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
};
