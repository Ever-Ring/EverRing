import { ReactNode } from "react";

export default function DefaultLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-full flex-1 flex-col bg-gray-50 px-4 md:px-6 lg:px-24">
      <main className="flex-1">{children}</main>
    </div>
  );
}
