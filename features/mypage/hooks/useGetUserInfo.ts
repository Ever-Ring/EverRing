import { useQuery } from "@tanstack/react-query";
import MypageApi from "@features/mypage/apis/MypageApi";

export default function useGetUserInfo() {
  return useQuery({
    queryKey: ["userInfo"],
    queryFn: () => MypageApi.getUserInfo(),
  });
}
