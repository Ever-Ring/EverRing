import { useMutation } from "@tanstack/react-query";
import AuthApi from "@apis/AuthApi";

export default function useUpdateUserInfo() {
  return useMutation({
    mutationFn: (data: FormData) => AuthApi.updateUserInfo(data),
  });
}
