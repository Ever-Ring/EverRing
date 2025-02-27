import { useQuery } from "@tanstack/react-query";
import GatheringApi from "@apis/GatheringApi";
import { useFavoriteStore } from "@stores/favoriteStore";
import { Gathering } from "@customTypes/gathering";

export function useGetIdGatherings() {
  const favorites = useFavoriteStore((state) => state.favorites);

  return useQuery<Gathering[]>({
    queryKey: ["favorite-gatherings", favorites],
    queryFn: async () => {
      if (favorites.length === 0) return [];
      const response = await GatheringApi.getGatherings({
        id: favorites.join(","),
      });
      return response.data;
    },
    enabled: favorites.length > 0,
    staleTime: 5000,
    placeholderData: (previousData) =>
      favorites.length === 0 ? [] : (previousData ?? []),
  });
}
