/* eslint-disable react/require-default-props */
import React from "react";
import classNames from "classnames";

interface DropDownItemsProps {
  item: string;
  isSelected: boolean;
  onSelect: (item: string) => void;
  textSize?: "large" | "small";
}

function DropDownItems({
  item,
  isSelected = false,
  onSelect,
  textSize = "large",
}: DropDownItemsProps) {
  return (
    <li>
      <button
        type="button"
        onClick={() => onSelect(item)}
        className={classNames(
          "flex w-full items-center px-4 py-2 text-left font-medium text-gray-800 hover:bg-gray-200",
          {
            "text-base": textSize === "large",
            "text-sm": textSize === "small",
            "rounded-xl bg-mint-100": isSelected,
          },
        )}
      >
        {item}
      </button>
    </li>
  );
}

export default DropDownItems;
