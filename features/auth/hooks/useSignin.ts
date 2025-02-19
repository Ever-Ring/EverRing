"use client";

import { useMutation } from "@tanstack/react-query";
import AuthApi from "@apis/AuthApi";

export default function useSignin() {
  return useMutation({
    mutationFn: AuthApi.signin,
  });
}
