"use client";

import { useMutation } from "@tanstack/react-query";
import AuthApi from "@features/auth/apis/AuthApi";

const useSignin = () => {
  return useMutation({
    mutationFn: AuthApi.signin,
  });
};

export default useSignin;
