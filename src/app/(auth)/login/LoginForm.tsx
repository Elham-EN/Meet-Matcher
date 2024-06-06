"use client";
import FormInput from "@/components/form/FormInput";
import { Button, Card, CardBody, CardHeader } from "@nextui-org/react";
import React from "react";
import { useForm } from "react-hook-form";
import { GiPadlock } from "react-icons/gi";

export type LoginFormType = {
  email: string;
  password: string;
};

export default function LoginForm(): React.ReactElement {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormType>();

  const onSubmitHandler = (data: any) => {
    console.log(data);
    errors.email;
  };

  return (
    <Card className="w-2/5 min-w-[400px] mx-auto">
      <CardHeader className="flex flex-col item-center justify-center">
        <div className="flex flex-col gap-2 items-center text-pink-400">
          <div className="flex flex-row items-center gap-3">
            <GiPadlock size={30} />
            <h1 className="text-2xl font-semibold">Login</h1>
          </div>
          <p className=" text-neutral-500">Welcome back to MeetMatcher</p>
        </div>
      </CardHeader>
      <CardBody>
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <div className="space-y-4">
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
