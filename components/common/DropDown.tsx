/* eslint-disable react/require-default-props */
import React, { useState } from "react";
import DropDownList from "@components/common/DropDownList";
import ArrowIcon from "@assets/icon-arrow-default-down.svg";

const fixedItemsList = ["을지로 3가", "홍대입구", "강남역", "건대입구"];

interface DropDownProps {
  onSelect: (item: string) => void;
  size?: "large" | "small";
}

function DropDown({ onSelect, size = "large" }: DropDownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

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
        <ul
          className={`absolute left-0 mt-1 ${
            size === "large" ? "w-[472px]" : "w-[110px]"
          } bg-white rounded-md shadow-md border`}
        >
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
              size={size}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

export default DropDown;
