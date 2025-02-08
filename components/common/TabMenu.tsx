"use client";

import { useState, useRef, useEffect } from "react";
import TabItem from "@components/common/TabItem";

interface Tab {
  label: string;
  title: string;
}

interface TabMenuProps {
  tabs: Tab[];
  selectedIndex: number;
  hasIcon?: boolean;
  onSelect: (index: number) => void;
}

export default function TabMenu({
  tabs,
  selectedIndex,
  hasIcon,
  onSelect,
}: TabMenuProps) {
  const [tabWidths, setTabWidths] = useState<number[]>([]);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const widths = tabRefs.current.map((tab) => tab?.offsetWidth || 0);
    setTabWidths(widths);
  }, [tabs]);

  return (
    <div className="flex flex-col items-start">
      <div className="flex flex-row items-start gap-3">
        {tabs.map((tab, index) => (
          <TabItem
            ref={(el) => {
              tabRefs.current[index] = el;
            }}
            key={tab.label}
            title={tab.title}
            label={tab.label}
            hasIcon={hasIcon}
            isSelected={selectedIndex === index}
            onClick={() => onSelect(index)}
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

TabMenu.defaultProps = {
  hasIcon: false,
};
