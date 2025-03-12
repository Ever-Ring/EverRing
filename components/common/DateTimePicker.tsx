"use client";

import React, { useRef, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DateTimeSelector from "@components/common/DateTimeSelector";
import useDateTimePicker from "@hooks/useDateTimePicker";

interface DateTimePickerProps {
  initialDate: Date | null;
  minDate?: Date;
  maxDate?: Date;
  onClose: () => void;
  onApply: (date: Date | null) => void;
  onReset: () => void;
  left: number;
  top: number;
}

export default function DateTimePicker({
  initialDate,
  minDate,
  maxDate,
  onClose,
  onApply,
  onReset,
  left,
  top,
}: DateTimePickerProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  const {
    selectedDate,
    currentHour12,
    currentAmPm,
    currentMinutes,
    handleDateChange,
    handleHourChange,
    handleMinuteChange,
    handleAmPmChange,
  } = useDateTimePicker({ initialDate, minDate, maxDate });

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const handleApply = () => onApply(selectedDate);
  const handleResetClick = () => onReset();

  return (
    <div
      ref={modalRef}
      style={{
        position: "fixed",
        left,
        top,
        maxWidth: "100%",
        zIndex: 9999,
      }}
      className="overflow-x-auto rounded-md border bg-white p-4 shadow-md"
    >
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="flex-1">
          <DatePicker
            inline
            selected={selectedDate}
            onChange={handleDateChange}
            showTimeSelect={false}
            minDate={minDate}
            maxDate={maxDate}
          />
        </div>

        <div className="flex flex-1 flex-col items-center">
          <DateTimeSelector
            currentHour12={currentHour12}
            currentAmPm={currentAmPm}
            currentMinutes={currentMinutes}
            onHourChange={handleHourChange}
            onMinuteChange={handleMinuteChange}
            onAmPmChange={handleAmPmChange}
          />
          <div className="mt-4 flex w-full justify-between px-4">
            <button
              type="button"
              className="rounded border px-3 py-1 text-sm hover:bg-gray-100"
              onClick={handleResetClick}
            >
              초기화
            </button>
            <button
              type="button"
              className="rounded bg-mint-600 px-3 py-1 text-sm text-white hover:bg-mint-500"
              onClick={handleApply}
            >
              적용
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
