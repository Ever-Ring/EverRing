import { FormValues } from "@customTypes/form";
import { AxiosError } from "axios";
import { UseFormSetError } from "react-hook-form";

const handleAuthMutationError = (
  error: unknown,
  setError: UseFormSetError<FormValues>,
) => {
  if (error instanceof AxiosError && error.response?.data) {
    const { code, message } = error.response.data;

    if (code === "INVALID_CREDENTIALS") {
      setError("password", { type: "password", message });
    }

    if (
      code === "USER_NOT_FOUND" ||
      code === "VALIDATION_ERROR" ||
      code === "EMAIL_EXISTS"
    ) {
      setError("email", { type: "email", message });
    }
  }
};

export default handleAuthMutationError;
