import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const setCookie = (
  name: string,
  value: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options?: Record<string, any>,
) => {
  return cookies.set(name, value, { ...options });
};

export const getCookie = (name: string) => {
  return cookies.get(name);
};

export const removeCookie = (name: string) => {
  return cookies.remove(name, { path: "/" });
};
