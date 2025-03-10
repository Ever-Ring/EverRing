import { useCallback, useState } from "react";
import DropDown from "@components/common/DropDown";
import DropDefault from "@assets/icon-arrow-default-down.svg";
import DropInverse from "@assets/icon-arrow-inverse-down.svg";

interface LocationFilterProps {
  selectedLocation: string | null;
  onLocationChange: (selected: string | null) => void;
  locations: string[];
}

export default function LocationFilter({
  selectedLocation,
  onLocationChange,
  locations,
}: LocationFilterProps) {
  const [isOpen, setIsOpen] = useState(false);

  const SELECTED_LOCATIONS = ["건대입구", "을지로3가", "신림", "홍대입구"];

  const isSelected = selectedLocation
    ? SELECTED_LOCATIONS.includes(selectedLocation)
    : false;

  const handleSelect = useCallback(
    (selected: string) => {
      onLocationChange(selected === "지역전체" ? null : selected);
      setIsOpen(false);
    },
    [onLocationChange],
  );

  return (
    <div className="relative inline-block">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="지역 필터"
        className={`content-box inline-flex h-9 min-w-[6.875rem] items-center justify-between rounded-lg border-2 px-3 py-[0.375rem] text-sm font-medium transition md:h-10 md:min-w-[7.5rem] ${
          isSelected
            ? "border-black bg-gray-900 text-white"
            : "border-gray-100 bg-white text-gray-900"
        }`}
      >
        <div className="whitespace-nowrap">
          {selectedLocation || "지역전체"}
        </div>
        {isSelected ? <DropInverse /> : <DropDefault />}
      </button>

      {isOpen && (
        <DropDown
          items={locations}
          onSelect={(selected) => {
            handleSelect(selected);
          }}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          selectedItem={selectedLocation}
          variant="outlined"
          textSize="small"
        />
      )}
    </div>
  );
}
