import React, { ReactElement } from "react";
import CardInnerWrapper from "@/components/CardInnerWrapper";
import ChatForm from "./ChatForm";
import { getMessageThread } from "@/app/actions/messageActions";
import { getAuthUserId } from "@/app/actions/authActions";
import MessageList from "./MessageList";
import { createChatId } from "@/libs/utils/string-manipulation";

interface Props {
  params: { userId: string };
}

async function ChatPage({ params }: Props): Promise<ReactElement> {
  const messages = await getMessageThread(params.userId);
  const userId = await getAuthUserId();
  const chatId = createChatId(userId, params.userId);

  return (
    <CardInnerWrapper
      header="Chat"
      body={
        <MessageList initialMessages={messages} currentUserId={userId} chatId={chatId} />
      }
      footer={<ChatForm />}
    />
  );
}

export default ChatPage;
