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
  sortBy,
}: FilterOptionsProps) {
  return (
    <div className="flex justify-between">
      <div className="flex gap-2">
        <DateFilter
          onDateSelect={(date) => setDateFilter(date)}
          loadDate={filters.date}
        />
        {selectedTabIndex === 0 && (
          <LocationFilter
            selectedLocation={filters.location}
            onLocationChange={setLocationFilter}
            locations={LOCATION_ITEMS}
          />
        )}
      </div>
      <div>
        <SortFilter
          selectedSort={sortBy}
          onSortChange={setSortBy}
          sortOptions={SORT_ITEMS.list}
        />
      </div>
    </div>
  );
}
