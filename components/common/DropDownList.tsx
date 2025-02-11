/* eslint-disable react/require-default-props */
import React from "react";
import classNames from "classnames";

interface DropDownListProps {
  item: string;
  isSelected: boolean;
  onSelect: (item: string) => void;
  textSize?: "large" | "small";
}

function DropDownList({
  item,
  isSelected = false,
  onSelect,
  textSize = "large",
}: DropDownListProps) {
  return (
    <li>
      <button
        type="button"
        onClick={() => onSelect(item)}
        className={classNames(
          "w-full flex items-center px-4 py-2 text-gray-800 font-medium text-left hover:bg-gray-200",
          {
            "text-base": textSize === "large",
            "text-sm": textSize === "small",
            "bg-mint-100 rounded-xl": isSelected,
          },
        )}
      >
        {item}
      </button>
    </li>
  );
}

export default DropDownList;
