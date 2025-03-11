import axios, { AxiosError, AxiosHeaders } from "axios";
import { getCookie } from "@utils/cookieUtils";
import { TOKEN } from "@constants/auth";
import { ErrorResponse, UnauthorizedError } from "@customTypes/error";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const isServer = typeof window === "undefined";

// eslint-disable-next-line import/prefer-default-export
export const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

axiosInstance.interceptors.request.use(async (config) => {
  let token;

  if (isServer) {
    const { cookies } = await import("next/headers");
    const cookiesObj = await cookies();
    token = cookiesObj.get(TOKEN)?.value;
  } else {
    token = getCookie(TOKEN);
  }

  if (token) {
    const updatedHeaders = new AxiosHeaders({
      ...config.headers,
      Authorization: `Bearer ${token}`,
    });

    return { ...config, headers: updatedHeaders };
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (res) => res,

  async (error: AxiosError<ErrorResponse>) => {
    if (error.response) {
      const { code } = error.response.data;

      if (code === "UNAUTHORIZED") {
        const unauthorizedError = new UnauthorizedError("Unauthorized");
        return Promise.reject(unauthorizedError);
      }
    }
    return Promise.reject(error);
  },
);
