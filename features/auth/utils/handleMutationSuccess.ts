import { AxiosResponse } from "axios";

import AuthApi from "@apis/AuthApi";
import { setCookie } from "@utils/cookieUtils";
import { QueryClient } from "@tanstack/react-query";
import { UserStore } from "@customTypes/user";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { AlertModalOptions } from "@customTypes/modal";

export const handleSigninMutationSuccess = async (
  response: AxiosResponse,
  queryClient: QueryClient,
  setUser: (user: UserStore) => void,
  router: AppRouterInstance,
) => {
  if (response.status === 200) {
    const { token } = response.data;
    setCookie("token", token, { path: "/" });
  }

  try {
    const { data: userData } = await queryClient.fetchQuery({
      queryKey: ["userInfo"],
      queryFn: AuthApi.getUserInfo,
    });
    setUser({
      id: userData.id,
      name: userData.name,
      image: userData.image,
      companyName: userData.companyName,
      email: userData.email,
    });
    router.push("/list");
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};

export const handleSignupMutaionSuccess = async (
  response: AxiosResponse,
  router: AppRouterInstance,
  openModal: (options: AlertModalOptions) => void,
) => {
  if (response.status === 201) {
    console.log(openModal);
    openModal({
      text: "회원가입이 완료되었습니다!",
      onConfirm: () => router.push("/signin"),
    });
  }
};
