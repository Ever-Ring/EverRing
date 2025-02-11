/* eslint-disable react/require-default-props */
import classNames from "classnames";

interface ButtonProps {
  text: string;
  size?: "large" | "small";
  disabled?: boolean;
  variant?: "solid" | "outlined";
}

function Button({
  text,
  size = "large",
  disabled = false,
  variant = "solid",
}: ButtonProps) {
  return (
    <button
      className={classNames(
        "group flex items-center justify-center whitespace-nowrap rounded-xl border py-2 transition-colors",
        {
          "w-[332px] px-6": size === "large",
          "w-[120px] px-4": size === "small",

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
      type="button"
      disabled={disabled}
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

export default Button;
