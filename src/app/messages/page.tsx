import React, { ReactElement } from "react";
import MessageSidebar from "./MessageSidebar";
import { getMessageByContainer } from "../actions/messageActions";

interface Props {
  searchParams: { container: string };
}

async function MessagesPage({ searchParams }: Props): Promise<ReactElement> {
  const messages = await getMessageByContainer(searchParams.container);
  console.log(messages);
  return (
    <div className="grid grid-cols-12 gap-5 h-[80vh] mt-10">
      <div className="col-span-2">
        <MessageSidebar />
      </div>
      <div className="col-span-10">Message table goes here</div>
    </div>
  );
}

export default MessagesPage;
