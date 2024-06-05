"use client";

import { Button } from "@nextui-org/button";
import { FaRegSmile } from "react-icons/fa";

export default function Home() {
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <h1 className="text-2xl font-semibold">Next.js Full Stack Application</h1>
      <Button startContent={<FaRegSmile size={20} />} color="primary">
        Click Me
      </Button>
    </div>
  );
}
