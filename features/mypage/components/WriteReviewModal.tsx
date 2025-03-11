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
  const { register, handleSubmit, watch, setValue } = useForm<{
    score: number;
    comment: string;
  }>();
  const queryClient = useQueryClient();
  const { mutate: createReview } = useCreateReview();
  const MAX_RATING = 5;

  const onSubmit = async (data: { score: number; comment: string }) => {
    createReview(
      {
        gatheringId,
        score: data.score,
        comment: data.comment,
      },
      {
        onSuccess: () => {
          ["myReviews", "gatheringsJoined"].forEach((key) =>
            queryClient.invalidateQueries({ queryKey: [key] }),
          );
          onClose();
        },
        onError: (error) => {
          // TODO 에러 핸들링 어떻게 할 것인지
          console.error(error);
        },
      },
    );
  };
  if (!isOpen) return null;

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
              {Array.from({ length: MAX_RATING }, (_, index) => index + 1).map(
                (value) => (
                  <button
                    key={value}
                    onClick={() => {
                      setValue("score", value);
                    }}
                    className="relative cursor-pointer"
                    type="button"
                  >
                    <SvgHeart className="fill-gray-300" />
                    <SvgHeart
                      className={`absolute left-0 top-0 transition-all duration-500 ease-in-out ${
                        watch("score") >= value
                          ? "scale-100 fill-mint-400"
                          : "scale-0 fill-gray-300"
                      }`}
                    />
                  </button>
                ),
              )}
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
