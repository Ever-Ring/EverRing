"use client";

import LocationFilter from "@components/common/LocationFilter";
import DateFilter from "@components/common/DateFilter";
import SortFilter from "@components/common/SortFilter";
import { LOCATION_ITEMS, SORT_ITEMS } from "@constants/filter";
import { FilterOptionsProps } from "@customTypes/filters";

export default function FilterOptions({
  selectedTabIndex,
  filters,
  setLocationFilter,
  setDateFilter,
  setSortBy,
}: FilterOptionsProps) {
  return (
    <div className="flex gap-2">
      {selectedTabIndex === 0 && (
        <LocationFilter
          selectedLocation={filters.location}
          onLocationChange={setLocationFilter}
          locations={LOCATION_ITEMS}
        />
      )}
      <DateFilter
        onDateSelect={(date) => setDateFilter(date)}
        loadDate={filters.date}
      />
      <SortFilter
        selectedSort={filters.sortBy}
        onSortChange={setSortBy}
        sortOptions={SORT_ITEMS.list}
      />
    </div>
  );
}
