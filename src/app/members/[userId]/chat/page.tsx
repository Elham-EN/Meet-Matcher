import React, { ReactElement } from "react";
import CardInnerWrapper from "@/components/CardInnerWrapper";
import ChatForm from "./ChatForm";
import { getMessageThread } from "@/app/actions/messageActions";
import MessageBox from "./MessageBox";
import { MessageDto } from "@/libs/types";
import { getAuthUserId } from "@/app/actions/authActions";

interface Props {
  params: { userId: string };
}

async function ChatPage({ params }: Props): Promise<ReactElement> {
  const messages = await getMessageThread(params.userId);
  const userId = await getAuthUserId();
  const body: ReactElement = (
    <div>
      {messages.length === 0 ? (
        "No messages to display"
      ) : (
        <div>
          {messages.map((message) => (
            <MessageBox key={message.id} currentUserId={userId} message={message} />
          ))}
        </div>
      )}
    </div>
  );
  return <CardInnerWrapper header="Chat" body={body} footer={<ChatForm />} />;
}

export default ChatPage;
