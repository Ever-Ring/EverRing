import SortDefault from "@assets/icon-sort-default.svg";

interface SortFilterProps {
  label: string;
  onClick?: () => void;
}

export default function SortFilter({ label, onClick }: SortFilterProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="inline-flex h-9 w-10 items-center justify-start gap-1 rounded-lg border-2 border-gray-100 bg-white p-[6px] text-sm text-gray-900 transition active:scale-95 sm:h-10 sm:w-[120px] sm:px-3 sm:py-2"
    >
      <SortDefault />

      <div className="hidden sm:block">{label}</div>
    </button>
  );
}
