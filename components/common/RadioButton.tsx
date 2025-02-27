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
    { label: "달램핏", subLabel: "오피스 스트레칭" },
    { label: "달램핏", subLabel: "마인드풀니스" },
    { label: "워케이션", subLabel: "" },
  ];

  return (
    <div>
      <span className="mb-1 block text-sm font-semibold text-gray-900">
        선택 서비스
      </span>
      <div className="flex items-center gap-4">
        {options.map((option, idx) => {
          const inputId = `radio-option-${idx}`;
          const isSelected = selectedType === option.subLabel;

          return (
            <div
              key={option.subLabel}
              className={`relative flex cursor-pointer rounded-xl px-4 py-3 ${isSelected ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"} `}
            >
              {/* 숨겨진 라디오 버튼 */}
              <input
                id={inputId}
                type="radio"
                name="type"
                value={option.subLabel}
                checked={isSelected}
                onChange={(e) => onChange(e.target.value)}
                className="hidden"
              />

              {/* 라벨 */}
              <label
                htmlFor={inputId}
                // 아이콘+텍스트를 가로로 배치, 왼쪽 정렬
                className="flex items-start gap-2"
              >
                {/* 체크 아이콘 */}
                {isSelected ? (
                  <CheckBoxActive className="h-6 w-6" />
                ) : (
                  <CheckBoxDefault className="h-6 w-6" />
                )}

                {/* 메인 라벨 + 서브 라벨을 세로로 쌓고, 왼쪽 정렬 */}
                <div className="flex flex-col items-start text-left leading-tight">
                  <span className="text-base font-semibold">
                    {option.label}
                  </span>
                  {option.subLabel ? (
                    // 실제 서브라벨이 있으면 표시
                    <span className="mt-0.5 text-xs">{option.subLabel}</span>
                  ) : (
                    // 서브라벨이 없으면 '빈 줄'로 대체
                    // (투명 텍스트 or 고정 높이 등)
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
