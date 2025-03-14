import { Suspense } from "react";
import LikePageContent from "@features/liked/components/LikePageContent";
import Image from "next/image";

export default function LikedPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <section className="mb-6 mt-6 flex items-center justify-start gap-4 sm:mb-8 sm:mt-8">
        <Image
          src="image/img-head-saved.svg"
          alt="review head image"
          width={72}
          height={72}
        />
        <div className="flex flex-1 justify-between">
          <div>
            <p className="mt-1 text-2xl font-semibold">찜한 모임</p>
            <p className="text-sm font-medium">
              마감되기 전에 지금 바로 참여해보세요
            </p>
          </div>
        </div>
      </section>
      <LikePageContent />
    </Suspense>
  );
}
