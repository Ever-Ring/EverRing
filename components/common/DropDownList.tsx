/* eslint-disable react/require-default-props */
import React from "react";
import classNames from "classnames";

interface DropDownListProps {
  item: string;
  isSelected: boolean;
  onSelect: () => void;
}

function DropDownList({ item, isSelected, onSelect }: DropDownListProps) {
  return (
    <li>
      <button
        type="button"
        onClick={onSelect}
        className={classNames(
          "w-full flex items-center px-4 py-2 text-gray-800 font-medium text-left hover:bg-gray-200",
          { "bg-mint-100 rounded-xl": isSelected },
        )}
      >
        {item}
      </button>
    </li>
  );
}

export default DropDownList;
