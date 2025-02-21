/* eslint-disable react/require-default-props */
import React, { useEffect, useRef } from "react";
import DropDownItems from "@components/common/DropDownItems";

interface DropDownProps {
  items: string[];
  onSelect: (item: string) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  selectedItem?: string | null;
  variant?: "solid" | "outlined";
  textSize?: "large" | "small";
}

function DropDown({
  items,
  onSelect,
  isOpen,
  setIsOpen,
  selectedItem = null,
  variant = "solid",
  textSize = "large",
}: DropDownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, setIsOpen]);
  return (
    <div className="relative" ref={dropdownRef}>
      {isOpen && items.length > 0 && (
        <ul
          className={`absolute right-0 z-50 mt-1 ${
            variant === "solid" ? "w-[472px]" : "w-[120px]"
          } rounded-md border bg-white shadow-md`}
        >
          {items.map((item) => (
            <DropDownItems
              key={item}
              item={item}
              isSelected={selectedItem === item}
              onSelect={(selected) => {
                onSelect(selected);
                if (isOpen) setIsOpen(false);
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
