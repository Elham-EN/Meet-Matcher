"use client";

import { MessageDto } from "@/libs/types";
import React, { ReactElement, useCallback, useEffect, useState } from "react";
import MessageBox from "./MessageBox";
import { pusherClient } from "@/libs/pusher";

interface Props {
  initialMessages: MessageDto[];
  currentUserId: string;
  chatId: string;
}

function MessageList({ initialMessages, currentUserId, chatId }: Props): ReactElement {
  const [messages, setMessages] = useState(initialMessages);

  const handleNewMessage = useCallback((message: MessageDto) => {
    setMessages((prevMessagesState) => {
      return [...prevMessagesState, message];
    });
  }, []);

  useEffect(() => {
    // Subscribe to Pusher Channel with that chatId to get real-time updated message
    const channel = pusherClient.subscribe(chatId);
    // Need to bind to a specific event
    channel.bind("message:new", handleNewMessage);
    // unsubscribe and unbind when leaving this component, so that don't maintain
    // that subscription and that binding to pusher when we don't need to have it.
    return () => {
      channel.unsubscribe();
      channel.unbind("message:new", handleNewMessage);
    };
  }, [chatId, handleNewMessage]);

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
