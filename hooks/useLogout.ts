import { useRouter } from "next/navigation";
import { removeCookie } from "@utils/cookieUtils";
import { useQueryClient } from "@tanstack/react-query";
import AuthApi from "@apis/AuthApi";
import useUserStore from "@stores/userStore";

export default function useLogout() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const logout = async () => {
    await AuthApi.signout();
    removeCookie("token");
    queryClient.clear();
    localStorage.removeItem("userIdStorage");
    useUserStore.setState({
      id: null,
      name: null,
      image: null,
      companyName: null,
      email: null,
    });
    router.push("/");
  };

  return logout;
}
