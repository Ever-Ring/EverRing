import { useState, useRef, useEffect } from "react";
import { format } from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Button from "@components/common/Button";
import DropDefault from "@assets/icon-arrow-default-down.svg";
import DropInverse from "@assets/icon-arrow-inverse-down.svg";

interface DatePickerModalProps {
  tempDate: Date | null;
  onClose: () => void;
  onSelect: (date: Date | null) => void;
  onApply: () => void;
  onReset: () => void;
}

// 모달 컴포넌트
function DatePickerModal({
  tempDate,
  onClose,
  onSelect,
  onApply,
  onReset,
}: DatePickerModalProps) {
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  return (
    <div
      ref={modalRef}
      className="absolute left-[-60%] z-50 mt-1 w-[340px] rounded-md border bg-white p-6 shadow-md md:left-0"
    >
      <div className="flex flex-col items-center">
        <DatePicker
          selected={tempDate}
          onChange={onSelect}
          dateFormat="yyyy-MM-dd"
          inline
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
}

export default function DateFilter({ onDateSelect }: DateFilterProps) {
  const [appliedDate, setAppliedDate] = useState<Date | null>(null);
  const [tempDate, setTempDate] = useState<Date | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (date: Date | null) => setTempDate(date);

  const handleApply = () => {
    setAppliedDate(tempDate);
    setIsOpen(false);
    if (onDateSelect) {
      const formattedDate = tempDate
        ? format(tempDate, "yyyy-MM-dd")
        : undefined;
      onDateSelect(formattedDate);
    }
  };

  const handleReset = () => {
    setTempDate(null);
    setAppliedDate(null);
    setIsOpen(false);
    if (onDateSelect) onDateSelect(undefined);
  };

  return (
    <div className="relative inline-block">
      {/* 필터 버튼 */}
      <button
        type="button"
        onClick={() => {
          setTempDate(appliedDate);
          setIsOpen(true);
        }}
        className={`content-box inline-flex h-9 min-w-[6.875rem] items-center justify-between rounded-lg border-2 border-gray-100 px-3 py-[0.375rem] text-sm font-medium transition md:h-10 md:min-w-[7.5rem] ${
          appliedDate
            ? "border-black bg-gray-900 text-white"
            : "border-gray-100 bg-white text-gray-900"
        }`}
      >
        {appliedDate ? format(appliedDate, "yyyy-MM-dd") : "날짜전체"}
        {appliedDate ? (
          <DropInverse className="h-6 w-6" />
        ) : (
          <DropDefault className="h-6 w-6" />
        )}
      </button>

      {/* 모달 렌더링 */}
      {isOpen && (
        <DatePickerModal
          tempDate={tempDate}
          onClose={() => setIsOpen(false)}
          onSelect={handleSelect}
          onApply={handleApply}
          onReset={handleReset}
        />
      )}
    </div>
  );
}
