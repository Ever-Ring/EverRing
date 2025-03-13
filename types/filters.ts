export interface Filters {
  location: string | null;
  date: string | null;
  sortBy: string | null;
}

export interface FilterOptionsProps {
  selectedTabIndex: number;
  filters: Filters;
  setLocationFilter: (location: string | null) => void;
  setDateFilter: (date: string | null) => void;
  setSortBy: (sort: string | null) => void;
}

export interface ChipFilterGroupProps {
  subChips: { label: string; value: string }[];
  typeFilter: string | null;
  setTypeFilter: (value: string) => void;
}
