import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Gnb from "@components/common/Gnb";
import ReactQueryProvider from "@providers/ReactQueryProvider";

export const metadata: Metadata = {
  title: "에버링",
  description:
    "건강한 저속 노화를 위한 모임을 만들고, 참여하고, 나누는 경험, 에버링에서 함께하세요.",
  icons: "/image/logo_plant.svg",
};

const pretendard = localFont({
  src: "../public/fonts/PretendardVariable.woff2",
  display: "block",
  variable: "--font-pretendard",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`flex h-screen flex-col bg-white ${pretendard.variable} font-pretendard antialiased`}
      >
        <ReactQueryProvider>
          <div className="fixed left-0 top-0 z-20 w-full">
            <Gnb />
          </div>
          <div className="flex w-full flex-1 pt-[54px] md:pt-[60px]">
            {children}
          </div>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
