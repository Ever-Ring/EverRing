"use client";

import { useEffect, useState } from "react";
import { GATHERING_TYPE, GatheringType } from "@constants/gatheringType";
import { sortMap, ASC, DESC } from "@features/review/constants/review";
import useGetReviewData from "@features/review/hooks/useGetReviewData";
import useGetReviewScore from "@features/review/hooks/useGetReviewScore";

interface ReviewListState {
  tabIndex: number;
  chipIndex: number;
  type: GatheringType;
  location: string;
  date?: string;
  sort: string;
}

export default function useReviewListViewModel() {
  const [filters, setFilters] = useState<ReviewListState>({
    tabIndex: 0,
    chipIndex: 0,
    type: GATHERING_TYPE.DALLAEMFIT,
    location: "지역전체",
    date: undefined as string | undefined,
    sort: "정렬",
  });

  useEffect(() => {
    const typeMap: Record<string, GatheringType> = {
      "0-0": GATHERING_TYPE.DALLAEMFIT,
      "0-1": GATHERING_TYPE.OFFICE_STRETCHING,
      "0-2": GATHERING_TYPE.MINDFULNESS,
      "1-0": GATHERING_TYPE.WORKATION,
    };

    const newType =
      typeMap[`${filters.tabIndex}-${filters.chipIndex}`] ||
      GATHERING_TYPE.DALLAEMFIT;
    setFilters((prev) => ({ ...prev, type: newType }));
  }, [filters.tabIndex, filters.chipIndex]);

  const reviewFilter = {
    type: filters.type,
    location: filters.location === "지역전체" ? undefined : filters.location,
    date: filters.date,
    sortBy: sortMap[filters.sort] || undefined,
    sortOrder: filters.sort === "오래된순" ? ASC : DESC,
    limit: 10,
  };

  const {
    data: reviews,
    fetchNextPage,
    hasNextPage,
    isError,
    isFetchingNextPage,
  } = useGetReviewData(reviewFilter);

  const { data: scoreData } = useGetReviewScore({ type: filters.type });

  const handleChangeTabIndex = (index: number) => {
    setFilters((prev) => ({ ...prev, tabIndex: index, chipIndex: 0 }));
  };

  const handleChangeChipIndex = (index: number) => {
    setFilters((prev) => ({ ...prev, chipIndex: index }));
  };

  const handleChangeLocation = (location: string) => {
    setFilters((prev) => ({ ...prev, location }));
  };

  const handleChangeDate = (date?: string) => {
    setFilters((prev) => ({ ...prev, date }));
  };

  const handleChangeSort = (sort: string) => {
    setFilters((prev) => ({ ...prev, sort }));
  };

  return {
    filters,
    reviews,
    scoreData,
    hasNextPage,
    isError,
    isFetchingNextPage,

    fetchNextPage,
    handleChangeTabIndex,
    handleChangeChipIndex,
    handleChangeLocation,
    handleChangeDate,
    handleChangeSort,
  };
}
