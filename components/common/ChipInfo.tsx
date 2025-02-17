interface ChipInfoProps {
  info: string;
  variant?: "white" | "mint";
}

function ChipInfo({ info, variant = "white" }: ChipInfoProps) {
  return (
    <div className="inline-flex h-auto w-auto items-center justify-center gap-2.5 rounded bg-gray-900 px-2 py-0.5">
      <span
        className={`text-sm font-medium leading-5 ${
          variant === "mint" ? "text-mint-600" : "text-white"
        }`}
      >
        {info}
      </span>
    </div>
  );
}

export default ChipInfo;
