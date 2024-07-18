"use client";

import { createMessage } from "@/app/actions/messageActions";
import { messageSchema } from "@/libs/schemas/MessageSchema";
import { MessageType } from "@/libs/types/MessageType";
import { handleFormServerErrors } from "@/libs/utils/formUil";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@nextui-org/react";
import { useParams, useRouter } from "next/navigation";
import React, { ReactElement } from "react";
import { useForm } from "react-hook-form";
import { HiPaperAirplane } from "react-icons/hi2";

export default function ChatForm(): ReactElement {
  const router = useRouter();
  // http://localhost:3000/members/clxbgdzxw000911min6czyvhe/chat
  // userId need to match the folder name "[userId]"
  const params = useParams<{ userId: string }>();
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { isSubmitting, isValid, errors },
  } = useForm<MessageType>({
    resolver: zodResolver(messageSchema),
  });

  const onSubmit = async (data: MessageType): Promise<void> => {
    const result = await createMessage(params.userId, data);
    if (result.status === "error") {
      handleFormServerErrors(result, setError);
    } else {
      reset();
      router.refresh();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <div className="flex items-center gap-3">
        <Input
          placeholder="Type a message"
          variant="faded"
          {...register("text")}
          isInvalid={!!errors.text}
          errorMessage={errors.text?.message}
          size="lg"
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
      </div>
      <div className="flex flex-col mt-3">
        {errors.root?.serverError && (
          <div className="bg-danger py-2 pl-2 rounded-lg">
            <p className=" text-white text-sm">{errors.root.serverError.message}</p>
          </div>
        )}
      </div>
    </form>
  );
}
