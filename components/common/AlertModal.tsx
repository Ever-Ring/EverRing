import Image from "next/image";
import Button from "@components/common/Button";
import Backdrop from "@components/common/Backdrop";

interface AlertModalProps {
  hasTwoButton?: boolean;
  text: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function AlertModal({
  hasTwoButton = false,
  text,
  isOpen,
  onClose,
  onConfirm,
}: AlertModalProps) {
  const alignItems = hasTwoButton ? "items-start" : "items-end";

  if (!isOpen) return null;

  return (
    <>
      <Backdrop />
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="flex w-fit flex-col items-start rounded-lg bg-white p-6">
          <div
            className={`flex flex-col items-center gap-10 md:${alignItems} md:gap-6`}
          >
            <div className="flex flex-col items-end gap-6">
              <button onClick={onClose} type="button">
                <Image
                  src="/image/X.svg"
                  alt="close button"
                  width={24}
                  height={24}
                />
              </button>
              <div className="w-[15.75rem] text-center text-base font-medium text-gray-900 md:w-[25.125rem]">
                {text}
              </div>
            </div>
            <div className="flex items-start gap-2">
              {hasTwoButton && (
                <Button
                  text="취소"
                  size="small"
                  variant="outlined"
                  onClick={onClose}
                />
              )}
              <Button text="확인" size="small" onClick={onConfirm} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
