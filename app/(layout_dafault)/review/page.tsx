import Image from "next/image";
import ClientReviewContainer from "@features/review/components/ClientReviewContainer";

import { HydrationBoundary } from "@tanstack/react-query";
import { getServerReviewQuery } from "@features/review/hooks/useReviewQuery";
import { getDehydratedQuery } from "@lib/reactQueryUtils";

export default async function Review() {
  const { queryKey, queryFn } = getServerReviewQuery();

  const state = await getDehydratedQuery({ queryKey, queryFn });

  return (
    <HydrationBoundary state={state}>
      <div className="flex h-full w-full flex-col items-start pt-6 md:pt-8">
        <section className="flex items-center gap-4">
          <Image
            src="image/img-head-review.svg"
            alt="review head image"
            width={72}
            height={72}
          />
          <div className="flex flex-col items-start gap-2">
            <h1 className="text-lg font-semibold text-gray-900 md:text-2xl">
              모든 리뷰
            </h1>
            <h2 className="text-sm font-medium text-gray-700">
              에버링을 이용한 분들은 이렇게 느꼈어요🍀
            </h2>
          </div>
        </section>
        <ClientReviewContainer />
      </div>
    </HydrationBoundary>
  );
}
