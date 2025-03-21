import { GATHERING_TYPE } from "@constants/gatheringType";

export const chipOptions = [
  { label: "에버 스트레칭", type: GATHERING_TYPE.OFFICE_STRETCHING },
  { label: "에버 푸드트립", type: GATHERING_TYPE.MINDFULNESS },
];

export const sortMap: Record<string, string> = {
  오래된순: "createdAt",
  "평점 높은순": "score",
  "평점 낮은순": "score",
  "참여 인원순": "participantCount",
};

export const DESC = "desc" as const;

export const ASC = "asc" as const;
