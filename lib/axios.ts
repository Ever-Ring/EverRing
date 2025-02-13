"use client";

import axios, { AxiosError, AxiosHeaders } from "axios";
import { Cookies } from "react-cookie";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const cookies = new Cookies();

// eslint-disable-next-line import/prefer-default-export
export const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

axiosInstance.interceptors.request.use((config) => {
  const token = cookies.get("token");
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

  async (error: AxiosError) => {
    // const { config } = error;

    // if (config && error.response?.status === 401) {
    //   // TODO: 로그인만료 popup 띄우기
    //   window.location.href = "/login";
    // }

    return Promise.reject(error);
  },
);
