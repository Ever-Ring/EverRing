/* eslint-disable react/require-default-props */
import React, { useState } from "react";
import Image from "next/image";
import DropDownList from "@components/common/DropDownList";
import ArrowIcon from "@assets/icon-arrow-default-down.svg";

const fixedItemsList = ["을지로 3가", "홍대입구", "강남역", "건대입구"];

interface DropDownProps {
  onSelect: (item: string) => void;
}

function DropDown({ onSelect }: DropDownProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="text-gray-500 hover:text-gray-700"
      >
        <Image
          src={ArrowIcon}
          alt="Toggle Dropdown"
          className={`w-5 h-5 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      {isOpen && (
        <ul className="absolute left-0 mt-1 w-[200px] bg-white rounded-md shadow-md border">
          {fixedItemsList.map((item) => (
            <DropDownList
              key={item}
              item={item}
              isSelected={false}
              onSelect={() => {
                onSelect(item);
                setIsOpen(false);
              }}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

export default DropDown;
