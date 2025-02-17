export interface ReviewItemProps {
  score: number;
  comment: string;
  userImage: string;
  userName: string;
  createdAt: Date;
}

export interface ReviewItemWithImageProps extends ReviewItemProps {
  gatheringImage: string;
  gatheringName: string;
  gatheringLocation: string;
  hasUserInfo?: boolean;
}

export interface Review {
  teamId: number;
  id: number;
  score: number;
  comment: string;
  createdAt: Date;
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
  dateTime: Date;
  location: string;
  image: string;
}

export interface User {
  teamId: number;
  id: number;
  name: string;
  image: string;
}
