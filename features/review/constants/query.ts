/* eslint-disable import/prefer-default-export */
import { DESC } from "@features/review/constants/review";
import { GATHERING_TYPE } from "@constants/gatheringType";

export const INITIAL_PARAMS = {
  type: GATHERING_TYPE.DALLAEMFIT,
  location: undefined,
  date: undefined,
  sortBy: undefined,
  sortOrder: DESC,
  limit: 10,
};
