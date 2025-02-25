import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import useDebounce from "@features/auth/hooks/useDebounce";

export default function useDebouncedValidation(fieldName: string) {
  const { watch, trigger } = useFormContext();
  const fieldValue = watch(fieldName);
  const debouncedValue = useDebounce(fieldValue, 1000);

  useEffect(() => {
    if (debouncedValue) {
      trigger(fieldName);
    }
  }, [debouncedValue, trigger, fieldName]);
}
