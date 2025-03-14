import { forwardRef } from "react";

import SvgTree from "@assets/tree-fill.svg";
import SvgCloud from "@assets/cloud-fill.svg";

interface TabProps {
  title: string;
  label: string;
  hasIcon?: boolean;
  isSelected?: boolean;
  onClick: () => void;
}

const TabItem = forwardRef<HTMLButtonElement, TabProps>(
  ({ title, label, hasIcon = false, isSelected = false, onClick }, ref) => {
    const textColor = isSelected ? "text-gray-900" : "text-gray-400";
    const iconColor = isSelected ? "fill-gray-900" : "fill-gray-400";

    return (
      <button
        onClick={onClick}
        type="button"
        ref={ref}
        className="flex w-fit flex-col items-start gap-1"
      >
        <div className="flex flex-row items-center gap-1">
          <div
            className={`text-lg font-semibold transition-colors duration-300 ease-out ${textColor}`}
          >
            {title}
          </div>
          {hasIcon &&
            (label === "tree" ? (
              <SvgTree
                role="img"
                data-testid="tree-icon"
                width={24}
                height={24}
                className={`transition-colors duration-300 ease-out ${iconColor}`}
              />
            ) : (
              <SvgCloud
                role="img"
                data-testid="cloud-icon"
                width={24}
                height={24}
                className={`transition-colors duration-300 ease-out ${iconColor}`}
              />
            ))}
        </div>
      </button>
    );
  },
);

export default TabItem;
