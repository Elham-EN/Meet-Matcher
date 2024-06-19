import { getMemberByUserId } from "@/app/actions/memberActions";
import React, { ReactElement, Suspense } from "react";
import MemberSidebar from "../MemberSidebar";
import { notFound } from "next/navigation";
import { Card } from "@nextui-org/react";
import LoadingSpinner from "./loading";
import { getAuthUserId } from "@/app/actions/authActions";

interface LayoutProps {
  children: React.ReactNode;
}

async function layout({ children }: LayoutProps): Promise<ReactElement> {
  const userId = await getAuthUserId();
  const member = await getMemberByUserId(userId);
  if (!member) notFound();

  const basePath = `/members/edit`;

  const navLinks = [
    { name: "Edit Profile", href: `${basePath}` },
    { name: "Update Photos", href: `${basePath}/photos` },
  ];

  return (
    <div className="grid grid-cols-12 gap-5 h-[80vh]">
      <div className="col-span-3">
        <MemberSidebar member={member} navLinks={navLinks} />
      </div>
      <div className="col-span-9">
        <Card className="w-full mt-10 h-[80vh]">
          <Suspense fallback={<LoadingSpinner />}>{children}</Suspense>
        </Card>
      </div>
    </div>
  );
}

export default layout;
