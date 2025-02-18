import { axiosInstance } from "@lib/axios";
import { AxiosResponse } from "axios";

export default class MypageApi {
  static getUserInfo = (): Promise<AxiosResponse> =>
    axiosInstance.get("/auths/user");

  static updateUserInfo = (data: FormData): Promise<AxiosResponse> =>
    axiosInstance.put("/auths/user", data);
}
