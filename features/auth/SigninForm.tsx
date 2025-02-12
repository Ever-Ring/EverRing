"use client";

import Button from "@components/Button";
import InputForm from "@components/common/InputForm";
import { FormValues } from "@customTypes/form";
import { useForm } from "react-hook-form";
import signinUser from "@features/auth/signinUser";
import { emailPattern } from "@constants/validationPatterns";
// import { useRouter } from "next/router";

export default function SigninForm() {
  // const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
    trigger,
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    const { isSuccess, response } = await signinUser(data);
    if (isSuccess) {
      // 페이지 이동
      // router.push("/");
      console.log("로그인성공!");
    } else {
      if (response?.data.code === "INVALID_CREDENTIALS") {
        setError("password", {
          type: "password",
          message: response.data.message,
        });
      }
      if (response?.data.code === "USER_NOT_FOUND") {
        setError("email", {
          type: "email",
          message: response.data.message,
        });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
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

      <Button
        text="로그인"
        type="submit"
        disabled={!isValid}
        size="large"
        variant="solid"
      />
    </form>
  );
}
