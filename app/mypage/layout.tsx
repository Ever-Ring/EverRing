import { ReactNode } from "react";

export default function MypageLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-full flex-1 flex-col overflow-hidden bg-gray-50 px-4 pt-8 sm:px-6 lg:mx-[15%] lg:px-24">
      <main className="h-full">{children}</main>
    </div>
  );
}
