"use client";

import { Input } from "@nextui-org/react";
import React, { ReactElement, useState } from "react";
import { BsFillEyeSlashFill } from "react-icons/bs";
import { IoEyeSharp } from "react-icons/io5";

type VariantType = "flat" | "bordered" | "faded" | "underlined";

type InputType = "text" | "password";

interface Props {
  label: React.ReactNode;
  variant: VariantType;
  type?: InputType;
}

export default function FormInput({
  label,
  variant,
  type = "text",
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
      label={label}
      variant={variant}
      type={type === "password" ? (isVisible ? "text" : "password") : "text"}
      endContent={PasswordToggle}
    />
  );
}
