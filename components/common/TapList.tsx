"use client";

import { useState, useRef, useEffect } from "react";
import TapItem from "@components/common/TapItem";

interface TabListProps {
  tabs: string[];
  hasIcon?: boolean;
}

export default function TapList({ tabs, hasIcon }: TabListProps) {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [tabWidths, setTabWidths] = useState<number[]>([]);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const widths = tabRefs.current.map((tab) => tab?.offsetWidth || 0);
    setTabWidths(widths);
  }, [tabs]);

  const handleTabItemClick = (index: number) => {
    setSelectedIndex(index);
  };

  return (
    <div className="flex flex-col items-start">
      <div className="flex flex-row items-start gap-3">
        {tabs.map((tab, index) => (
          <TapItem
            ref={(el) => {
              tabRefs.current[index] = el;
            }}
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            title={tab}
            hasIcon={hasIcon}
            isSelected={selectedIndex === index}
            onClick={() => handleTabItemClick(index)}
          />
        ))}
      </div>
      <div
        className="h-[2px] rounded-md bg-black transition-all duration-300 ease-in-out"
        style={{
          width: `${tabWidths[selectedIndex]}px`,
          transform: `translateX(${tabWidths.slice(0, selectedIndex).reduce((acc, width) => acc + width, 0) + selectedIndex * 12}px)`, // (이전 탭들의 너비+gap)만큼 이동
        }}
      />
    </div>
  );
}

TapList.defaultProps = {
  hasIcon: false,
};
