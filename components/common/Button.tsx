/* eslint-disable react/require-default-props */
import classNames from "classnames";

interface ButtonProps {
  text: string;
  size?: "large" | "small";
  disabled?: boolean;
  variant?: "solid" | "outlined";
  type?: "button" | "submit";
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function Button({
  text,
  size = "large",
  disabled = false,
  variant = "solid",
  type = "button",
  onClick,
}: ButtonProps) {
  return (
    <button
      className={classNames(
        "group flex items-center justify-center whitespace-nowrap rounded-xl border py-2 transition-colors",
        {
          "w-full px-6": size === "large",
          "w-[115px] px-4": size === "small",

          "bg-mint-600 text-white hover:bg-mint-700 active:bg-mint-800":
            variant === "solid" && !disabled,
          "cursor-not-allowed border-gray-400 bg-gray-400 text-white":
            variant === "solid" && disabled,

          "border-mint-600 bg-white hover:border-mint-500 active:border-mint-700":
            variant === "outlined" && !disabled,
          "cursor-not-allowed border-gray-400 bg-white text-gray-400":
            variant === "outlined" && disabled,
        },
      )}
      type={type === "submit" ? "submit" : "button"}
      disabled={disabled}
      onClick={onClick}
    >
      <span
        className={classNames(
          "text-center font-pretendard font-semibold leading-6 transition-colors",
          {
            "text-base": size === "large",
            "text-sm": size === "small",

            "text-white": variant === "solid",

            "text-mint-600 group-hover:text-mint-500 group-active:text-mint-700":
              variant === "outlined" && !disabled,
            "text-gray-400": variant === "outlined" && disabled,
          },
        )}
      >
        {text}
      </span>
    </button>
  );
}
