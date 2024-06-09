import { Input } from "@nextui-org/react";
import React, { ReactElement, useState } from "react";
import { FieldError, FieldValues, UseFormRegister, Path } from "react-hook-form";
import { BsFillEyeSlashFill } from "react-icons/bs";
import { IoEyeSharp } from "react-icons/io5";

type VariantType = "flat" | "bordered" | "faded" | "underlined";
type InputType = "text" | "password";

interface Props<T extends FieldValues> {
  label: React.ReactNode;
  variant: VariantType;
  type?: InputType;
  fieldName: Path<T>;
  register: UseFormRegister<T>;
  error?: FieldError | undefined;
}

export default function FormInput<T extends FieldValues>({
  label,
  variant,
  type = "text",
  fieldName,
  register,
  error,
}: Props<T>): ReactElement {
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
      {...register(fieldName)}
      isInvalid={!!error}
      errorMessage={error?.message}
    />
  );
}
