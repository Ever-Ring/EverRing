"use client";

import Button from "@components/common/Button";
import TabMenu from "@components/common/TabMenu";
import { useState } from "react";
import HeartImage from "@assets/img-head-class.svg";
import Chip from "@components/common/Chip";
import DateFilter from "@components/common/DateFilter";
import SortFilter from "@components/common/SortFilter";

const tabs = [
  { label: "cloud", title: "구름링" },
  { label: "tree", title: "나무링" },
];

export default function List() {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  return (
    <div className="flex w-full flex-col px-4 pt-6 md:px-6 md:pt-8 lg:px-24">
      {/* 헤더 */}
      <section className="justify-star mb-6 flex items-center gap-4 sm:mb-8">
        <HeartImage className="w-18 h-18" />
        <div>
          <p className="text-sm font-medium">함께 할 사람이 없나요?</p>
          <p className="mt-1 text-2xl font-semibold">
            지금 모임에 참여해보세요
          </p>
        </div>
      </section>

      {/* 카테고리 달램핏 */}
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

      {/* 카테고리 달램핏 */}
      <section className="flex justify-start gap-2">
        <Chip label="전체" selected />
        <Chip label="오피스 스트레칭" selected />
        <Chip label="마인드폴니스" selected />
      </section>

      <hr className="my-4 w-full border-t-2 border-gray-200" />

      {/* 정렬필터 섹션 */}
      <section className="mb-4 flex justify-between sm:mb-6">
        <div>
          <DateFilter label="지역전체" isDefault />
          <DateFilter label="날짜전체" isDefault />
        </div>
        <SortFilter label="마감임박" />
      </section>

      {/* 카드섹션 */}
      <section className="border border-black" />
    </div>
  );
}
