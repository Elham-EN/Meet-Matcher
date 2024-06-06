"use client";

import { Button } from "@nextui-org/button";
import Link from "next/link";
import { FaRegSmile } from "react-icons/fa";

export default function Home() {
  return (
    <div>
      <h1 className="text-2xl font-semibold">Next.js Full Stack Application</h1>
      <Button
        as={Link}
        href="/members"
        startContent={<FaRegSmile size={20} />}
        color="primary"
      >
        Click Me
      </Button>
    </div>
  );
}
