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
      className="inline-flex h-9 w-10 items-center justify-start gap-1 rounded-lg border-2 border-gray-100 bg-white p-[0.375rem] text-sm text-gray-900 transition md:h-10 md:w-[7.5rem] md:px-3 md:py-2"
    >
      <SortDefault />

      <div className="hidden md:block">{label}</div>
    </button>
  );
}
