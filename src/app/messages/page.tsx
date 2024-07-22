import React, { ReactElement } from "react";
import MessageSidebar from "./MessageSidebar";
import { getMessageByContainer } from "../actions/messageActions";
import MessageTable from "./MessageTable";

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
      <div className="col-span-10">
        <MessageTable messages={messages} />
      </div>
    </div>
  );
}

export default MessagesPage;
