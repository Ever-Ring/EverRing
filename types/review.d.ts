import { User } from "@customTypes/user";

export interface ReviewItemProps {
  review: Review;
}

export interface ReviewItemWithImageProps extends ReviewItemProps {
  hasUserInfo?: boolean;
}

export interface Review {
  teamId: number;
  id: number;
  score: number;
  comment: string;
  createdAt: string;
  Gathering: Gathering;
  User: User;
}

export interface ReviewListProps {
  reviewData: Review[];
  hasImage?: boolean;
}

export interface ReviewListWithImageProps {
  reviewData: Review[];
  hasUserInfo?: boolean;
}

export interface ReviewListState {
  tabIndex: number;
  chipIndex: number;
  type: GatheringType;
  location: string;
  date?: string;
  sort: string;
}

export interface Scores {
  teamId: number;
  // gatheringId: 0, 얘가 무슨 역할을 하는지 아직 모르겠음..
  type: string;
  averageScore: number;
  oneStar: number;
  twoStars: number;
  threeStars: number;
  fourStars: number;
  fiveStars: number;
}

interface InitialReviewData {
  reviewData: Review[];
  totalItemCount: number;
  currentPage: number;
  totalPages: number;
}

// TODO: Gathering과 User는 추후 다른 곳에서 사용될 때 관련 파일로 옮길 예정
export interface Gathering {
  teamId: number;
  id: number;
  type: string;
  name: string;
  dateTime: string;
  location: string;
  image: string;
}
