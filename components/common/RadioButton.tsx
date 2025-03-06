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
      subLabelDesktop: "에버 스트레칭",
      subLabelMobile: (
        <>
          에버
          <br />
          스트레칭
        </>
      ),
      value: "OFFICE_STRETCHING",
    },
    {
      label: "나무링",
      subLabelDesktop: "에버 푸드트립",
      subLabelMobile: (
        <>
          에버
          <br />
          푸드트립
        </>
      ),
      value: "MINDFULNESS",
    },
    {
      label: "구름링",
      subLabelDesktop: "",
      subLabelMobile: "",
      value: "WORKATION",
    },
  ];

  return (
    <div>
      <span className="mb-1 block text-sm font-semibold text-gray-900">
        선택 서비스
      </span>
      <div className="flex items-center gap-2 md:gap-3">
        {options.map((option, idx) => {
          const inputId = `radio-option-${idx}`;
          const isSelected = selectedType === option.value;

          return (
            <div
              key={inputId}
              className={`relative flex h-[76px] cursor-pointer rounded-xl px-4 py-3 ${
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
                  <span className="text-sm font-semibold md:text-base">
                    {option.label}
                  </span>
                  {option.subLabelDesktop ? (
                    <>
                      <span className="mt-0.5 hidden text-xs leading-tight sm:inline">
                        {option.subLabelDesktop}
                      </span>
                      <span className="mt-0.5 block text-xs leading-tight sm:hidden">
                        {option.subLabelMobile}
                      </span>
                    </>
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
