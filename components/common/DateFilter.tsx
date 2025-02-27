"use client";

import React, { useState, useEffect, useRef } from "react";
import { format } from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Button from "@components/common/Button";
import DropDefault from "@assets/icon-arrow-default-down.svg";
import DropInverse from "@assets/icon-arrow-inverse-down.svg";
import CalendarIcon from "@assets/calendar.svg";

/** 내부에서 사용하는 모달 Props */
interface DatePickerModalProps {
  tempDate: Date | null;
  onClose: () => void;
  onSelect: (date: Date | null) => void;
  onApply: () => void;
  onReset: () => void;
  showTimeSelect?: boolean;
}

/** 달력 + 시간 선택 모달 */
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

  // 날짜 포맷
  const dateFormat = showTimeSelect ? "yyyy-MM-dd HH:mm" : "yyyy-MM-dd";

  return (
    <div
      ref={modalRef}
      className="absolute left-0 z-50 mt-1 w-[340px] rounded-md border bg-white p-6 shadow-md"
    >
      <div className="flex flex-col items-center">
        <DatePicker
          selected={tempDate}
          onChange={(date) => {
            onSelect(date);
            // (선택 즉시 자동 적용하고 싶다면 showTimeSelect에 따라 처리 가능)
          }}
          dateFormat={dateFormat}
          inline
          showTimeSelect={showTimeSelect}
        />
      </div>

      {/* 항상 "초기화 / 적용" 버튼 표시 (showTimeSelect 여부 상관없이) */}
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
  /** 날짜가 최종 적용될 때 string(예: "2025-02-27 20:00")을 반환 */
  onDateSelect?: (date: string | undefined) => void;
  /** true면 "오른쪽 사진"(인풋 + 아이콘), false면 "왼쪽 사진"(기존 버튼) */
  showTimeSelect?: boolean;
}

/**
 * 하나의 컴포넌트에서 showTimeSelect 값에 따라
 * - false: "왼쪽 사진" (기존 버튼 스타일)
 * - true : "오른쪽 사진" (인풋 + 아이콘)
 */
export default function DateFilter({
  onDateSelect,
  showTimeSelect,
}: DateFilterProps) {
  const [appliedDate, setAppliedDate] = useState<Date | null>(null);
  const [tempDate, setTempDate] = useState<Date | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  /** 날짜 포맷 */
  const dateFormat = showTimeSelect ? "yyyy-MM-dd HH:mm" : "yyyy-MM-dd";

  /** 모달에서 날짜 선택 시 임시 상태 갱신 */
  const handleSelect = (date: Date | null) => {
    setTempDate(date);
  };

  /** "적용" 로직 */
  const handleApply = () => {
    setAppliedDate(tempDate);
    setIsOpen(false);

    if (onDateSelect) {
      const formatted = tempDate ? format(tempDate, dateFormat) : undefined;
      onDateSelect(formatted);
    }
  };

  /** "초기화" 로직 */
  const handleReset = () => {
    setTempDate(null);
    setAppliedDate(null);
    setIsOpen(false);

    if (onDateSelect) {
      onDateSelect(undefined);
    }
  };

  /** 모달 열기 */
  const openModal = () => {
    setTempDate(appliedDate);
    setIsOpen(true);
  };

  // 공통으로 표시할 최종 날짜 문자열
  const displayValue = appliedDate ? format(appliedDate, dateFormat) : "";

  // --------------------------------------------------
  // 1) showTimeSelect = false → 기존(왼쪽 사진) 버튼 스타일
  // --------------------------------------------------
  if (!showTimeSelect) {
    return (
      <div className="relative inline-block">
        {/* 기존 버튼 스타일 */}
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

        {/* 모달 표시 */}
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

  // --------------------------------------------------
  // 2) showTimeSelect = true → 오른쪽 사진 (인풋 + 달력 아이콘)
  // --------------------------------------------------
  return (
    <div className="relative inline-block">
      {/* 모달 */}
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

      {/* 인풋 + 아이콘 (absolute) */}
      <div className="relative">
        {/* 읽기 전용 인풋 */}
        <input
          readOnly
          value={displayValue}
          placeholder="날짜를 선택해주세요."
          onClick={openModal}
          // 오른쪽 아이콘과 겹치지 않도록 pr-10 (패딩)
          className="h-9 w-[10rem] rounded-lg border-2 border-gray-100 bg-white px-3 py-[0.375rem] pr-10 text-sm font-medium text-gray-900 focus:outline-none md:h-10 md:w-[12rem]"
        />
        {/* 달력 아이콘 버튼 (absolute) */}
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
