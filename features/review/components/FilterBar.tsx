import DateFilter from "@components/common/DateFilter";
import LocationFilter from "@components/common/LocationFilter";
import SortFilter from "@components/common/SortFilter";
import { LOCATION_ITEMS, SORT_ITEMS } from "@constants/filter";
import { ReviewListState } from "@customTypes/review";

interface FilterBarProps {
  filters: ReviewListState;
  onLocationChange: (location: string | null) => void;
  onDateChange: (date: string | null) => void;
  onSortChange: (selected: string | null) => void;
}

export default function FilterBar({
  filters,
  onLocationChange,
  onDateChange,
  onSortChange,
}: FilterBarProps) {
  return (
    <div className="w-full border-t-2 border-gray-900 bg-white p-6">
      <div className="flex items-start justify-between self-stretch">
        <div className="flex items-start gap-2">
          <DateFilter onDateSelect={onDateChange} loadDate={filters.date} />
          {filters.tabIndex === 0 && (
            <LocationFilter
              selectedLocation={filters.location}
              onLocationChange={onLocationChange}
              locations={LOCATION_ITEMS}
            />
          )}
        </div>
        <SortFilter
          selectedSort={filters.sort}
          onSortChange={onSortChange}
          sortOptions={SORT_ITEMS.review}
        />
      </div>
    </div>
  );
}
