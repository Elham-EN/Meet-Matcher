"use client";

import FormInput from "@/components/form/FormInput";
import { messageSchema } from "@/libs/schemas/MessageSchema";
import { MessageType } from "@/libs/types/MessageType";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/react";
import React, { ReactElement } from "react";
import { useForm } from "react-hook-form";
import { HiPaperAirplane } from "react-icons/hi2";

export default function ChatForm(): ReactElement {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, isValid },
  } = useForm<MessageType>({
    resolver: zodResolver(messageSchema),
  });

  const onSubmit = (data: MessageType): void => {};

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full flex items-center gap-3">
      <FormInput
        label={"Type a message"}
        fieldName="text"
        type="text"
        variant="faded"
        register={register}
      />
      <Button
        type="submit"
        isIconOnly
        radius="full"
        isLoading={isSubmitting}
        isDisabled={!isValid || isSubmitting}
        className="bg-pink-500"
      >
        <HiPaperAirplane size={20} color="white" />
      </Button>
    </form>
  );
}
