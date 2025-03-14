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
  sortBy: string | null;
}

export interface ChipFilterGroupProps {
  subChips: { label: string; value: string }[];
  typeFilter: string | null;
  setTypeFilter: (value: string) => void;
}

export interface ExpiredFilterCheckboxProps {
  showExpired: boolean;
  setShowExpired: React.Dispatch<React.SetStateAction<boolean>>;
}
