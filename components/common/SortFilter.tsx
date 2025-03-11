import SortDefault from "@assets/icon-sort-default.svg";
import SortInverse from "@assets/icon-sort-inverse.svg";
import { useCallback, useState } from "react";
import DropDown from "@components/common/DropDown";

interface SortFilterProps {
  selectedSort: string | null;
  onSortChange: (selected: string | null) => void;
  sortOptions: string[];
}

export default function SortFilter({
  selectedSort,
  onSortChange,
  sortOptions,
}: SortFilterProps) {
  const [isOpen, setIsOpen] = useState(false);

  const isSelected = !!selectedSort && selectedSort !== "정렬";

  const handleSelect = useCallback(
    (selected: string) => {
      onSortChange(selected === "정렬" ? null : selected);
      setIsOpen(false);
    },
    [onSortChange],
  );

  return (
    <div>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="정렬 필터"
        className={`${
          !isSelected
            ? "border-gray-100 bg-white text-gray-900"
            : "border-black bg-gray-900 text-white"
        } inline-flex h-9 w-10 items-center justify-between gap-1 rounded-lg border-2 p-[0.375rem] text-sm font-medium transition md:h-10 md:w-fit md:min-w-[7.5rem] md:px-3 md:py-2`}
      >
        {!isSelected ? <SortDefault /> : <SortInverse />}

        <div className="hidden whitespace-nowrap md:block">
          {selectedSort || "정렬"}
        </div>
      </button>
      <DropDown
        items={sortOptions}
        onSelect={handleSelect}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        selectedItem={selectedSort}
        variant="outlined"
        textSize="small"
      />
    </div>
  );
}
