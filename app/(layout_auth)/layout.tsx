import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex w-full justify-center px-4 md:px-[4.25rem] lg:px-0">
      {children}
    </div>
  );
}
