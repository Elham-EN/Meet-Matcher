import FormInput from "@/components/form/FormInput";
import { Button, Card, CardBody, CardHeader, Input } from "@nextui-org/react";
import React from "react";
import { GiPadlock } from "react-icons/gi";

export default function LoginForm(): React.ReactElement {
  return (
    <Card className="w-2/5 mx-auto">
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
        <form action="">
          <div className="space-y-4">
            <FormInput label="Email" variant="bordered" />
            <FormInput label="Password" variant="bordered" type="password" />
            <Button fullWidth className="bg-pink-400 text-white text-lg" type="submit">
              Login
            </Button>
          </div>
        </form>
      </CardBody>
    </Card>
  );
}
