import { ReactNode } from "react";

interface PaginationButtonProps {
  children: ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}

export default function PaginationButton({
  children,
  disabled = false,
  onClick,
  className = "",
}: PaginationButtonProps) {
  return (
    <button
      type="button"
      className={`flex h-12 w-12 items-center justify-center rounded-lg bg-gray-50 p-2.5 ${className}`}
      disabled={disabled}
      onClick={!disabled ? onClick : undefined}
    >
      {children}
    </button>
  );
}
