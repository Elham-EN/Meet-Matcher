import { getMemberByUserId } from "@/app/actions/memberActions";
import React, { ReactElement, Suspense } from "react";
import { notFound } from "next/navigation";
import { Card } from "@nextui-org/react";
import LoadingSpinner from "./loading";
import MemberSidebar from "@/components/Members/MemberSidebar";

interface LayoutProps {
  children: React.ReactNode;
  params: { userId: string };
}

async function layout({ children, params }: LayoutProps): Promise<ReactElement> {
  const member = await getMemberByUserId(params.userId);
  if (!member) notFound();
  const basePath = `/members/${member.userId}`;
  const navLinks = [
    { name: "Profile", href: `${basePath}` },
    { name: "Photos", href: `${basePath}/photos` },
    { name: "Chat", href: `${basePath}/chat` },
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
