import { useMutation } from "@tanstack/react-query";
import MypageApi from "@features/mypage/apis/MypageApi";

export default function useUpdateUserInfo() {
  return useMutation({
    mutationFn: (data: FormData) => MypageApi.updateUserInfo(data),
  });
}
