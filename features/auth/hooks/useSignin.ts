"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import AuthApi from "@apis/AuthApi";
import useUserStore from "@stores/userStore";
import { useRouter } from "next/navigation";
import { handleSigninMutationSuccess } from "@features/auth/utils/handleMutationSuccess";

export default function useSignin() {
  const { setUser } = useUserStore();
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: AuthApi.signin,
    onSuccess: (response) => {
      handleSigninMutationSuccess(response, queryClient, setUser, router);
    },
  });
}
