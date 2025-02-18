import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import "../../app/globals.css";
import Button from "@components/common/Button";

interface DateFilterProps {
  onDateSelect?: (date: string | undefined) => void;
}

export default function DateFilter({ onDateSelect }: DateFilterProps) {
  const [appliedDate, setAppliedDate] = useState<Date | null>(null);
  const [tempDate, setTempDate] = useState<Date | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (date: Date | null) => {
    setTempDate(date);
  };

  // 적용 버튼: 임시 선택 날짜를 적용하고 모달 닫기
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

  // 초기화 버튼: 날짜 초기화 후 모달 닫기
  const handleReset = () => {
    setTempDate(null);
    setAppliedDate(null);
    setIsOpen(false);
    if (onDateSelect) onDateSelect(undefined);
  };

  return (
    <div className="relative inline-block">
      <button
        type="button"
        onClick={() => {
          setTempDate(appliedDate);
          setIsOpen(true);
        }}
        className={`content-box inline-flex h-9 w-[8rem] items-center justify-between rounded-lg border-2 px-3 py-[0.375rem] text-sm transition md:h-10 md:w-[9rem] ${
          appliedDate
            ? "border-black bg-gray-900 text-white"
            : "border-gray-100 bg-white text-gray-900"
        }`}
      >
        {appliedDate ? format(appliedDate, "yyyy-MM-dd") : "날짜전체"}
      </button>

      {isOpen && (
        <div className="absolute left-[-60%] z-50 mt-1 w-[340px] rounded-md border bg-white p-6 shadow-md md:left-0">
          <div className="flex flex-col items-center">
            <DatePicker
              selected={tempDate}
              onChange={handleSelect}
              dateFormat="yyyy-MM-dd"
              inline
            />
          </div>

          <div className="mt-4 flex justify-between px-2">
            <Button
              size="small"
              text="초기화"
              onClick={handleReset}
              variant="outlined"
            />
            <Button size="small" text="적용" onClick={handleApply} />
          </div>
        </div>
      )}
    </div>
  );
}
