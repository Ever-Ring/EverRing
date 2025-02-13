import { axiosInstance } from "@lib/axios";
import { FormValues } from "@customTypes/form";
import { AxiosResponse } from "axios";

class AuthApi {
  static signin = ({ email, password }: FormValues): Promise<AxiosResponse> =>
    axiosInstance.post("/auths/signin", { email, password });

  static signup = ({
    email,
    password,
    name,
    companyName,
  }: FormValues): Promise<AxiosResponse> =>
    axiosInstance.post("/auths/signup", { email, password, name, companyName });
}
export default AuthApi;
