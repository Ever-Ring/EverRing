import ReviewApi from "@apis/ReviewApi";
import { INITIAL_PARAMS } from "@features/review/constants/query";
import { ReviewQueryParams } from "@customTypes/reviewApi";
import { Review } from "@customTypes/review";

interface ReviewPage {
  data: Review[];
  totalItemCount: number;
}

function getReviewQueryKey(filter: ReviewQueryParams = INITIAL_PARAMS) {
  const sortedFilter = Object.keys(filter)
    .sort()
    .reduce((acc, key) => {
      acc[key as keyof ReviewQueryParams] =
        filter[key as keyof ReviewQueryParams];
      return acc;
    }, {} as ReviewQueryParams);

  return ["reviews", sortedFilter];
}

async function getReviewData(params: ReviewQueryParams, offset: number = 0) {
  const response = await ReviewApi.getReviewData({
    ...params,
    offset,
  });
  return {
    data: response.data.data,
    totalItemCount: response.data.totalItemCount,
  };
}

export function getServerReviewQuery() {
  return {
    queryKey: getReviewQueryKey(),
    queryFn: () => getReviewData(INITIAL_PARAMS),
  };
}

export function getClientReviewQuery(filter: ReviewQueryParams) {
  return {
    queryKey: getReviewQueryKey(filter),
    queryFn: async ({ pageParam = 0 }) => getReviewData(filter, pageParam),
    getNextPageParam: (lastPage: ReviewPage, allPages: ReviewPage[]) => {
      if (!lastPage) return undefined;
      const loadedItems = allPages.flatMap((page) => page.data).length;
      return loadedItems < lastPage.totalItemCount ? loadedItems : undefined;
    },
    initialPageParam: 0,
  };
}
