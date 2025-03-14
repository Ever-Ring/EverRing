"use client";

import Chip from "@components/common/Chip";
import { ChipFilterGroupProps } from "@customTypes/filters";

export default function ChipFilterGroup({
  subChips,
  typeFilter,
  setTypeFilter,
}: ChipFilterGroupProps) {
  return (
    <div className="flex justify-start gap-2">
      {subChips.map((chip) => (
        <Chip
          key={chip.value}
          label={chip.label}
          selected={typeFilter === chip.value}
          onClick={() => setTypeFilter(chip.value)}
        />
      ))}
    </div>
  );
}
