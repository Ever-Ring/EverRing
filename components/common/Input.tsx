import React, { forwardRef, useState } from "react";
import { InputProps } from "@customTypes/form";
import EyeOff from "@assets/visibility_off.svg";
import EyeOn from "@assets/visibility_on.svg";
import ArrowDown from "@assets/icon-arrow-default-down.svg";
import DropDown from "@components/common/DropDown";

/**
 * @param {string} id - 고유 ID, label과 연결됨
 * @param {string} name - 이름
 * @param {string} type - 타입 (예: text, password)
 * @param {string} label - 레이블
 * @param {string} placeholder - 플레이스홀더 텍스트
 * @param {boolean} isInvalid - 유효성 검사가 실패했을 때 표시할 에러 상태
 * @param {function} onBlur - 입력 필드 focus out될 때 호출되는 함수
 * @returns {JSX.Element} - Input 컴포넌트 리턴
 */

interface ExtendedInputProps extends InputProps {
  options?: string[];
}

const Input = forwardRef<HTMLInputElement, ExtendedInputProps>(
  (
    {
      id,
      name,
      type,
      label,
      placeholder,
      isInvalid,
      onBlur,
      labelTextSize = "base",
      options = [],
      ...props
    },
    ref,
  ) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState("");

    const togglePasswordVisibility = () => {
      setIsPasswordVisible((prev) => !prev);
    };

    const toggleDropdown = () => {
      setIsOpen((prev) => !prev);
    };

    const handleOptionClick = (option: string) => {
      setSelectedValue(option);
      setIsOpen(false);
    };

    const textSize = labelTextSize === "sm" ? "text-sm" : "text-base";

    return (
      <div className="relative flex w-full flex-col items-start gap-2">
        <label
          htmlFor={id}
          className={`w-full ${textSize} font-semibold text-gray-900`}
        >
          {label}
        </label>
        {type === "select" ? (
          <div className="relative w-full">
            <input
              id={id}
              name={name}
              type="text"
              placeholder={placeholder}
              ref={ref}
              readOnly
              value={selectedValue}
              onBlur={onBlur}
              className="h-11 w-full rounded-xl bg-gray-50 px-4 pr-10 text-sm font-medium text-gray-800 hover:border-2 hover:border-mint-300 focus:border-2 focus:border-mint-600 focus:outline-none"
              style={{ border: isInvalid ? "2px solid red" : "" }}
              {...props}
            />
            <button
              type="button"
              onClick={toggleDropdown}
              className="absolute right-4 top-1/2 -translate-y-1/2 transform cursor-pointer"
            >
              <ArrowDown className="h-6 w-6" />
            </button>
            {isOpen && (
              <DropDown
                items={options}
                onSelect={handleOptionClick}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                selectedItem={selectedValue}
                variant="solid"
                textSize="large"
              />
            )}
          </div>
        ) : (
          <input
            id={id}
            name={name}
            type={type === "password" && isPasswordVisible ? "text" : type}
            placeholder={placeholder}
            ref={ref}
            onBlur={onBlur}
            className="h-11 w-full rounded-xl bg-gray-50 px-4 text-sm font-medium text-gray-800 hover:border-2 hover:border-mint-300 focus:border-2 focus:border-mint-600 focus:outline-none md:text-base"
            style={{ border: isInvalid ? "2px solid red" : "" }}
            {...props}
          />
        )}

        {type === "password" && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-4 top-3/4 -translate-y-3/4 transform cursor-pointer"
          >
            {isPasswordVisible ? (
              <EyeOn className="h-6 w-6" />
            ) : (
              <EyeOff className="h-6 w-6" />
            )}
          </button>
        )}
      </div>
    );
  },
);

export default Input;
