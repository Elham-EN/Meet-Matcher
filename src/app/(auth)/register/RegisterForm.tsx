"use client";
import FormInput from "@/components/form/FormInput";
import { registerSchema } from "@/libs/schemas/RegisterSchema";
import { RegisterFormType } from "@/libs/types/FormType";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Card, CardBody, CardHeader } from "@nextui-org/react";
import React from "react";
import { useForm } from "react-hook-form";
import { GiPadlock } from "react-icons/gi";

export default function RegisterForm(): React.ReactElement {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<RegisterFormType>({
    resolver: zodResolver(registerSchema),
    mode: "onTouched",
  });

  const onSubmitHandler = (data: RegisterFormType) => {
    console.log(data);
  };

  return (
    <Card className="w-2/5 min-w-[400px] mx-auto">
      <CardHeader className="flex flex-col item-center justify-center">
        <div className="flex flex-col gap-2 items-center text-pink-400">
          <div className="flex flex-row items-center gap-3">
            <GiPadlock size={30} />
            <h1 className="text-2xl font-semibold">Register</h1>
          </div>
          <p className=" text-neutral-500">Welcome to MeetMatcher</p>
        </div>
      </CardHeader>
      <CardBody>
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <div className="space-y-4">
            <FormInput
              label="Name"
              variant="bordered"
              register={register}
              fieldName="name"
              error={errors.name}
            />
            <FormInput
              label="Email"
              variant="bordered"
              register={register}
              fieldName="email"
              error={errors.email}
            />
            <FormInput
              label="Password"
              variant="bordered"
              type="password"
              register={register}
              fieldName="password"
              error={errors.password}
            />
            <Button
              fullWidth
              className="bg-pink-400 text-white text-lg"
              type="submit"
              isDisabled={!isValid}
            >
              Login
            </Button>
          </div>
        </form>
      </CardBody>
    </Card>
  );
}
