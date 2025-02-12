import { axiosInstance } from "@lib/axios";
import { FormValues } from "@customTypes/form";
import { Cookies } from "react-cookie";
import { AxiosError } from "axios";

const cookies = new Cookies();

const signinUser = async ({ email, password }: FormValues) => {
  try {
    const response = await axiosInstance.post("/auths/signin", {
      email,
      password,
    });

    if (response.status === 200) {
      const { token } = response.data;
      cookies.set("token", token, { path: "/" });
      return { isSuccess: true, response };
    }

    return { isSuccess: false, response: null }; // 기본값 반환- 린트 룰
  } catch (err) {
    if (err instanceof AxiosError) {
      if (
        err.response?.data?.code === "INVALID_CREDENTIALS" ||
        err.response?.data?.code === "USER_NOT_FOUND"
      ) {
        const response = err?.response;
        return { isSuccess: false, response };
      }
    }

    return { isSuccess: false, response: null }; // 기본값 반환
  }
};

export default signinUser;
