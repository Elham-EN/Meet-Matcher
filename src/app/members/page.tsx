import Link from "next/link";
import React from "react";

export default function MembersPage() {
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <h1 className="text-2xl font-semibold">Member Page</h1>
      <Link href={"/"}>Go back to Homepage</Link>
    </div>
  );
}
