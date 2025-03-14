import { axiosInstance } from "@lib/axios";
import { Gathering } from "@customTypes/gathering";
import { QueryKey } from "@tanstack/react-query";

export default function getServerGatheringQuery(gatheringId: number) {
  const queryKey: QueryKey = ["gathering", gatheringId];
  const queryFn = async (): Promise<Gathering> => {
    const response = await axiosInstance.get(`/gatherings/${gatheringId}`);
    return response.data;
  };

  return { queryKey, queryFn };
}
