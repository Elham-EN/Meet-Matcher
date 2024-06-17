import React, { ReactElement } from "react";
import { fetchCurrentUserLikeIds, fetchLikedMembers } from "../actions/likeActions";
import ListTabs from "./ListTabs";

interface ListPageProps {
  searchParams: { type: string };
}

export default async function ListPage({
  searchParams,
}: ListPageProps): Promise<ReactElement> {
  const likeIds = await fetchCurrentUserLikeIds();
  const members = await fetchLikedMembers(searchParams.type);
  return (
    <div className="pl-5 md:pl-0">
      <ListTabs members={members} likeIds={likeIds} />
    </div>
  );
}
