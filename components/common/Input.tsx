import React, { forwardRef, useState } from "react";
import { InputProps } from "@customTypes/form";
import EyeOff from "@assets/visibility_off.svg";
import EyeOn from "@assets/visibility_on.svg";

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
const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { id, name, type, label, placeholder, isInvalid, onBlur, ...props },
    ref,
  ) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
      setIsPasswordVisible((prev) => !prev);
    };
    return (
      <div className="relative flex w-full flex-col items-start gap-2">
        <label
          htmlFor={id}
          className="w-full text-sm font-semibold text-gray-900"
        >
          {label}
        </label>
        <input
          id={id}
          name={name}
          type={type === "password" && isPasswordVisible ? "text" : type}
          placeholder={placeholder}
          ref={ref}
          className="h-11 w-full rounded-xl bg-gray-50 px-4 text-sm font-medium text-gray-800 hover:border-2 hover:border-mint-300 focus:border-2 focus:border-mint-600 focus:outline-none sm:text-base"
          onBlur={onBlur}
          {...props}
          style={{
            border: isInvalid ? "2px solid red" : "",
          }}
        />
        {name === "password" && (
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
