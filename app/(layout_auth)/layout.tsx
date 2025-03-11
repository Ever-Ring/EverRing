import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex w-full justify-center bg-gray-100 lg:px-[15%]">
      <div className="flex w-full justify-center px-4 md:px-[4.25rem] lg:px-0 lg:py-14">
        {children}
      </div>
    </div>
  );
}
