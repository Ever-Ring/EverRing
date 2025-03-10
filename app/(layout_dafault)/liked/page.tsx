import { Suspense } from "react";
import LikePageContent from "@features/liked/components/LikePageContent";

export default function LikedPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LikePageContent />
    </Suspense>
  );
}
