"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useMemo, useCallback } from "react";
import { sortMap } from "@constants/filter";
import { updateParams } from "@utils/url";
import { setSelectedTabIndex } from "@utils/url";

export function useGatheringFilters() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const selectedTabIndex = Number(searchParams.get("tab") || 0);
  const typeFilter = searchParams.get("type") || "DALLAEMFIT";
  const locationFilter = searchParams.get("location") || null;
  const dateFilter = searchParams.get("date") || null;
  const sortBy = searchParams.get("sort") || null;

  const sortOrder = sortBy === "참여 인원순" ? "desc" : null;

  const setTabIndex = useCallback(
    (index: number) =>
      setSelectedTabIndex(index, searchParams, router, pathname),
    [searchParams, router, pathname],
  );

  const setTypeFilter = useCallback(
    (type: string | null) =>
      updateParams("type", type, searchParams, router, pathname),
    [searchParams, router, pathname],
  );

  const setLocationFilter = useCallback(
    (location: string | null) =>
      updateParams("location", location, searchParams, router, pathname),
    [searchParams, router, pathname],
  );

  const setDateFilter = useCallback(
    (date: string | null) =>
      updateParams("date", date, searchParams, router, pathname),
    [searchParams, router, pathname],
  );

  const setSortBy = useCallback(
    (sort: string | null) =>
      updateParams("sort", sort, searchParams, router, pathname),
    [searchParams, router, pathname],
  );

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

  const filters = useMemo(
    () => ({
      type: typeFilter,
      location: locationFilter,
      date: dateFilter,
      sortBy: sortBy ? (sortMap[sortBy] ?? null) : null,
      sortOrder,
    }),
    [typeFilter, locationFilter, dateFilter, sortBy, sortOrder],
  );

  return {
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
  };
}
