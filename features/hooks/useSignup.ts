"use client";

import { useMutation } from "@tanstack/react-query";
import AuthApi from "@features/auth/apis/AuthApi";

export default function useSignup() {
  return useMutation({
    mutationFn: AuthApi.signup,
  });
}
