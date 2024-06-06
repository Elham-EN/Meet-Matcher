"use client";

import { LoginFormType } from "@/app/(auth)/login/LoginForm";
import { Input } from "@nextui-org/react";
import React, { ReactElement, useState } from "react";
import { FieldError, UseFormRegister } from "react-hook-form";
import { BsFillEyeSlashFill } from "react-icons/bs";
import { IoEyeSharp } from "react-icons/io5";

type VariantType = "flat" | "bordered" | "faded" | "underlined";

type InputType = "text" | "password";

interface Props {
  label: React.ReactNode;
  variant: VariantType;
  type?: InputType;
  fieldName: keyof LoginFormType;
  register: UseFormRegister<LoginFormType>;
  error?: FieldError | undefined;
}

export default function FormInput({
  label,
  variant,
  type = "text",
  fieldName,
  register,
  error,
}: Props): ReactElement {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const PasswordToggle =
    type === "password" ? (
      <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
        {isVisible ? (
          <BsFillEyeSlashFill className="text-2xl text-default-400 pointer-events-none" />
        ) : (
          <IoEyeSharp className="text-2xl text-default-400 pointer-events-none" />
        )}
      </button>
    ) : (
      ""
    );

  return (
    <Input
      defaultValue=""
      label={label}
      variant={variant}
      type={type === "password" ? (isVisible ? "text" : "password") : "text"}
      endContent={PasswordToggle}
      {...register(fieldName, { required: `${label} is required` })}
      isInvalid={!!error}
      errorMessage={error?.message}
    />
  );
}
