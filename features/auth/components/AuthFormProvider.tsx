"use client";

import { useForm, FormProvider } from "react-hook-form";
import { ReactNode } from "react";

export default function AuthFormProvider({
  children,
}: {
  children: ReactNode;
}) {
  const methods = useForm();

  return <FormProvider {...methods}>{children}</FormProvider>;
}
