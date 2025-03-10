"use client";

import { useEffect, useMemo } from "react";
import { sortMap } from "@constants/filter";
import { useQueryString } from "@hooks/useQueryString";
import { useQueryTabIndex } from "@hooks/useQueryTabIndex";

export function GatheringFiltersViewModel() {
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
