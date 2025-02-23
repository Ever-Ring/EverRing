export interface CommonReviewParams {
  gatheringId?: number;
  type?: "DALLAEMFIT" | "OFFICE_STRETCHING" | "MINDFULNESS" | "WORKATION";
}

export interface ReviewQueryParams extends CommonReviewParams {
  userId?: number;
  type: GatheringType;
  location?: string;
  date?: string;
  registrationEnd?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  limit?: number;
  offset?: number;
}

export interface ReviewScoreQueryParams extends CommonReviewParams {}
