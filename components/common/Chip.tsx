interface ChipProps {
  label: string;
  selected?: boolean;
  onClick?: () => void;
}

export default function Chip({ label, selected = false, onClick }: ChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      title={label}
      className={`inline-flex items-center justify-center rounded-lg font-medium transition ${selected ? "border-black bg-gray-900 text-white" : "bg-gray-200 text-gray-900"} min-h-[2.25rem] min-w-[3.0625rem] px-3 py-2 text-sm md:px-4 md:py-[0.625rem]`}
    >
      {label}
    </button>
  );
}
