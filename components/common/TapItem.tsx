/* eslint-disable react/require-default-props */
// TODO 나중에 구름/나무로 이미지 바꿀 것. 구름링/나무링

import SvgCloud from "@assets/dalaemfit.svg";
import SvgTree from "@assets/workation.svg";
import { forwardRef } from "react";

interface TapProps {
  title: string;
  hasIcon?: boolean;
  isSelected?: boolean;
  onClick: () => void;
}

const TapItem = forwardRef<HTMLButtonElement, TapProps>(
  ({ title, hasIcon = false, isSelected = false, onClick }, ref) => {
    return (
      <button
        onClick={onClick}
        type="button"
        ref={ref}
        className="flex flex-col gap-1 w-fit items-start transition-colors duration-300 ease-in-out "
      >
        <div className="flex flex-row gap-1 items-center">
          <div
            className={`font-semibold text-lg transition-colors duration-300 ease-in-out ${isSelected ? "text-gray-900" : "text-gray-400"}`}
          >
            {title}
          </div>
          {hasIcon &&
            (title === "구름링" ? (
              <SvgCloud
                width={32}
                height={32}
                className={`transition-colors duration-300 ease-in-out ${
                  isSelected ? "fill-gray-900" : "fill-gray-400"
                }`}
              />
            ) : (
              <SvgTree
                width={32}
                height={32}
                className={`transition-colors duration-300 ease-in-out ${
                  isSelected ? "fill-gray-900" : "fill-gray-400"
                }`}
              />
            ))}
        </div>
      </button>
    );
  },
);
// displayName 추가 (린트 에러)
TapItem.displayName = "TapItem";

// defaultProps를 사용하여 기본값을 설정
// TapItem.defaultProps = {
//   hasIcon: false,
//   isSelected: false,
// };

export default TapItem;
