import { ReactNode } from "react";

export default function CardContainer({ children }: { children: ReactNode }) {
  return (
    <div className="flex w-full flex-col items-center justify-between self-stretch rounded-[20px] border border-[#E5F4F2] bg-white px-[1.875rem] py-10 shadow-xl lg:w-[23.125rem]">
      {children}
    </div>
  );
}
