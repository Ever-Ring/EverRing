import { ReactNode } from "react";

export default function MypageLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-full flex-1 flex-col overflow-hidden bg-gray-50 px-6 pt-8 lg:mx-[15%]">
      <main className="h-full">{children}</main>
    </div>
  );
}
