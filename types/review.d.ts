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

export interface User {
  teamId: number;
  id: number;
  name: string;
  image: string;
}
