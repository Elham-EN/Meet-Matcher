import React, { ReactElement } from "react";
import CardInnerWrapper from "@/components/CardInnerWrapper";
import ChatForm from "./ChatForm";
import { getMessageThread } from "@/app/actions/messageActions";

interface Props {
  params: { userId: string };
}

async function ChatPage({ params }: Props): Promise<ReactElement> {
  const messages = await getMessageThread(params.userId);
  console.log("====================================");
  console.log(messages);
  console.log("====================================");
  return (
    <CardInnerWrapper
      header="Chat"
      body={<div>Chat Goes Here</div>}
      footer={<ChatForm />}
    />
  );
}

export default ChatPage;
