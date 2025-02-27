import { useEffect, useMemo, useState } from "react";

const sortMap: Record<string, string | undefined> = {
  정렬: undefined,
  최신순: "dateTime",
  "마감 임박": "registrationEnd",
  "참여 인원순": "participantCount",
};

export function useGatheringFilters() {
  const [selectedTabIndex, setSelectedTabIndex] = useState<number>(0);
  const [typeFilter, setTypeFilter] = useState<string | null>("DALLAEMFIT");
  const [locationFilter, setLocationFilter] = useState<string | null>(null);
  const [dateFilter, setDateFilter] = useState<string | undefined>(undefined);
  const [sortBy, setSortBy] = useState<string>("정렬");

  useEffect(() => {
    setTypeFilter(selectedTabIndex === 0 ? "DALLAEMFIT" : "WORKATION");
  }, [selectedTabIndex]);

  //유즈메모 처리 예정
  const subChips =
    selectedTabIndex === 0
      ? [
          { label: "전체", value: "DALLAEMFIT" },
          { label: "에버 스트레칭", value: "OFFICE_STRETCHING" },
          { label: "에버 푸드트립", value: "MINDFULNESS" },
        ]
      : [{ label: "전체", value: "WORKATION" }];

  //유즈메모 처리 예정
  const filters = {
    type: typeFilter,
    location: locationFilter,
    date: dateFilter,
    sortBy: sortMap[sortBy],
  };

  return {
    selectedTabIndex,
    setSelectedTabIndex,
    typeFilter,
    setTypeFilter,
    locationFilter,
    setLocationFilter,
    dateFilter,
    setDateFilter,
    sortBy,
    setSortBy,
    filters,
    subChips,
  };
}
