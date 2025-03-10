export const updateParams = (
  key: string,
  value: string | null,
  searchParams: URLSearchParams,
  router: any,
  pathname: string,
) => {
  const params = new URLSearchParams(searchParams.toString());

  if (value === null) {
    params.delete(key);
  } else {
    params.set(key, value);
  }

  router.replace(`${pathname}?${params.toString()}`);
};

export const setSelectedTabIndex = (
  index: number,
  searchParams: URLSearchParams,
  router: any,
  pathname: string,
) => {
  const params = new URLSearchParams(searchParams.toString()); // ✅ 기존 searchParams 활용

  params.set("tab", String(index));
  params.set("type", index === 1 ? "WORKATION" : "DALLAEMFIT");

  params.delete("location");
  params.delete("date");
  params.delete("sort");

  router.replace(`${pathname}?${params.toString()}`);
};
