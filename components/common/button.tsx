/* eslint-disable react/require-default-props */
import classNames from "classnames";

interface ButtonProps {
  text: string;
  size?: "default" | "small";
  disabled?: boolean;
  variant?: "solid" | "outlined";
}

function Button({
  text,
  size = "default",
  disabled = false,
  variant = "solid",
}: ButtonProps) {
  return (
    <button
      className={classNames(
        "group flex justify-center items-center py-2 gap-2.5 rounded-xl transition-colors whitespace-nowrap border",
        {
          "w-[332px] px-6": size === "default",
          "w-[120px] px-4": size === "small",

          "bg-mint-600 hover:bg-mint-700 active:bg-mint-800 text-white":
            variant === "solid" && !disabled,
          "bg-gray-400 text-white cursor-not-allowed border-gray-400":
            variant === "solid" && disabled,

          "bg-white border-mint-600 hover:border-mint-500 active:border-mint-700":
            variant === "outlined" && !disabled,
          "bg-white text-gray-400 border-gray-400 cursor-not-allowed":
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
            "text-base": size === "default",
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
