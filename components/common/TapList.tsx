"use client";

import { useState } from "react";
import TapItem from "@components/common/TapItem";

interface TabListProps {
  tabs: string[];
  hasIcon?: boolean;
}

export default function TapList({ tabs, hasIcon }: TabListProps) {
  const [selectedIndex, setSelectedIndex] = useState<number>(0); // 기본적으로 첫 번째 탭이 선택되도록 설정

  const handleTabItemClick = (index: number) => {
    setSelectedIndex(index);
  };
  return (
    <div className="flex flex-row items-start gap-3">
      {tabs.map((tab, index) => (
        <TapItem
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          title={tab}
          hasIcon={hasIcon}
          isSelected={selectedIndex === index}
          onClick={() => handleTabItemClick(index)}
        />
      ))}
    </div>
  );
}

TapList.defaultProps = {
  hasIcon: false,
};
