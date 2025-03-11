"use client";

import React, { useRef, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const HOUR_OPTIONS = Array.from({ length: 12 }, (_, i) => i + 1);
const MINUTE_OPTIONS = Array.from({ length: 12 }, (_, i) => i * 5);
const AMPM_OPTIONS = ["AM", "PM"];

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
  const [selectedDate, setSelectedDate] = useState<Date>(() => {
    return initialDate || new Date();
  });

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const currentHours = selectedDate.getHours();
  const currentHour12 = currentHours % 12 || 12;
  const currentAmPm = currentHours >= 12 ? "PM" : "AM";
  const currentMinutes = selectedDate.getMinutes();

  const handleDateChange = (date: Date | null) => {
    if (!date) return;
    const newDate = new Date(selectedDate);
    newDate.setFullYear(date.getFullYear(), date.getMonth(), date.getDate());

    if (minDate && newDate < minDate) return;
    if (maxDate && newDate > maxDate) return;

    setSelectedDate(newDate);
  };

  const handleHourChange = (hour12: number) => {
    const newDate = new Date(selectedDate);
    let newHour24 = hour12;
    if (currentAmPm === "PM" && hour12 < 12) {
      newHour24 = hour12 + 12;
    }
    if (currentAmPm === "AM" && hour12 === 12) {
      newHour24 = 0;
    }
    newDate.setHours(newHour24);

    if (minDate && newDate < minDate) {
      return;
    }
    if (maxDate && newDate > maxDate) {
      return;
    }

    setSelectedDate(newDate);
  };

  const handleMinuteChange = (m: number) => {
    const newDate = new Date(selectedDate);
    newDate.setMinutes(m);

    if (minDate && newDate < minDate) return;
    if (maxDate && newDate > maxDate) return;

    setSelectedDate(newDate);
  };

  const handleAmPmChange = (ampm: "AM" | "PM") => {
    const newDate = new Date(selectedDate);
    let hour24 = currentHour12;
    if (ampm === "PM" && currentHour12 < 12) {
      hour24 = currentHour12 + 12;
    }
    if (ampm === "AM" && currentHour12 === 12) {
      hour24 = 0;
    }
    newDate.setHours(hour24);

    if (minDate && newDate < minDate) return;
    if (maxDate && newDate > maxDate) return;

    setSelectedDate(newDate);
  };

  const handleApply = () => {
    onApply(selectedDate);
  };

  const handleResetClick = () => {
    onReset();
  };

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
      <div className="flex overflow-x-auto">
        <div className="react-datepicker-wrapper">
          <DatePicker
            inline
            selected={selectedDate}
            onChange={handleDateChange}
            showTimeSelect={false}
            minDate={minDate}
            maxDate={maxDate}
          />
        </div>

        <div className="ml-4 flex flex-col items-center">
          <div className="flex space-x-4">
            <div className="hidescrollbar h-48 w-12 overflow-y-auto border-r pr-2">
              {HOUR_OPTIONS.map((h) => (
                <button
                  type="button"
                  key={h}
                  onClick={() => handleHourChange(h)}
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
                  onClick={() => handleMinuteChange(m)}
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
                  onClick={() => handleAmPmChange(ampm as "AM" | "PM")}
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

          <div className="mt-4 flex w-full justify-between">
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
