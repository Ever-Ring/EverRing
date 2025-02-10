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
      className={`
          inline-flex items-center justify-center rounded-[0.75rem] transition
          ${selected ? "bg-gray-900 text-white border-black" : "bg-gray-200 text-black"}
          active:scale-95
          px-[0.75rem] py-[0.5rem] text-sm min-w-[3.0625rem] min-h-[2.25rem]
          sm:px-[1rem] sm:py-[0.625rem]
        `}
    >
      {label}
    </button>
  );
}
