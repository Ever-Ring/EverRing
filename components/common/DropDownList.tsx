import React from "react";
import classNames from "classnames";

interface DropDownListProps {
  items: string[];
  selectedItem: string | null;
  onSelect: (item: string) => void;
}

function DropDownList({ items, selectedItem, onSelect }: DropDownListProps) {
  return (
    <ul className="w-[472px] bg-gray-50 rounded-md shadow-md">
      {items.map((item) => (
        <li key={item}>
          <button
            type="button"
            tabIndex={0}
            onClick={() => onSelect(item)} // ✅ 화살표 함수로 변경
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                onSelect(item);
              }
            }}
            className={classNames(
              "w-full flex items-center gap-2.5 px-4 py-2 text-gray-800 font-pretendard font-medium text-left",
              {
                "bg-gray-200 hover:bg-gray-200": selectedItem !== item,
                "bg-mint-100 rounded-xl": selectedItem === item,
              },
            )}
          >
            {item}
          </button>
        </li>
      ))}
    </ul>
  );
}

export default DropDownList;
