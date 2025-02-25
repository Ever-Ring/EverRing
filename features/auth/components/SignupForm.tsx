"use client";

import { useForm } from "react-hook-form";
import { FormValues } from "@customTypes/form";
import { emailPattern, passwordPattern } from "@constants/validationPatterns";
import Button from "@components/common/Button";
import InputForm from "@components/common/InputForm";
import useSignup from "@features/auth/hooks/useSignup";
import handleAuthMutationError from "@features/auth/utils/handleMutationError";
import AlertModal from "@components/common/AlertModal";
import ModalPortal from "@components/common/ModalPortal";
import useModalStore from "@stores/modalStore";
import { useEffect } from "react";
import useDebounce from "@features/auth/hooks/useDebounce";

export default function SignupForm() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
    trigger,
    watch,
  } = useForm<FormValues>();

  const emailValue = watch("email");
  const passwordValue = watch("password");
  const passwordConfirmValue = watch("passwordConfirm");

  const debouncedEmail = useDebounce(emailValue, 1000);
  const debouncedPassword = useDebounce(passwordValue, 1000);
  const debouncedPasswordConfirm = useDebounce(passwordConfirmValue, 1000);

  useEffect(() => {
    if (debouncedEmail) {
      trigger("email");
    }
    if (debouncedPassword) {
      trigger("password");
    }
    if (debouncedPasswordConfirm) {
      trigger("passwordConfirm");
    }
  }, [debouncedEmail, debouncedPassword, debouncedPasswordConfirm, trigger]);

  // TODO debouncedValue를 객체로 만들어서 한 번에 관리하는 방식과 위의 버전 중 어느 것이 더 나을까요..
  // const debouncedValues = useMemo(
  //   () => ({
  //     email: debouncedEmail,
  //     password: debouncedPassword,
  //     passwordConfirm: debouncedPasswordConfirm,
  //   }),
  //   [debouncedEmail, debouncedPassword, debouncedPasswordConfirm],
  // );

  // useEffect(() => {
  //   if (debouncedValues.email) {
  //     trigger("email");
  //   }
  //   if (debouncedValues.password) {
  //     trigger("password");
  //   }
  //   if (debouncedValues.passwordConfirm) {
  //     trigger("passwordConfirm");
  //   }
  // }, [debouncedValues, trigger]);

  const mutation = useSignup();

  const onSubmit = async (data: FormValues) => {
    const { passwordConfirm, ...formData } = data;

    mutation.mutate(formData, {
      onError: (error) => {
        handleAuthMutationError(error, setError);
      },
    });
  };

  const { isOpen, modalOptions, closeModal, confirmAction } = useModalStore();

  return (
    <>
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
          <InputForm
            name="companyName"
            id="companyName"
            type="text"
            label="직업 / 소속"
            labelTextSize="sm"
            placeholder="직업 혹은 소속을 입력해주세요"
            register={register}
            rules={{ required: "직업 혹은 소속을 입력해주세요" }}
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
      <ModalPortal>
        <AlertModal
          isOpen={isOpen}
          text={modalOptions?.text || ""}
          hasTwoButton={modalOptions?.hasTwoButton}
          onClose={closeModal}
          onConfirm={confirmAction}
        />
      </ModalPortal>
    </>
  );
}
