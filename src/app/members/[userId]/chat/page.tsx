import CardInnerWrapper from "@/components/CardInnerWrapper";

import React, { ReactElement } from "react";
import ChatForm from "./ChatForm";

export default function ChatPage(): ReactElement {
  return (
    <CardInnerWrapper
      header="Chat"
      body={<div>Chat Goes Here</div>}
      footer={<ChatForm />}
    />
  );
}
