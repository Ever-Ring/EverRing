import GatheringApi from "@apis/GatheringApi";
import { GatheringParams, Gathering } from "@customTypes/gathering";
import { INITIAL_GATHERINGS_FILTERS, LIMIT } from "@constants/filter";

export function getGatheringsQueryKey(filters?: Partial<GatheringParams>) {
  return ["gatherings", { ...INITIAL_GATHERINGS_FILTERS, ...filters }];
}

export async function getGatherings(
  params: Partial<GatheringParams> = {},
  pageParam: number = 0,
): Promise<{ data: Gathering[]; nextOffset: number }> {
  try {
    const requestParams = {
      limit: LIMIT,
      offset: pageParam,
      ...params,
    };

    const response = await GatheringApi.getGatherings(requestParams);

    const filteredData: Gathering[] = response.data
      ? response.data.filter((item: Gathering) => item.canceledAt === null)
      : [];

    return { data: filteredData, nextOffset: pageParam + LIMIT };
  } catch (error) {
    console.error("Error fetching gatherings:", error);
    return { data: [], nextOffset: pageParam };
  }
}
