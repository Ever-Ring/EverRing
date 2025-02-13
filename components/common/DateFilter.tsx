import DropInverse from "@assets/icon-arrow-inverse-down.svg";
import DropDefault from "@assets/icon-arrow-default-down.svg";

interface DateFilteProps {
  label: string;
  isDefault: boolean;
  onClick: () => void;
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
      className={`content-box inline-flex h-9 w-[110px] items-center justify-between rounded-lg border-2 border-gray-100 px-3 py-[6px] text-sm transition active:scale-95 sm:h-10 sm:w-[120px] ${isDefault ? "bg-white text-gray-900" : "border-black bg-gray-900 text-white"}`}
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
