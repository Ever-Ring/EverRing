"use client";

import { ExpiredFilterCheckboxProps } from "@customTypes/filters";
import { IMAGES } from "@constants/gathering";
import Image from "next/image";

export default function ExpiredFilterCheckbox({
  showExpired,
  setShowExpired,
}: ExpiredFilterCheckboxProps) {
  return (
    <div
      className="mt-7 flex cursor-pointer items-center gap-1"
      onClick={() => setShowExpired((prev) => !prev)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") setShowExpired((prev) => !prev);
      }}
    >
      <Image
        alt="checkbox"
        src={showExpired ? IMAGES.CHECKBOX : IMAGES.DEFAULT_CHECKBOX}
        width={24}
        height={24}
      />
      <span className="text-sm font-medium">마감 포함</span>
    </div>
  );
}
