export interface CommonReviewParams {
  gatheringId?: number;
  type?: "DALLAEMFIT" | "OFFICE_STRETCHING" | "MINDFULNESS" | "WORKATION";
}

export interface ReviewQueryParams extends CommonReviewParams {
  userId?: number;
  location?: "건대입구" | "을지로3가" | "신림" | "홍대입구";
  date?: string;
  registrationEnd?: string;
  sortBy?: "createdAt" | "score" | "participantCount";
  sortOrder?: "asc" | "desc";
  limit?: number;
  offset?: number;
}

export interface ReviewScoreQueryParams extends CommonReviewParams {}
