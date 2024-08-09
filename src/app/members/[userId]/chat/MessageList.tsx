"use client";

import { MessageDto } from "@/libs/types";
import React, { ReactElement, useCallback, useEffect, useRef, useState } from "react";
import MessageBox from "./MessageBox";
import { pusherClient } from "@/libs/pusher";
import { formatShortDateTime } from "@/libs/utils/date-manipulation";
import { Channel } from "pusher-js";

interface Props {
  initialMessages: MessageDto[];
  currentUserId: string;
  chatId: string;
}

function MessageList({ initialMessages, currentUserId, chatId }: Props): ReactElement {
  const [messages, setMessages] = useState(initialMessages);
  // The channelRef stores a reference to the Pusher channel. This reference needs
  // to persist across re-renders of the component, but changes to it shouldn't
  // cause re-renders.
  const channelRef = useRef<Channel | null>(null);

  const handleNewMessage = useCallback((message: MessageDto) => {
    setMessages((prevMessagesState) => {
      return [...prevMessagesState, message];
    });
  }, []);

  // To update 'messages' state & any messages that match an id of a messageIds
  // list, then update the read property
  const handleReadMessages = useCallback((messageIds: string[]) => {
    setMessages((prevState) =>
      // Loop over the messages state (Do something with each message)
      prevState.map((message) =>
        // Check if it message Ids includes the message id
        messageIds.includes(message.id)
          ? // Update the dateRead
            { ...message, dateRead: formatShortDateTime(new Date()) }
          : // If not included, just return the message as it is in the state
            message
      )
    );
  }, []);

  // By storing the channel in a ref, the code ensures that only one subscription is
  // created, even if the component re-renders multiple times. The ref allows access
  // to the same channel instance across different renders of the component, which is
  // crucial for maintaining a consistent connection. Updating a ref doesn't cause
  // the component to re-render.
  useEffect(() => {
    // Check to see that we do not have current connection, because do need to start
    // another one if we are already subscribe. checks if channelRef.current exists.
    // If not, it creates a new subscription:
    if (!channelRef.current) {
      // This creates a new subscription to a Pusher channel, allowing the client to
      // receive real-time updates for that specific chat.
      channelRef.current = pusherClient.subscribe(chatId);
      // These bindings set up listeners for specific Pusher events on this channel
      channelRef.current.bind("message:new", handleNewMessage);
      channelRef.current.bind("messages:read", handleReadMessages);
      // unsubscribe and unbind when leaving this component, so that don't maintain
      // that subscription and that binding to pusher when we don't need to have it.
      return () => {
        // checks if channelRef.current exists and is subscribed before unsubscribing:
        if (channelRef.current && channelRef.current.subscribed) {
          channelRef.current.unsubscribe();
          channelRef.current.unbind("message:new", handleNewMessage);
          channelRef.current.unbind("messages:read", handleReadMessages);
        }
      };
    }
  }, [chatId, handleNewMessage, handleReadMessages]);

  return (
    <div>
      {messages.length === 0 ? (
        "No messages to display"
      ) : (
        <div>
          {messages.map((message, index) => (
            <MessageBox
              key={message.id + index}
              currentUserId={currentUserId}
              message={message}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default MessageList;

/**
 * maintain a stable reference to the Pusher channel subscription throughout the
 * lifecycle of the component. This approach ensures efficient management of the
 * real-time connection, proper cleanup when the component unmounts, and avoids
 * unnecessary re-renders or multiple subscriptions.
 */
