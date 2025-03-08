import { Suspense } from "react";
import ListContent from "@features/liked/ListContent";

export default function List() {
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <ListContent />
    </Suspense>
  );
}
