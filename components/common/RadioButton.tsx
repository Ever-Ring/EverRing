import React from "react";
import CheckBoxDefault from "@assets/icon-checkbox-default.svg";
import CheckBoxActive from "@assets/icon-checkbox-active.svg";

interface RadioButtonProps {
  selectedType: string;
  onChange: (value: string) => void;
}

export default function RadioButton({
  selectedType,
  onChange,
}: RadioButtonProps) {
  const options = [
    {
      label: "나무링",
      subLabel: "에버 스트레칭",
      value: "OFFICE_STRETCHING",
    },
    {
      label: "나무링",
      subLabel: "에버 푸드트립",
      value: "MINDFULNESS",
    },
    {
      label: "구름링",
      subLabel: "",
      value: "WORKATION",
    },
  ];

  return (
    <div>
      <span className="mb-1 block text-sm font-semibold text-gray-900">
        선택 서비스
      </span>
      <div className="flex items-center gap-4">
        {options.map((option, idx) => {
          const inputId = `radio-option-${idx}`;
          const isSelected = selectedType === option.value;

          return (
            <div
              key={inputId}
              className={`relative flex cursor-pointer rounded-xl px-4 py-3 ${
                isSelected
                  ? "bg-gray-900 text-white"
                  : "bg-gray-50 text-gray-900"
              }`}
            >
              <input
                id={inputId}
                type="radio"
                name="type"
                value={option.value}
                checked={isSelected}
                onChange={(e) => onChange(e.target.value)}
                className="hidden"
              />

              <label htmlFor={inputId} className="flex items-start gap-2">
                {isSelected ? (
                  <CheckBoxActive className="h-6 w-6" />
                ) : (
                  <CheckBoxDefault className="h-6 w-6" />
                )}

                <div className="flex flex-col items-start text-left leading-tight">
                  <span className="text-base font-semibold">
                    {option.label}
                  </span>
                  {option.subLabel ? (
                    <span className="mt-0.5 text-xs">{option.subLabel}</span>
                  ) : (
                    <span className="mt-0.5 block h-[1em]" />
                  )}
                </div>
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
}
