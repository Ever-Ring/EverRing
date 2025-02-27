import React, { forwardRef, useState, useRef } from "react";
import { InputProps } from "@customTypes/form";
import EyeOff from "@assets/visibility_off.svg";
import EyeOn from "@assets/visibility_on.svg";
import ArrowDown from "@assets/icon-arrow-default-down.svg";
import DropDown from "@components/common/DropDown";
import Button from "@components/common/Button";

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
      onChange,
      labelTextSize = "base",
      options = [],
      ...props
    },
    ref,
  ) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    // 이미지 업로드 상태
    const [selectedFileName, setSelectedFileName] = useState("");
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files?.[0]) {
        setSelectedFileName(e.target.files[0].name);
      } else {
        setSelectedFileName("");
      }
    };

    const handleFileButtonClick = () => {
      fileInputRef.current?.click();
    };

    // 드롭다운 상태 (select 타입)
    const [isOpen, setIsOpen] = useState(false);

    const togglePasswordVisibility = () => {
      setIsPasswordVisible((prev) => !prev);
    };

    const toggleDropdown = () => {
      setIsOpen((prev) => !prev);
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

        {type === "fileupload" && (
          <div className="flex w-full items-center gap-2">
            {/* 숨겨진 파일 인풋 */}
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              onChange={handleFileChange}
            />
            {(() => {
              const { value: ignoredValue, ...restProps } = props;
              return (
                <input
                  id={id}
                  name={name}
                  type="text"
                  placeholder={placeholder}
                  readOnly
                  value={selectedFileName || ""}
                  onBlur={onBlur}
                  ref={ref}
                  className="h-11 flex-1 rounded-xl bg-gray-50 px-4 text-sm font-medium text-gray-400 hover:border-2 hover:border-mint-300 focus:border-2 focus:border-mint-600 focus:outline-none"
                  style={{ border: isInvalid ? "2px solid red" : "" }}
                  {...restProps}
                />
              );
            })()}

            <Button
              text="파일 찾기"
              onClick={handleFileButtonClick}
              variant="outlined"
              size="small"
            />
          </div>
        )}

        {type === "select" && (
          <div className="relative w-full">
            <input
              id={id}
              name={name}
              type="text"
              placeholder={placeholder}
              ref={ref}
              readOnly
              value={props.value}
              onBlur={onBlur}
              onChange={onChange}
              className="h-11 w-full rounded-xl bg-gray-50 px-4 pr-10 text-sm font-medium text-gray-800 hover:border-2 hover:border-mint-300 focus:border-2 focus:border-mint-600 focus:outline-none"
              style={{ border: isInvalid ? "2px solid red" : "" }}
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
                onSelect={(option) => {
                  if (onChange) {
                    const fakeEvent = {
                      target: { value: option },
                    } as unknown as React.ChangeEvent<HTMLInputElement>;
                    onChange(fakeEvent);
                  }
                  setIsOpen(false);
                }}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                selectedItem={props.value}
                variant="solid"
                textSize="large"
              />
            )}
          </div>
        )}

        {type === "password" && (
          <div className="relative w-full">
            <input
              id={id}
              name={name}
              type={isPasswordVisible ? "text" : "password"}
              placeholder={placeholder}
              ref={ref}
              onBlur={onBlur}
              className="h-11 w-full rounded-xl bg-gray-50 px-4 text-sm font-medium text-gray-800 hover:border-2 hover:border-mint-300 focus:border-2 focus:border-mint-600 focus:outline-none"
              style={{ border: isInvalid ? "2px solid red" : "" }}
              {...props}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-4 top-1/2 -translate-y-1/2 transform cursor-pointer"
            >
              {isPasswordVisible ? (
                <EyeOn className="h-6 w-6" />
              ) : (
                <EyeOff className="h-6 w-6" />
              )}
            </button>
          </div>
        )}

        {type !== "select" && type !== "password" && type !== "fileupload" && (
          <input
            id={id}
            name={name}
            type={type}
            placeholder={placeholder}
            ref={ref}
            onBlur={onBlur}
            className="h-11 w-full rounded-xl bg-gray-50 px-4 text-sm font-medium text-gray-800 hover:border-2 hover:border-mint-300 focus:border-2 focus:border-mint-600 focus:outline-none md:text-base"
            style={{ border: isInvalid ? "2px solid red" : "" }}
            {...props}
          />
        )}
      </div>
    );
  },
);

export default Input;
