"use client";

import { useState } from "react";
import RatingContainer from "@features/review/components/RatingContainer";
import FilterBar from "@features/review/components/FilterBar";
import ReviewListwithImage from "@components/common/ReviewListWithImage";
import Chip from "@components/common/Chip";
import TabMenu from "@components/common/TabMenu";
import { TABS } from "@constants/tab";

const reviews = [
  {
    teamId: 0,
    id: 0,
    score: 4,
    comment: "리뷰1",
    createdAt: "2025-02-13T09:27:32.804Z",
    Gathering: {
      teamId: 0,
      id: 0,
      type: "string",
      name: "모임1",
      dateTime: "2025-02-13T09:27:32.804Z",
      location: "홍대입구",
      image: "/image/dummyImage.png",
    },
    User: {
      teamId: 0,
      id: 0,
      name: "네임1",
      image: "/image/img-profile-large-default",
    },
  },
];
const scores = {
  teamId: 0,
  // gatheringId: 0, 얘가 무슨 역할을 하는지 아직 모르겠음..
  type: "DALLAEMFIT",
  averageScore: 0,
  oneStar: 5,
  twoStars: 25,
  threeStars: 2,
  fourStars: 19,
  fiveStars: 27,
};

export default function ReviewContentContainer() {
  const [selectedTabIndex, setSelectedTabIndex] = useState<number>(0);

  return (
    <section className="flex h-full w-full flex-col gap-6">
      <div className="sticky top-[54px] z-10 bg-gray-50 pt-6 md:top-[60px] md:pt-8">
        <div className="flex flex-col items-start gap-3 border-b-2 border-gray-200 pb-4 lg:gap-4">
          <TabMenu
            hasIcon
            tabs={TABS}
            selectedIndex={selectedTabIndex}
            onSelect={setSelectedTabIndex}
          />
          <div className="flex items-start gap-2">
            <Chip label="전체" />
            <Chip label="오피스 스트레칭" />
            <Chip label="마인드풀니스" />
          </div>
        </div>
      </div>

      <RatingContainer scoreData={scores} />
      <div className="flex h-full w-full flex-col items-start bg-white">
        <div className="sticky top-[176px] z-10 w-full md:top-[190px] lg:top-[194px]">
          <FilterBar />
        </div>

        <div className="px-4 pb-6 md:px-6">
          <ReviewListwithImage reviewData={reviews} hasUserInfo />
        </div>
      </div>
    </section>
  );
}
