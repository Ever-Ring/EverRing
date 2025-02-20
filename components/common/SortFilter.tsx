import SortDefault from "@assets/icon-sort-default.svg";
import SortInverse from "@assets/icon-sort-inverse.svg";
import { useState } from "react";
import DropDown from "@components/common/DropDown";

interface SortFilterProps {
  onSortChange?: (selected: string) => void;
  variant?: "list" | "review";
}

export default function SortFilter({
  onSortChange,
  variant = "review",
}: SortFilterProps) {
  const itemsMap = {
    list: ["정렬", "최신순", "마감 임박", "참여 인원순"],
    review: ["정렬", "최신순", "평점 높은순", "참여 인원순"],
  };

  const items = itemsMap[variant];

  const [isOpen, setIsOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(
    items[0],
  );
  const handleSelect = (selected: string) => {
    setSelectedLocation(selected);
    setIsOpen(false);
    if (onSortChange) {
      onSortChange(selected);
    }
  };

  return (
    <div>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="정렬 필터"
        className={`${selectedLocation === "정렬" ? "border-gray-100 bg-white text-gray-900" : "border-black bg-gray-900 text-white"} inline-flex h-9 w-10 items-center justify-between gap-1 rounded-lg border-2 p-[0.375rem] text-sm font-medium transition md:h-10 md:w-fit md:min-w-[7.5rem] md:px-3 md:py-2`}
      >
        {selectedLocation === "정렬" ? <SortDefault /> : <SortInverse />}

        <div className="hidden whitespace-nowrap md:block">
          {selectedLocation}
        </div>
      </button>
      <DropDown
        items={items}
        onSelect={handleSelect}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        selectedItem={selectedLocation}
        variant="outlined"
        textSize="small"
      />
    </div>
  );
}
