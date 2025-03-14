"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { sortMap } from "@constants/filter";
import { useQueryString } from "@hooks/useQueryString";
import { useQueryTabIndex } from "@hooks/useQueryTabIndex";
import { useInfiniteGetGatherings } from "./useInfiniteGetGatherings";
import { useGetIdGatherings } from "@features/list/hooks/useGetIdGatherings";
import { Gathering } from "@customTypes/gathering";
import { useFavoriteStore } from "@stores/favoriteStore";

export function GatheringViewModel() {
  const [showExpired, setShowExpired] = useState(false);
  const [selectedTabIndex, setTabIndex] = useQueryTabIndex();
  const [typeFilter, setTypeFilter] = useQueryString("type", "DALLAEMFIT");
  const [locationFilter, setLocationFilter] = useQueryString("location", null);
  const [dateFilter, setDateFilter] = useQueryString("date", null);
  const [sortBy, setSortBy] = useQueryString("sort", null);
  const sortOrder = sortBy === "참여 인원순" ? "desc" : null;

  const subChips = useMemo(
    () =>
      selectedTabIndex === 0
        ? [
            { label: "전체", value: "DALLAEMFIT" },
            { label: "에버 스트레칭", value: "OFFICE_STRETCHING" },
            { label: "에버 푸드트립", value: "MINDFULNESS" },
          ]
        : [{ label: "전체", value: "WORKATION" }],
    [selectedTabIndex],
  );

  useEffect(() => {
    const newType = selectedTabIndex === 0 ? "DALLAEMFIT" : "WORKATION";
    setTypeFilter(newType);
  }, [selectedTabIndex]);

  const filters = useMemo(
    () => ({
      type: typeFilter,
      location: locationFilter,
      date: dateFilter,
      sortBy: sortBy ? (sortMap[sortBy] ?? null) : null,
      sortOrder,
    }),
    [
      selectedTabIndex,
      typeFilter,
      locationFilter,
      dateFilter,
      sortBy,
      sortOrder,
    ],
  );

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, error } =
    useInfiniteGetGatherings(filters);
  const gatherings: Gathering[] =
    data?.pages?.flatMap((page) => page.data) || [];

  const loadMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!loadMoreRef.current) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1, rootMargin: "100px" },
    );

    observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const { data: favoriteDate = [] } = useGetIdGatherings(filters);
  const { clearFavorites } = useFavoriteStore();

  return {
    showExpired,
    setShowExpired,
    selectedTabIndex,
    setTabIndex,
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
    gatherings,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    error,
    loadMoreRef,
    favoriteDate,
    clearFavorites,
  };
}
