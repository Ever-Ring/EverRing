"use client";

import {
  QueryClient,
  QueryClientProvider,
  Query,
  defaultShouldDehydrateQuery,
} from "@tanstack/react-query";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ReactNode, useState } from "react";

const queryClientOptions = {
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60, // 지금은 일단 1분... 어떻게 할까요
      retry: 1,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
    dehydrate: {
      shouldDehydrateQuery: (query: Query) =>
        defaultShouldDehydrateQuery(query) || query.state.status === "pending",
    },
  },
};

export default function ReactQueryProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [queryClient] = useState(new QueryClient(queryClientOptions));

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
