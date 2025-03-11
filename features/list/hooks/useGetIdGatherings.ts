import { useQuery } from "@tanstack/react-query";
import GatheringApi from "@apis/GatheringApi";
import { useFavoriteStore } from "@stores/favoriteStore";
import { Gathering, GatheringParams } from "@customTypes/gathering";

export function useGetIdGatherings(filters: GatheringParams) {
  const favorites = useFavoriteStore((state) => state.favorites);

  return useQuery<Gathering[]>({
    queryKey: ["favorite-gatherings", favorites, filters],
    queryFn: async () => {
      if (favorites.length === 0) return [];
      const response = await GatheringApi.getGatherings({
        id: favorites.join(","),
        ...filters,
      });
      return response.data;
    },
    enabled: favorites.length > 0,
    staleTime: 5000,
    placeholderData: (previousData) =>
      favorites.length === 0 ? [] : (previousData ?? []),
  });
}
