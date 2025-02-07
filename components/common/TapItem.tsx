// TODO 나중에 구름/나무로 이미지 바꿀 것. 구름링/나무링

import SvgCloud from "@image/dalaemfit.svg";
import SvgTree from "@image/workation.svg";

interface TapProps {
  title: string;
  hasIcon?: boolean;
  isSelected?: boolean;
  onClick: () => void;
}

export default function TapItem({
  title,
  hasIcon,
  isSelected,
  onClick,
}: TapProps) {
  return (
    <button
      onClick={onClick}
      type="button"
      className="flex flex-col gap-1 w-fit items-start"
    >
      <div className="flex flex-row gap-1 items-center">
        <div className="font-semibold text-lg text-gray-900">{title}</div>
        {hasIcon &&
          (title === "구름링" ? (
            <SvgCloud
              width={32}
              height={32}
              className="transition-all transform hover:scale-110"
            />
          ) : (
            <SvgTree
              width={32}
              height={32}
              className="transition-all transform hover:scale-110"
            />
          ))}
      </div>

      {/* 클릭된 상태면 visivle */}
      <div
        className={`bg-gray-900 w-full h-[2px] ${isSelected ? "" : "invisible"}`}
      />
    </button>
  );
}

// defaultProps를 사용하여 기본값을 설정
TapItem.defaultProps = {
  hasIcon: false,
  isSelected: false,
};
