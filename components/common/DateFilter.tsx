"use client";

import React, { useState, useEffect, useRef } from "react";
import { format } from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Button from "@components/common/Button";
import DropDefault from "@assets/icon-arrow-default-down.svg";
import DropInverse from "@assets/icon-arrow-inverse-down.svg";
import CalendarIcon from "@assets/calendar.svg";

interface DatePickerModalProps {
  tempDate: Date | null;
  onClose: () => void;
  onSelect: (date: Date | null) => void;
  onApply: () => void;
  onReset: () => void;
  showTimeSelect?: boolean;
}

function DatePickerModal({
  tempDate,
  onClose,
  onSelect,
  onApply,
  onReset,
  showTimeSelect,
}: DatePickerModalProps) {
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const dateFormat = showTimeSelect ? "yyyy-MM-dd HH:mm" : "yyyy-MM-dd";

  return (
    <div
      ref={modalRef}
      className={`absolute left-0 z-50 w-[340px] rounded-md border bg-white p-6 shadow-md ${
        showTimeSelect ? "bottom-full mb-2" : "top-full mt-1"
      }`}
    >
      <div className="flex flex-col items-center">
        <DatePicker
          selected={tempDate}
          onChange={(date) => {
            onSelect(date);
          }}
          dateFormat={dateFormat}
          inline
          showTimeSelect={showTimeSelect}
        />
      </div>

      <div className="mt-4 flex justify-between px-2">
        <Button
          size="small"
          text="초기화"
          onClick={onReset}
          variant="outlined"
        />
        <Button size="small" text="적용" onClick={onApply} />
      </div>
    </div>
  );
}

interface DateFilterProps {
  onDateSelect?: (date: string | undefined) => void;
  showTimeSelect?: boolean;
}

export default function DateFilter({
  onDateSelect,
  showTimeSelect,
}: DateFilterProps) {
  const [appliedDate, setAppliedDate] = useState<Date | null>(null);
  const [tempDate, setTempDate] = useState<Date | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (date: Date | null) => {
    setTempDate(date);
  };

  const handleApply = () => {
    if (!tempDate) {
      setAppliedDate(null);
      setIsOpen(false);
      onDateSelect?.(undefined);
      return;
    }

    const utcDate = showTimeSelect
      ? new Date(tempDate.getTime() - 9 * 60 * 60 * 1000)
      : tempDate;
    const formatted = format(
      utcDate,
      showTimeSelect ? "yyyy-MM-dd'T'HH:mm'Z'" : "yyyy-MM-dd",
    );

    console.log("formatted", formatted);

    setAppliedDate(tempDate);
    setIsOpen(false);
    onDateSelect?.(formatted);
  };

  const getDisplayValue = () => {
    if (!appliedDate) return "";
    if (showTimeSelect) {
      const utcDate = new Date(appliedDate.getTime() - 9 * 60 * 60 * 1000);
      return format(utcDate, "yyyy-MM-dd HH:mm");
    }
    return format(appliedDate, "yyyy-MM-dd");
  };

  const displayValue = getDisplayValue();

  const handleReset = () => {
    setTempDate(null);
    setAppliedDate(null);
    setIsOpen(false);

    if (onDateSelect) {
      onDateSelect(undefined);
    }
  };

  const openModal = () => {
    setTempDate(appliedDate);
    setIsOpen(true);
  };

  if (!showTimeSelect) {
    return (
      <div className="relative inline-block">
        <button
          type="button"
          onClick={openModal}
          className={`content-box inline-flex h-9 min-w-[6.875rem] items-center justify-between rounded-lg border-2 border-gray-100 px-3 py-[0.375rem] text-sm font-medium transition md:h-10 md:min-w-[7.5rem] ${appliedDate ? "border-black bg-gray-900 text-white" : "border-gray-100 bg-white text-gray-900"} `}
        >
          {displayValue || "날짜전체"}
          {appliedDate ? (
            <DropInverse className="h-6 w-6" />
          ) : (
            <DropDefault className="h-6 w-6" />
          )}
        </button>

        {isOpen && (
          <DatePickerModal
            tempDate={tempDate}
            onClose={() => setIsOpen(false)}
            onSelect={handleSelect}
            onApply={handleApply}
            onReset={handleReset}
            showTimeSelect={false}
          />
        )}
      </div>
    );
  }

  return (
    <div className="relative inline-block">
      {isOpen && (
        <DatePickerModal
          tempDate={tempDate}
          onClose={() => setIsOpen(false)}
          onSelect={handleSelect}
          onApply={handleApply}
          onReset={handleReset}
          showTimeSelect
        />
      )}

      <div className="relative">
        <input
          readOnly
          value={displayValue}
          placeholder="날짜를 선택해주세요."
          onClick={openModal}
          className="h-9 w-[12rem] rounded-lg border-2 border-gray-100 bg-white px-3 py-[0.375rem] pr-10 text-sm font-medium text-gray-900 focus:outline-none md:h-10"
        />
        <button
          type="button"
          onClick={openModal}
          className="absolute right-2 top-1/2 flex h-6 w-6 -translate-y-1/2 transform items-center justify-center rounded bg-transparent text-gray-900 hover:bg-gray-100"
        >
          <CalendarIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
