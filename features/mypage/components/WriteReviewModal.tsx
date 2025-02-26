"use client";

import Image from "next/image";
import Button from "@components/common/Button";
import { useForm } from "react-hook-form";
import SvgHeart from "@assets/icon-heart-default.svg";
import useCreateReview from "@features/mypage/hooks/useCreateReview";
import { useQueryClient } from "@tanstack/react-query";
interface WriteReviewModalProps {
  gatheringId: number;
  isOpen: boolean;
  onClose: () => void;
}

export default function WriteReviewModal({
  gatheringId,
  isOpen,
  onClose,
}: WriteReviewModalProps) {
  if (!isOpen) return null;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm<{ score: number; comment: string }>();

  const queryClient = useQueryClient();

  const { mutate: createReview } = useCreateReview();

  const onSubmit = async (data: { score: number; comment: string }) => {
    console.log(data, "id:", gatheringId);
    createReview(
      {
        gatheringId,
        score: data.score,
        comment: data.comment,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["myReviews"] });
          onClose();
        },
        onError: (error) => {
          console.error(error);
        },
      },
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="mx-4 w-96 rounded-lg bg-white p-6">
        <div className="relative flex justify-between">
          <h2 className="mb-6 text-xl font-semibold">리뷰 쓰기</h2>
          <button
            type="button"
            className="absolute right-0 top-0"
            onClick={onClose}
            aria-label="닫기"
          >
            <Image src="/image/X.svg" alt="close" width={24} height={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="relative mb-6">
            <p className="mb-3 text-base font-semibold">
              만족스러운 경험이었나요?
            </p>
            <div className="flex items-center gap-x-2">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  onClick={() => setValue("score", value)}
                  className="cursor-pointer"
                  type="button"
                >
                  {/* TODO 애니메이션 구현. 피그마상의 애니메이션 구현하려면 단순히 하나의 svg로는 안될 것 같음. */}
                  <SvgHeart
                    className={`transition-all duration-300 ease-in-out ${
                      watch("score") >= value
                        ? "fill-mint-400"
                        : "fill-gray-300"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
          <div className="mb-6">
            <p className="mb-3 text-base font-semibold">
              경험에 대해 남겨주세요.
            </p>
            <textarea
              id="comment"
              placeholder="남겨주신 리뷰는 프로그램 운영 및 다른 회원 분들께 큰 도움이 됩니다."
              className="h-24 w-full resize-none rounded-lg bg-gray-50 p-3 focus:outline-none focus:ring-2 focus:ring-mint-400"
              {...register("comment")}
            />
          </div>
          <div className="flex justify-end gap-x-2">
            <Button text="취소" variant="outlined" onClick={onClose} />
            <Button type="submit" text="저장" variant="solid" />
          </div>
        </form>
      </div>
    </div>
  );
}
