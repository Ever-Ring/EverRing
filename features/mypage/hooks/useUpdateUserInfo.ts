import { useMutation, useQueryClient } from "@tanstack/react-query";
import MypageApi from "@features/mypage/apis/MypageApi";

export default function useUpdateUserInfo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: FormData) => MypageApi.updateUserInfo(data),
  });
}
