import DropInverse from "@assets/icon-arrow-inverse-down.svg";
import DropDefault from "@assets/icon-arrow-default-down.svg";

interface DateFilteProps {
  label: string;
  isDefault: boolean;
  onClick?: () => void;
}

export default function DateFilter({
  label,
  isDefault,
  onClick,
}: DateFilteProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={label}
      className={`content-box inline-flex h-9 w-[6.875rem] items-center justify-between rounded-lg border-2 border-gray-100 px-3 py-[0.375rem] text-sm transition md:h-10 md:w-[7.5rem] ${isDefault ? "bg-white text-gray-900" : "border-black bg-gray-900 text-white"}`}
    >
      {label}
      {isDefault ? (
        <DropDefault className="h-6 w-6" />
      ) : (
        <DropInverse className="h-6 w-6" />
      )}
    </button>
  );
}
