import React, { ReactNode } from "react";
import MainImage from "@assets/img_login.svg";

interface FormContainerProps {
  title: string;
  description: string;
  linkText: string;
  children: ReactNode;
}

function FormContainer({
  title,
  linkText,
  description,
  children,
}: FormContainerProps) {
  return (
    <div className="flex h-fit w-full items-start rounded-3xl bg-white px-4 py-8 sm:px-16 lg:w-[31.875rem] lg:px-[3.375rem]">
      <div className="flex shrink-0 grow basis-0 flex-col items-center gap-6">
        <h1 className="mb-2 text-xl font-semibold text-gray-800 sm:text-2xl">
          {title}
        </h1>
        {children}
        <p className="flex flex-row items-start gap-1 text-[0.9375rem] text-base font-medium">
          <span className="text-gray-800">{description}</span>
          <span className="text-mint-600 underline decoration-solid">
            {linkText}
          </span>
        </p>
      </div>
    </div>
  );
}

function WelcomeTextWithImage() {
  return (
    <div className="flex flex-col items-center">
      <p className="mb-6 flex flex-col items-center gap-2 text-gray-800">
        <span className="text-xl font-semibold sm:text-2xl">
          Welcome to 에버링!
        </span>
        <span className="text-sm font-medium sm:text-base">
          건강을 위한 저속노화, 이제는 에버링과 함께 해보세요
        </span>
      </p>
      <MainImage className="h-auto w-[18.125rem] sm:w-96" />
    </div>
  );
}

export default function AuthPageLayout({
  title,
  description,
  linkText,
  children,
}: FormContainerProps) {
  return (
    <div className="flex h-fit min-h-screen flex-col items-center justify-center px-4 pb-14 pt-8 sm:px-[4.25rem] sm:pb-[5.25rem] sm:pt-10 lg:flex-row lg:gap-[6.38rem] lg:px-[15%] lg:pb-0 lg:pt-0">
      <WelcomeTextWithImage />
      <FormContainer
        title={title}
        description={description}
        linkText={linkText}
      >
        {children}
      </FormContainer>
    </div>
  );
}
