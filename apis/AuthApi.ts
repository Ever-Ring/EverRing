import { axiosInstance } from "@lib/axios";
import { FormValues } from "@customTypes/form";
import { AxiosResponse } from "axios";

export default class AuthApi {
  static signin = ({ email, password }: FormValues): Promise<AxiosResponse> =>
    axiosInstance.post("/auths/signin", { email, password });

  static signup = ({
    email,
    password,
    name,
    companyName,
  }: FormValues): Promise<AxiosResponse> =>
    axiosInstance.post("/auths/signup", { email, password, name, companyName });

  static signout = (): Promise<AxiosResponse> =>
    axiosInstance.get("/auths/signout");

  static getUserInfo = (): Promise<AxiosResponse> =>
    axiosInstance.get("/auths/user");

  static updateUserInfo = (data: FormData): Promise<AxiosResponse> =>
    axiosInstance.put("/auths/user", data);
}
