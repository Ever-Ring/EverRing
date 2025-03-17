import { useMemo } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

export const useQueryString = (
  key: string,
  defaultValue: string | null = null,
): [string | null, (value: string | null) => void] => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const search = useMemo(
    () => searchParams.get(key) ?? defaultValue,
    [searchParams, key],
  );

  const setValue = (value: string | null) => {
    const newParams = new URLSearchParams(searchParams.toString());

    if (value === null || value === "") {
      newParams.delete(key);
    } else {
      newParams.set(key, value);
    }

    const newUrl = `${pathname}?${newParams.toString()}`;

    router.replace(newUrl);
  };

  return [search, setValue];
};
