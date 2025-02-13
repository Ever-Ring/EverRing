"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";

import { FormValues } from "@customTypes/form";
import { emailPattern } from "@constants/validationPatterns";
import Button from "@components/common/Button";
import InputForm from "@components/common/InputForm";
import useSignin from "@features/auth/hooks/useSignin";
import { Cookies } from "react-cookie";

export default function SigninForm() {
  const router = useRouter();
  const cookies = new Cookies();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
    trigger,
  } = useForm<FormValues>();

  const mutation = useSignin();

  const onSubmit = async (data: FormValues) => {
    mutation.mutate(data, {
      onSuccess: (response) => {
        if (response.status === 200) {
          const { token } = response.data;
          cookies.set("token", token, { path: "/" });
        }
        router.push("/");
      },
      onError: (error) => {
        if (error instanceof AxiosError && error.response?.data) {
          if (error.response?.data.code === "INVALID_CREDENTIALS") {
            setError("password", {
              type: "password",
              message: error.response?.data.message,
            });
          }

          if (error.response?.data.code === "USER_NOT_FOUND") {
            setError("email", {
              type: "email",
              message: error.response.data.message,
            });
          }
          if (error.response?.data.code === "VALIDATION_ERROR") {
            setError("email", {
              type: "email",
              message: error.response.data.message,
            });
          }
        }
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full flex-col gap-10"
    >
      <div className="flex w-full flex-col gap-6">
        <InputForm
          name="email"
          id="email"
          type="email"
          label="아이디"
          placeholder="아이디를 입력하세요"
          register={register}
          rules={{ required: "아이디를 입력해주세요", pattern: emailPattern }}
          errors={errors}
          onBlur={() => trigger("email")}
        />
        <InputForm
          name="password"
          id="password"
          label="비밀번호"
          type="password"
          placeholder="비밀번호를 입력하세요"
          register={register}
          rules={{
            required: "비밀번호를 입력해주세요",
          }}
          errors={errors}
          onBlur={() => trigger("password")}
        />
      </div>
      <Button
        text="로그인"
        // type="submit"
        disabled={!isValid}
        size="large"
        variant="solid"
      />
    </form>
  );
}
