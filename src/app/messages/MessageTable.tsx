"use client";

import { MessageDto } from "@/libs/types";
import {
  Card,
  getKeyValue,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Key, ReactElement } from "react";

interface Props {
  messages: MessageDto[];
}

export default function MessageTable({ messages }: Props): ReactElement {
  const router = useRouter();
  // check for the container to be equal to outbox if not than
  // by default it's equal to inbox
  const searchParams = useSearchParams();
  const isOutbox: boolean = searchParams.get("container") === "outbox";

  // To render a table dynamically
  const columns = [
    {
      key: isOutbox ? "recipientName" : "senderName",
      label: isOutbox ? "Recipient" : "Sender",
    },
    { key: "text", label: "Message" },
    { key: "created", label: isOutbox ? "Date sent" : "Date received" },
  ];

  const handleRowSelect = (key: Key) => {
    // return message for the row user clicked on
    const message = messages.find((m) => m.id === key);
    const url = isOutbox
      ? `/members/${message?.recipientId}`
      : `/members/${message?.senderId}`;
    router.push(url + "/chat");
  };

  return (
    <Card className="flex flex-col gap-3 h-[80vh] overflow-auto">
      <Table
        aria-label="Table with messages"
        selectionMode="single"
        onRowAction={(key) => handleRowSelect(key)}
        shadow="none"
      >
        <TableHeader columns={columns}>
          {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
        </TableHeader>
        <TableBody items={messages} emptyContent="No messages for this container">
          {(item) => (
            <TableRow key={item.id} className="cursor-pointer">
              {(columnKey) => (
                <TableCell>
                  <div
                    className={`${!item.datedRead && !isOutbox ? "font-semibold" : ""}`}
                  >
                    {getKeyValue(item, columnKey)}
                  </div>
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Card>
  );
}
