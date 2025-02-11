/* eslint-disable react/require-default-props */
import React, { useState } from "react";
import DropDownList from "@components/common/DropDownList";
import ArrowIconDefault from "@assets/icon-arrow-default-down.svg";
import ArrowIconInverse from "@assets/icon-arrow-inverse-down.svg";

const fixedItemsList = [
  "지역 전체",
  "을지로 3가",
  "홍대입구",
  "강남역",
  "건대입구",
];

interface DropDownProps {
  onSelect: (item: string) => void;
  variant?: "solid" | "outlined";
  textSize?: "large" | "small";
  iconType?: "default" | "inverse";
}

function DropDown({
  onSelect,
  variant = "solid",
  textSize = "large",
  iconType = "default",
}: DropDownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const ArrowIcon =
    iconType === "default" ? ArrowIconDefault : ArrowIconInverse;

  const dropDownVariant =
    variant === "solid"
      ? "w-[472px] bg-white border border-gray-300 shadow-md"
      : "w-[110px] bg-transparent border border-gray-500";

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="text-gray-500 hover:text-gray-700 flex items-center"
      >
        <ArrowIcon className="w-5 h-5" />
      </button>
      {isOpen && (
        <ul className={`absolute left-0 mt-1 rounded-md ${dropDownVariant}`}>
          {fixedItemsList.map((item) => (
            <DropDownList
              key={item}
              item={item}
              isSelected={selectedItem === item}
              onSelect={(selected) => {
                setSelectedItem(selected);
                onSelect(selected);
                setIsOpen(false);
              }}
              textSize={textSize}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

export default DropDown;
