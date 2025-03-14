import React, { ReactNode, ButtonHTMLAttributes } from "react";

interface MockPaginationButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export default function MockPaginationButton({
  onClick,
  disabled,
  className,
  children,
  ...rest
}: MockPaginationButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={className}
      {...rest}
    >
      {children}
    </button>
  );
}
