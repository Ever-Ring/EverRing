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
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<{
    score: number;
    comment: string;
  }>({
    mode: "all",
  });
  const queryClient = useQueryClient();
  const { mutate: createReview } = useCreateReview();
  const MAX_RATING = 5;
  const MIN_COMMENT_LENGTH = 10;
  const MAX_COMMENT_LENGTH = 300;
  const commentValue = watch("comment", "");
  const scoreValue = watch("score");
  const isButtonDisabled =
    !scoreValue ||
    commentValue.length < MIN_COMMENT_LENGTH ||
    commentValue.length > MAX_COMMENT_LENGTH;

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
              placeholder="남겨주신 리뷰는 모임 운영 및 다른 회원 분들께 큰 도움이 됩니다."
              className={`h-24 w-full resize-none rounded-lg bg-gray-50 p-3 focus:outline-none ${errors.comment ? "border-2 border-red" : "focus:ring-2 focus:ring-mint-400"}`}
              {...register("comment", {
                required: "리뷰를 작성해주세요.",
                minLength: {
                  value: MIN_COMMENT_LENGTH,
                  message: `리뷰는 최소 ${MIN_COMMENT_LENGTH}자 이상이어야 합니다.`,
                },
                maxLength: {
                  value: MAX_COMMENT_LENGTH,
                  message: `리뷰는 최대 ${MAX_COMMENT_LENGTH}자까지 작성 가능합니다.`,
                },
              })}
            />
            {errors.comment && (
              <p className="mt-2 text-sm text-red">{errors.comment.message}</p>
            )}
            <div className="mt-2 text-right text-sm text-gray-500">
              {commentValue.length}/{MAX_COMMENT_LENGTH}자
            </div>
          </div>
          <div className="flex justify-end gap-x-2">
            <Button text="취소" variant="outlined" onClick={onClose} />
            <Button
              type="submit"
              text="저장"
              variant="solid"
              disabled={isButtonDisabled}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
