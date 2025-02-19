"use client";

import { useMutation } from "@tanstack/react-query";
import AuthApi from "@apis/AuthApi";

export default function useSignup() {
  return useMutation({
    mutationFn: AuthApi.signup,
  });
}
