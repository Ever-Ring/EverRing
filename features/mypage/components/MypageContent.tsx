"use client";

import TabMenu from "@components/common/TabMenu";
import { useState } from "react";
import MypageCardList from "@features/mypage/components/MypageCardList";

const tabs = [
  { label: "mygathering", title: "나의 모임" },
  { label: "myreview", title: "나의 리뷰" },
  { label: "madebyme", title: "내가 만든 모임" },
];

export default function MypageContent() {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  return (
    <section className="flex flex-1 flex-col bg-white">
      <div
        className={`sticky top-[136px] z-10 border-t-2 border-gray-900 bg-white px-4 pt-6 md:top-[156px] md:px-6 ${
          selectedIndex === 1 ? "pb-3" : "pb-6"
        }`}
      >
        <TabMenu
          tabs={tabs}
          selectedIndex={selectedIndex}
          onSelect={setSelectedIndex}
        />
      </div>
      <div className="flex flex-1 flex-col px-4 md:px-6">
        <MypageCardList selectedIndex={selectedIndex} />
      </div>
    </section>
  );
}
