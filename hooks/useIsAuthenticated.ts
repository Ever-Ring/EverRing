import { getCookie } from "@utils/cookieUtils";

export default function useIsAuthenticated() {
  const token = getCookie("token");

  return !!token;
}
