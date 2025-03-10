import { useState } from "react";
import { useSearchParams } from "next/navigation";

export const useQueryString = (
  key: string,
  defaultValue: string | null = null, // ✅ 기본값을 null로 변경
): [string | null, (value: string | null) => void] => {
  const searchParams = useSearchParams();
  const [search, setSearch] = useState<string | null>(
    searchParams.get(key) ?? defaultValue,
  );

  const setValue = (value: string | null) => {
    const newParams = new URLSearchParams(searchParams.toString());

    if (value === null || value === "") {
      newParams.delete(key);
    } else {
      newParams.set(key, value);
    }

    setSearch(value ?? null);
    window.history.replaceState(null, "", `?${newParams.toString()}`);
  };

  return [search, setValue];
};
