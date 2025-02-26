import { useQuery } from "@tanstack/react-query";
import AuthApi from "@apis/AuthApi";

export default function useGetUserInfo() {
  return useQuery({
    queryKey: ["userInfo"],
    queryFn: () => AuthApi.getUserInfo(),
  });
}
