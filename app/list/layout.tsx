import { ReactNode } from "react";

export default function ListLayout({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto min-h-[calc(100vh-3.5rem)] overflow-y-auto bg-gray-50 lg:max-w-[70%]">
      {children}
    </div>
  );
}
