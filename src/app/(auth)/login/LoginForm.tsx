"use client";
import { signInUser } from "@/app/actions/authActions";
import FormInput from "@/components/form/FormInput";
import { loginSchema } from "@/libs/schemas/LoginSchema";
import { LoginFormType } from "@/libs/types/FormType";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Card, CardBody, CardHeader } from "@nextui-org/react";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import { GiPadlock } from "react-icons/gi";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function LoginForm(): React.ReactElement {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<LoginFormType>({
    resolver: zodResolver(loginSchema),
    // When user clicks in a field and start typing in the field and then
    // clicks out of the field and get notifiy by validator if there is error
    mode: "onTouched",
  });

  const onSubmitHandler = async (data: LoginFormType) => {
    const result = await signInUser(data);
    console.log(result);
    if (result.status === "success") {
      router.push("/members");
      router.refresh();
      toast.success("Sign in successfully");
    } else {
      console.error("Failed to login:", result.error);
      toast.error("Invalid credentials");
    }
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
              isLoading={isSubmitting}
            >
              {!isSubmitting && "Login"}
            </Button>
          </div>
        </form>
        <div className="flex justify-center items-center gap-1 h-[100px]">
          <p>Dont have an account?</p>
          <span>
            <Link
              className="text-pink-500 hover:text-pink-300 font-semibold"
              href={"/register"}
            >
              Sign Up
            </Link>
          </span>
        </div>
      </CardBody>
    </Card>
  );
}
