import Image from "next/image";
import Button from "@components/common/Button";

interface PopupProps {
  hasTwoButton?: boolean;
  text: string;
}

export default function Popup({ hasTwoButton = false, text }: PopupProps) {
  const alignItems = hasTwoButton ? "items-start" : "items-end";

  return (
    // gap-[0.625rem]
    <div className="flex w-fit flex-col items-start rounded-lg bg-white p-6">
      <div
        className={`flex flex-col items-center gap-10 md:${alignItems} md:gap-6`}
      >
        <div className="flex flex-col items-end gap-6">
          <Image src="/image/X.svg" alt="close button" width={24} height={24} />
          <div className="w-[15.75rem] text-center text-base font-medium text-gray-900 md:w-[25.125rem]">
            {text}
          </div>
        </div>
        <div className="flex items-start gap-2">
          {hasTwoButton && (
            <Button text="취소" size="small" variant="outlined" />
          )}
          <Button text="확인" size="small" />
        </div>
      </div>
    </div>
  );
}
