import { CardBody, CardHeader, Divider } from "@nextui-org/react";
import React, { ReactElement } from "react";

export default function ChatPage(): ReactElement {
  return (
    <>
      <CardHeader className="text-2xl font-semibold text-pink-600 italic">
        Chat
      </CardHeader>
      <Divider />
      <CardBody>Chat goes here</CardBody>
    </>
  );
}
