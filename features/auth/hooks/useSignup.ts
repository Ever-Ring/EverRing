"use client";

import { useMutation } from "@tanstack/react-query";
import AuthApi from "@apis/AuthApi";
import { useRouter } from "next/navigation";
import { handleSignupMutaionSuccess } from "@features/auth/utils/handleMutationSuccess";
import useModalStore from "@stores/modalStore";

export default function useSignup() {
  const router = useRouter();
  const { openModal } = useModalStore();

  return useMutation({
    mutationFn: AuthApi.signup,
    onSuccess: (response) => {
      handleSignupMutaionSuccess(response, router, openModal);
    },
  });
}
