import { getMemberByUserId } from "@/app/actions/memberActions";
import React, { ReactElement, Suspense } from "react";
import MemberSidebar from "../MemberSidebar";
import { notFound } from "next/navigation";
import { Card } from "@nextui-org/react";
import LoadingSpinner from "./loading";

interface LayoutProps {
  children: React.ReactNode;
  params: { userId: string };
}

async function layout({ children, params }: LayoutProps): Promise<ReactElement> {
  const member = await getMemberByUserId(params.userId);
  if (!member) notFound();
  return (
    <div className="grid grid-cols-12 gap-5 h-[80vh]">
      <div className="col-span-3">
        <MemberSidebar member={member} />
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
