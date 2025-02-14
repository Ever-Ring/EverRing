import { ReactNode } from "react";

export default function ListLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-full flex-1 overflow-y-auto bg-gray-50 lg:mx-[15%]">
      {children}
    </div>
  );
}
