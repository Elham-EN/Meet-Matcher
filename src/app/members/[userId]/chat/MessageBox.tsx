"use client";

import { MessageDto } from "@/libs/types";
import { timeAgo } from "@/libs/utils/date-manipulation";
import { Avatar } from "@nextui-org/react";
import clsx from "clsx";
import React, { ReactElement, useEffect, useRef } from "react";

interface Props {
  message: MessageDto;
  currentUserId: string;
}

function MessageBox({ message, currentUserId }: Props): ReactElement {
  // Need to know if the current logged in user is the sender of
  // the message or not
  const isCurrentUserSender = message.senderId === currentUserId;
  const messageEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messageEndRef]);

  const renderAvatar = (): ReactElement => (
    <Avatar
      name={message.senderName}
      className="self-end"
      src={message.senderImage || "/images/user.png"}
    />
  );

  const renderMessageHeader = () => (
    <div
      className={clsx("flex items-center w-full", {
        "justify-between": isCurrentUserSender,
      })}
    >
      {/* If the recipient have read the message, display when user read */}
      {message.datedRead && message.recipientId !== currentUserId ? (
        <span className="text-xs text-black italic">
          (Read {timeAgo(message.datedRead)})
        </span>
      ) : (
        <div></div>
      )}
      <div className="flex">
        <span className="text-sm font-semibold text-gray-900">{message.senderName}</span>
        <span className="text-sm text-gray-500 ml-2">{message.created}</span>
      </div>
    </div>
  );

  const messageContentClasses = clsx("flex flex-col w-[50%] px-2 py-1", {
    "rounded-l-xl rounded-tr-xl text-white bg-blue-100": isCurrentUserSender,
    "rounded-r-xl rounded-tl-xl border-gray-200 bg-green-100": !isCurrentUserSender,
  });

  const renderMessageContent = () => (
    <div className={messageContentClasses}>
      {renderMessageHeader()}
      <p className="text-sm py-3 text-gray-900">{message.text}</p>
    </div>
  );

  return (
    <div className="grid grid-rows-1 m-1">
      <div
        className={clsx("flex gap-2 mb-3", {
          "justify-end text-right": isCurrentUserSender,
          "justify-start": !isCurrentUserSender,
        })}
      >
        {!isCurrentUserSender && renderAvatar()}
        {renderMessageContent()}
        {isCurrentUserSender && renderAvatar()}
      </div>
      {/* When called on an element, it scrolls the page so that the 
          element is visible in the viewport. */}
      <div ref={messageEndRef} />
    </div>
  );
}

export default MessageBox;
