import { ShowcaseSlide } from "@features/landing/types/showcase";

/* eslint-disable import/prefer-default-export */
const leftColumnImages = [
  "/image/img-landing-login-page.svg",
  "/image/img-landing-signup-page.svg",
  "/image/img-landing-fav-page.svg",
  "/image/img-landing-list-detail-page.svg",
  "/image/img-landing-list-page-modal.svg",
  "/image/img-landing-list-page.svg",
  "/image/img-landing-mypage1.svg",
  "/image/img-landing-mypage2.svg",
  "/image/img-landing-mypage3.svg",
  "/image/img-landing-mypage4.svg",
  "/image/img-landing-mypage5.svg",
  "/image/img-landing-review-page.svg",
];

const rightColumnImages = [
  "/image/img-landing-login-page-mobile.svg",
  "/image/img-landing-signup-page-mobile.svg",
  "/image/img-landing-fav-page-mobile.svg",
  "/image/img-landing-list-detail-page-mobile.svg",
  "/image/img-landing-list-page-modal-mobile.svg",
  "/image/img-landing-list-page-mobile.svg",
  "/image/img-landing-mypage1-mobile.svg",
  "/image/img-landing-mypage2-mobile.svg",
  "/image/img-landing-mypage3-mobile.svg",
  "/image/img-landing-mypage4-mobile.svg",
  "/image/img-landing-mypage5-mobile.svg",
  "/image/img-landing-review-page-mobile.svg",
];

export const serviceShowcaseData: ShowcaseSlide[] = [
  {
    id: 0,
    type: "marquee",
    title: "저속노화,\n에버링과 함께하세요!",
    description: "건강한 삶을 위한 첫걸음,\n에버링에서 시작하세요",
    leftImages: leftColumnImages,
    rightImages: rightColumnImages,
    bgColor: "bg-green-700", // TODO 배경색 교체
  },
  {
    id: 2,
    type: "overlap",
    title: "저속노화를 위한 \n다양한 모임을 만들고, \n참여해보세요",
    description:
      "오프라인 모임인 나무링에서 가벼운 운동과 건강한 식습관을 배우고, \n온라인 모임인 구름링에서 관심사에 맞는 모임을 찾아 함께하세요.",
    images: [
      "/image/img-landing-list-page.svg",
      "/image/img-landing-list-page-modal-mobile.svg",
    ],
    bgColor: "bg-green-500", // TODO 배경색 교체
  },
  {
    id: 3,
    type: "sequence",
    title: "나의 활동을 \n한눈에 확인하세요",
    description: "내가 만든 모임, 참여한 모임, 작성한 리뷰를 모아볼 수 있어요.",
    images: [
      "/image/img-landing-mypage2-mobile.svg",
      "/image/img-landing-mypage3-mobile.svg",
      "/image/img-landing-mypage1-mobile.svg",
    ],
    bgColor: "bg-green-700", // TODO 배경색 교체
  },
];
