"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";

import { FormValues } from "@customTypes/form";
import { emailPattern, passwordPattern } from "@constants/validationPatterns";
import Button from "@components/common/Button";
import InputForm from "@components/common/InputForm";
import useSignup from "@features/auth/hooks/useSignup";

export default function SignupForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
    trigger,
    watch,
  } = useForm<FormValues>();

  const mutation = useSignup();

  const onSubmit = async (data: FormValues) => {
    const { passwordConfirm, ...formData } = data;

    mutation.mutate(formData, {
      onSuccess: (response) => {
        if (response.status === 201) {
          console.log("성공", response);
          // TODO: 로그인성공 popup 띄우기
        }
        router.push("/");
      },
      onError: (error) => {
        console.log(error);
        if (error instanceof AxiosError && error.response?.data) {
          if (error.response?.data.code === "VALIDATION_ERROR") {
            setError("email", {
              type: "email",
              message: error.response.data.message,
            });
          }
          if (error.response?.data.code === "EMAIL_EXISTS") {
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
          name="name"
          id="name"
          type="text"
          label="이름"
          labelTextSize="sm"
          placeholder="이름을 입력해주세요"
          register={register}
          rules={{ required: "이름을 입력해주세요" }}
          errors={errors}
          onBlur={() => trigger("name")}
        />
        <InputForm
          name="email"
          id="email"
          type="email"
          label="아이디"
          labelTextSize="sm"
          placeholder="아이디를 입력해주세요"
          register={register}
          rules={{ required: "아이디를 입력해주세요", pattern: emailPattern }}
          errors={errors}
          onBlur={() => trigger("email")}
        />
        {/* 회사명 대신 소속으로 사용할 것 */}
        <InputForm
          name="companyName"
          id="companyName"
          type="text"
          label="소속"
          labelTextSize="sm"
          placeholder="소속을 입력해주세요(학생,회사원 등)"
          register={register}
          rules={{ required: "소속을 입력해주세요" }}
          errors={errors}
          onBlur={() => trigger("companyName")}
        />
        <InputForm
          name="password"
          id="password"
          label="비밀번호"
          labelTextSize="sm"
          type="password"
          placeholder="비밀번호를 입력해주세요"
          register={register}
          rules={{
            required: "비밀번호를 입력해주세요",
            pattern: passwordPattern,
          }}
          errors={errors}
          onBlur={() => trigger("password")}
        />
        <InputForm
          name="passwordConfirm"
          id="passwordConfirm"
          label="비밀번호 확인"
          labelTextSize="sm"
          type="password"
          placeholder="비밀번호를 입력해주세요"
          register={register}
          rules={{
            required: "비밀번호를 다시 한 번 입력해주세요",
            validate: (value: string) =>
              value === watch("password") || "비밀번호가 일치하지 않습니다.",
          }}
          errors={errors}
          onBlur={() => trigger("passwordConfirm")}
        />
      </div>
      <Button
        text="회원가입"
        type="submit"
        disabled={!isValid}
        size="large"
        variant="solid"
      />
    </form>
  );
}
