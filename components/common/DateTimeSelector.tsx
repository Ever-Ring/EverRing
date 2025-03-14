"use client";

import React from "react";

const HOUR_OPTIONS = Array.from({ length: 12 }, (_, i) => i + 1);
const MINUTE_OPTIONS = Array.from({ length: 12 }, (_, i) => i * 5);
const AMPM_OPTIONS = ["AM", "PM"] as const;

interface DateTimeSelectorProps {
  currentHour12: number;
  currentAmPm: "AM" | "PM";
  currentMinutes: number;
  onHourChange: (hour12: number) => void;
  onMinuteChange: (minute: number) => void;
  onAmPmChange: (ampm: "AM" | "PM") => void;
}

export default function DateTimeSelector({
  currentHour12,
  currentAmPm,
  currentMinutes,
  onHourChange,
  onMinuteChange,
  onAmPmChange,
}: DateTimeSelectorProps) {
  return (
    <div className="ml-4 flex flex-col items-center">
      <div className="flex space-x-4">
        <div className="hidescrollbar h-48 w-12 overflow-y-auto border-r pr-2">
          {HOUR_OPTIONS.map((h) => (
            <button
              type="button"
              key={h}
              onClick={() => onHourChange(h)}
              className={`p-1 text-center transition ${
                h === currentHour12
                  ? "rounded bg-mint-500 font-bold text-white"
                  : "hover:bg-mint-100"
              }`}
            >
              {String(h).padStart(2, "0")}
            </button>
          ))}
        </div>

        <div className="hidescrollbar h-48 w-12 overflow-y-auto border-r pr-2">
          {MINUTE_OPTIONS.map((m) => (
            <button
              type="button"
              key={m}
              onClick={() => onMinuteChange(m)}
              className={`p-1 text-center transition ${
                m === currentMinutes
                  ? "rounded bg-mint-500 font-bold text-white"
                  : "hover:bg-mint-100"
              }`}
            >
              {String(m).padStart(2, "0")}
            </button>
          ))}
        </div>

        <div className="h-48 w-12 overflow-y-auto">
          {AMPM_OPTIONS.map((ampm) => (
            <button
              type="button"
              key={ampm}
              onClick={() => onAmPmChange(ampm)}
              className={`p-1 text-center transition ${
                ampm === currentAmPm
                  ? "rounded bg-mint-500 font-bold text-white"
                  : "hover:bg-mint-100"
              }`}
            >
              {ampm}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
