import { useCookies } from "react-cookie";

export default function useIsAuthenticated() {
  const [cookies] = useCookies(["token"]);

  return !!cookies.token;
}
