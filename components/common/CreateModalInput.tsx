"use client";

import React, { useRef, useState } from "react";
import ArrowDown from "@assets/icon-arrow-default-down.svg";
import DropDown from "@components/common/DropDown";
import Button from "@components/common/Button";

export interface CreateModalInputProps {
  type: string;
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFileChange?: (file: File) => void;
  options?: string[];
  readOnly?: boolean;
}

export default function CreateModalInput({
  type,
  label,
  placeholder,
  value,
  onChange,
  onFileChange,
  options = [],
  readOnly = false,
}: CreateModalInputProps) {
  const labelId = label ? label.replace(/\s+/g, "-").toLowerCase() : "input-id";

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [localFileName, setLocalFileName] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setLocalFileName(file ? file.name : "");

    if (file && onFileChange) {
      onFileChange(file);
    }
  };

  const handleFileButtonClick = () => {
    fileInputRef.current?.click();
  };

  const toggleDropdown = () => setIsOpen((prev) => !prev);
  const handleSelectOption = (option: string) => {
    if (onChange) {
      const fakeEvent = {
        target: { value: option },
      } as React.ChangeEvent<HTMLInputElement>;
      onChange(fakeEvent);
    }
    setIsOpen(false);
  };

  if (type === "fileupload") {
    return (
      <div className="flex w-full flex-col gap-2">
        {label && (
          <label
            htmlFor={labelId}
            className="text-base font-semibold text-gray-900"
          >
            {label}
          </label>
        )}
        <div className="flex items-center gap-2">
          <input
            ref={fileInputRef}
            id={`${labelId}-file`}
            type="file"
            className="hidden"
            onChange={handleFileChange}
          />
          <input
            id={labelId}
            type="text"
            placeholder={placeholder}
            readOnly
            value={localFileName}
            className="h-11 flex-1 rounded-xl bg-gray-50 px-4 text-sm font-medium text-gray-400 hover:border-2 hover:border-mint-300 focus:border-2 focus:border-mint-600 focus:outline-none"
          />
          <Button
            text="파일 찾기"
            onClick={handleFileButtonClick}
            variant="outlined"
            size="small"
          />
        </div>
      </div>
    );
  }

  if (type === "select") {
    return (
      <div className="flex w-full flex-col gap-2">
        {label && (
          <label
            htmlFor={labelId}
            className="text-base font-semibold text-gray-900"
          >
            {label}
          </label>
        )}
        <div className="relative w-full">
          <input
            id={labelId}
            type="text"
            placeholder={placeholder}
            readOnly
            value={value ?? ""}
            onClick={!readOnly ? toggleDropdown : undefined}
            className="h-11 w-full rounded-xl bg-gray-50 px-4 pr-10 text-sm font-medium text-gray-800 hover:border-2 hover:border-mint-300 focus:border-2 focus:border-mint-600 focus:outline-none"
          />
          {!readOnly && (
            <button
              type="button"
              onClick={toggleDropdown}
              className="absolute right-4 top-1/2 -translate-y-1/2 transform cursor-pointer"
            >
              <ArrowDown className="h-6 w-6" />
            </button>
          )}
          {isOpen && !readOnly && (
            <DropDown
              items={options}
              onSelect={handleSelectOption}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              selectedItem={value}
              variant="solid"
              textSize="large"
            />
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-2">
      {label && (
        <label
          htmlFor={labelId}
          className="text-base font-semibold text-gray-900"
        >
          {label}
        </label>
      )}
      <input
        id={labelId}
        type={type}
        placeholder={placeholder}
        readOnly={readOnly}
        value={value ?? ""}
        onChange={onChange}
        {...(type === "number" ? { min: 5 } : {})}
        className="h-11 w-full rounded-xl bg-gray-50 px-4 text-sm font-medium text-gray-800 hover:border-2 hover:border-mint-300 focus:border-2 focus:border-mint-600 focus:outline-none"
      />
    </div>
  );
}
