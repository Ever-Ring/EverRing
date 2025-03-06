import { QueryClient } from "@tanstack/react-query";
import { cache } from "react";

export const queryClientOptions = {
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60,
      retry: 1,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
  },
};

export const getQueryClient = cache(() => new QueryClient(queryClientOptions));
