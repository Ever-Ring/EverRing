"use client";

import GatheringList from "@components/common/GatheringList";
import { useGetIdGatherings } from "@features/list/hooks/useGetIdGatherings";
import Image from "next/image";

export default function LikePage() {
  const { data: favoriteDate = [] } = useGetIdGatherings();

  return (
    <div className="flex w-full flex-col pt-6 md:pt-8">
      <section className="mb-6 flex items-center justify-start gap-4 sm:mb-8">
        <Image
          src="image/img-head-saved.svg"
          alt="review head image"
          width={72}
          height={72}
        />
        <div>
          <p className="mt-1 text-2xl font-semibold">찜한 모임</p>
          <p className="text-sm font-medium">
            마감되기 전에 지금 바로 참여해보세요
          </p>
        </div>
      </section>

      {favoriteDate.length > 0 ? (
        <section>
          <GatheringList gatherings={favoriteDate} />
        </section>
      ) : (
        <div className="mt-10 flex flex-col items-center justify-center">
          <p className="text-lg font-semibold">💔 찜한 모임이 없습니다.</p>
          <p className="text-sm text-gray-500">모임을 찾아 찜해보세요!</p>
        </div>
      )}
    </div>
  );
}
