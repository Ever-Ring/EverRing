export const LOCATION_ITEMS = [
  "지역전체",
  "건대입구",
  "을지로3가",
  "신림",
  "홍대입구",
];

export const SORT_ITEMS = {
  list: ["정렬", "최신순", "마감 임박", "참여 인원순"],
  review: ["정렬", "오래된순", "평점 높은순", "평점 낮은순", "참여 인원순"],
};

export const sortMap: Record<string, string | undefined> = {
  정렬: undefined,
  최신순: "dateTime",
  "마감 임박": "registrationEnd",
  "참여 인원순": "participantCount",
};

export const INITIAL_GATHERINGS_FILTERS = {
  date: null,
  location: null,
  sortBy: null,
  sortOrder: null,
  type: "DALLAEMFIT",
} as const;

export const LIMIT = 10;
