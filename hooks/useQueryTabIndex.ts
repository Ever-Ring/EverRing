import { useState, useCallback } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

export const useQueryTabIndex = (): [number, (index: number) => void] => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [tabIndex, setTabIndexState] = useState(
    Number(searchParams.get("tab") || 0),
  );

  const setTabIndex = useCallback(
    (index: number) => {
      setTabIndexState(index); // ✅ 즉시 상태 업데이트

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
