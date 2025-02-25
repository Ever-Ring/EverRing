"use client";

import { useEffect, useRef, useState } from "react";
import { useGetGatherings } from "@features/list/hooks/useGetGatherings";
import Button from "@components/common/Button";
import TabMenu from "@components/common/TabMenu";
import HeartImage from "@assets/img-head-class.svg";
import Chip from "@components/common/Chip";
import DateFilter from "@components/common/DateFilter";
import SortFilter from "@components/common/SortFilter";
import LocationFilter from "@components/common/LocationFilter";
import GatheringList from "@components/common/GatheringList";

const tabs = [
  { label: "cloud", title: "구름링" },
  { label: "tree", title: "나무링" },
];

export default function List() {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, error } =
    useGetGatherings();

  console.log("📡 현재 불러온 data 데이터:", data);
  console.log("🚀 hasNextPage:", hasNextPage);
  console.log("🚀 isFetchingNextPage:", isFetchingNextPage);

  const gatherings = Array.isArray(data?.pages)
    ? data.pages.flatMap((page) =>
        Array.isArray(page.data)
          ? page.data.filter((item) => item.canceledAt === null)
          : [],
      )
    : [];

  console.log("📡 현재 불러온 gatherings:", gatherings);

  useEffect(() => {
    if (!loadMoreRef.current) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        console.log("📡 스크롤 감지됨:", entries[0]);
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          console.log("🔄 추가 데이터 요청 중...");
          fetchNextPage();
        }
      },
      {
        threshold: 0.1, // 10% 이상 보이면 실행
        rootMargin: "100px",
      },
    );

    observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div className="flex w-full flex-col pt-6 md:pt-8">
      {/* 헤더 */}
      <section className="mb-6 flex items-center justify-start gap-4 sm:mb-8">
        <HeartImage className="w-18 h-18" />
        <div>
          <p className="text-sm font-medium">함께 할 사람이 없나요?</p>
          <p className="mt-1 text-2xl font-semibold">
            지금 모임에 참여해보세요
          </p>
        </div>
      </section>

      {/*  카테고리 탭 */}
      <section className="mb-[14px] flex flex-wrap items-center justify-between">
        <div>
          <TabMenu
            hasIcon
            tabs={tabs}
            selectedIndex={selectedIndex}
            onSelect={setSelectedIndex}
          />
        </div>
        <div className="flex items-center">
          <Button text="모임 만들기" size="small" />
        </div>
      </section>

      {/*  카테고리 필터 */}
      <section className="flex justify-start gap-2">
        <Chip label="전체" selected />
        <Chip label="오피스 스트레칭" selected />
        <Chip label="마인드풀니스" selected />
      </section>

      <hr className="my-4 w-full border-t-2 border-gray-200" />

      {/* 정렬 & 필터링 섹션 */}
      <section className="mb-4 flex justify-between sm:mb-6">
        <div className="flex gap-2">
          <LocationFilter />
          <DateFilter
            onDateSelect={(date) =>
              console.log("API 요청: 필터링할 날짜 =", date || "전체")
            }
          />
        </div>
        <SortFilter variant="list" />
      </section>

      {/*  모임 리스트 */}
      <section>
        <GatheringList gatherings={gatherings} />
      </section>

      {/*  무한 스크롤 트리거 */}
      <div ref={loadMoreRef} className="bg-red-500 w-30 z-10 h-10 text-center">
        {isFetchingNextPage ? "로딩 중..." : ""}
      </div>

      {/*  API 요청 오류 표시 */}
      {error && (
        <div className="text-red-500">❌ API 요청 오류: {error.message}</div>
      )}
    </div>
  );
}
