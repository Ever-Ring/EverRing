export interface CommonReviewParams {
  gatheringId?: number;
  type?: "DALLAEMFIT" | "OFFICE_STRETCHING" | "MINDFULNESS" | "WORKATION";
}

export interface ReviewQueryParams extends CommonReviewParams {
  userId?: number;
  location?: string;
  // location?: "건대입구" | "을지로3가" | "신림" | "홍대입구" | "지역전체";
  date?: string;
  registrationEnd?: string;
  // sortBy?: "createdAt" | "score" | "participantCount" | undefined;
  sortBy?: string;

  sortOrder?: "asc" | "desc";
  limit?: number;
  offset?: number;
}

// export interface Location {
//   location?: "건대입구" | "을지로3가" | "신림" | "홍대입구" | "지역전체";
// }

export interface ReviewScoreQueryParams extends CommonReviewParams {}
