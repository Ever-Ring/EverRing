import { useState } from "react";
import DropDown from "@components/common/DropDown";
import DropDefault from "@assets/icon-arrow-default-down.svg";
import DropInverse from "@assets/icon-arrow-inverse-down.svg";

interface LocationFilterProbs {
  onLocationChange?: (selected: string) => void;
}

export default function LocationFilter({
  onLocationChange,
}: LocationFilterProbs) {
  const items = ["지역전체", "건대입구", "을지로3가", "신림", "홍대입구"];

  const [isOpen, setIsOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<string>(items[0]);
  const handleSelect = (selected: string) => {
    setSelectedLocation(selected);
    setIsOpen(false);
    if (onLocationChange) {
      onLocationChange(selected);
    }
  };

  return (
    <div>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="지역 필터"
        className={`content-box inline-flex h-9 min-w-[6.875rem] items-center justify-between rounded-lg border-2 border-gray-100 px-3 py-[0.375rem] text-sm font-medium transition md:h-10 md:min-w-[7.5rem] ${selectedLocation === items[0] ? "border-gray-100 bg-white text-gray-900" : "border-black bg-gray-900 text-white"} `}
      >
        <div className="whitespace-nowrap">{selectedLocation}</div>
        {selectedLocation === items[0] ? <DropDefault /> : <DropInverse />}
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
