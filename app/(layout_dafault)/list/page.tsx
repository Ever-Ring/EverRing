import { Suspense } from "react";
import ListContent from "@features/list/components/ListContent";

export default function List() {
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <ListContent />
    </Suspense>
  );
}
