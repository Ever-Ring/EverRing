"use client";

import Button from "@components/common/Button";
import TabMenu from "@components/common/TabMenu";
import { useState } from "react";
import HeartImage from "@assets/img-head-class.svg";
import Chip from "@components/common/Chip";

const tabs = [
  { label: "cloud", title: "구름링" },
  { label: "tree", title: "나무링" },
];

export default function List() {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  return (
    <div className="flex flex-col px-4 pt-6 sm:px-6 sm:pt-8 lg:px-[102px]">
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

      {/* 정렬필터 섹션 */}
      <section />

      {/* 카드섹션 */}
      <section />
    </div>
  );
}
