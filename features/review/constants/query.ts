/* eslint-disable import/prefer-default-export */
import { DESC } from "@features/review/constants/review";
import { GATHERING_TYPE } from "@constants/gatheringType";

// TODO 아직 데이터가 많이 없어서 임시로 limit 작게 설정 - 배포 전 10으로 수정
export const INITIAL_PARAMS = {
  type: GATHERING_TYPE.DALLAEMFIT,
  location: undefined,
  date: undefined,
  sortBy: undefined,
  sortOrder: DESC,
  limit: 2,
  offset: 0,
};
