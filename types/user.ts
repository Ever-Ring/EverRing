export interface User {
  teamId: number;
  id: number;
  name: string;
  image: string;
  email?: string;
  companyName?: string;
  createdAt?: string;
  updatedAt?: string;
}

// 전역으로 관리할 유저 정보
export interface UserStore {
  id: number | null;
  name: string | null;
  image: string | null;
  email: string | null;
  companyName: string | null;
}
