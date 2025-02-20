export const GATHERING_TYPE = {
  DALLAEMFIT: "DALLAEMFIT",
  OFFICE_STRETCHING: "OFFICE_STRETCHING",
  MINDFULNESS: "MINDFULNESS",
  WORKATION: "WORKATION",
} as const;

export type GatheringType = keyof typeof GATHERING_TYPE;

export const GATHERING_TYPE_MAP: Record<GatheringType, string> = {
  DALLAEMFIT: "나무링",
  OFFICE_STRETCHING: "에버 스트레칭",
  MINDFULNESS: "에버 푸드트립",
  WORKATION: "구름링",
};
