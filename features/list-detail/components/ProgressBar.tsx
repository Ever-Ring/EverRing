"use client";

import React from "react";

interface ProgressBarProps {
  progress: number;
  currentCount: number;
  maxCount: number;
}

export default function ProgressBar({
  progress,
  currentCount,
  maxCount,
}: ProgressBarProps) {
  return (
    <>
      <div className="relative h-2 w-full overflow-hidden rounded-full bg-gray-100">
        <div
          role="progressbar"
          aria-label={`Progress: ${progress}%`}
          className="absolute left-0 top-0 h-full bg-mint-500 transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="flex justify-between text-xs font-medium text-gray-500">
        <span>최소인원 5명</span>
        <span
          className={`text-xs font-medium ${currentCount === maxCount ? "text-mint-400" : "text-gray-700"}`}
        >
          최대인원 {maxCount}명
        </span>
      </div>
    </>
  );
}
