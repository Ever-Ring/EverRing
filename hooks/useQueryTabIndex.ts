import { useCallback } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

export const useQueryTabIndex = (): [number, (index: number) => void] => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const tabIndex = Number(searchParams.get("tab") || 0);

  const setTabIndex = useCallback(
    (index: number) => {
      const newParams = new URLSearchParams(searchParams.toString());
      newParams.set("tab", String(index));
      newParams.set("type", index === 1 ? "WORKATION" : "DALLAEMFIT");

      newParams.delete("location");
      newParams.delete("date");
      newParams.delete("sort");

      router.replace(`${pathname}?${newParams.toString()}`);
    },
    [router, pathname, searchParams],
  );

  return [tabIndex, setTabIndex];
};
