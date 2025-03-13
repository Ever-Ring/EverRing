import { useEffect, RefObject } from "react";
import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import useUpdateUserInfo from "@features/mypage/hooks/useUpdateUserInfo";
import { FormValues } from "@customTypes/form";
import { AxiosError } from "axios";
import useUserStore from "@stores/userStore";
import { DEFAULT_USER_IMAGE } from "@constants/user";
import validateImageSize from "@features/mypage/utils/fileUtils";

export default function useEditProfile(
  userInfo: { companyName: string | null; image: string | null },
  onClose: () => void,
  fileInputRef: RefObject<HTMLInputElement | null>,
) {
  const { mutate: updateUserInfo } = useUpdateUserInfo();
  const queryClient = useQueryClient();
  const { register, handleSubmit, setValue, formState, trigger, watch } =
    useForm<FormValues>();

  useEffect(() => {
    if (userInfo) {
      setValue("companyName", userInfo.companyName ?? "");
      setValue("image", userInfo.image ?? DEFAULT_USER_IMAGE);
    }
  }, [userInfo, setValue]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    const isValidImageFile = validateImageSize(file);

    if (isValidImageFile) {
      setValue("image", URL.createObjectURL(file));
    } else {
      alert("파일 크기는 5MB 이하이어야 합니다.");
    }
  };

  const onSubmit = async (data: FormValues) => {
    const file = fileInputRef.current?.files?.[0];
    const formData = new FormData();
    formData.append("companyName", data.companyName ?? "");
    formData.append("image", file || (data.image ?? ""));

    updateUserInfo(formData, {
      onSuccess: () => {
        useUserStore.getState().setUser({
          ...useUserStore.getState(),
          companyName: data.companyName ?? null,
          image: data.image ?? null,
        });
        queryClient.invalidateQueries({ queryKey: ["userInfo"] });
        onClose();
      },
      onError: (error: Error) => {
        const axiosError = error as AxiosError;
        const errorMessage = axiosError.isAxiosError
          ? (axiosError.response?.data as { message?: string })?.message ||
            "에러가 발생했습니다."
          : axiosError.message;

        alert(errorMessage);
      },
    });
  };

  return {
    register,
    handleSubmit,
    setValue,
    formState,
    trigger,
    watch,
    handleFileChange,
    onSubmit,
  };
}
