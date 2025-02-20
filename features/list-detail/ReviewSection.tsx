import ReviewList from "@components/common/ReviewList";
import Pagination from "@features/list-detail/Pagination";

const reviews = [
  {
    teamId: 0,
    id: 0,
    score: 4,
    comment: "리뷰1",
    createdAt: new Date("2025-02-13T09:27:32.804Z"),
    Gathering: {
      teamId: 0,
      id: 0,
      type: "string",
      name: "모임1",
      dateTime: new Date("2025-02-13T09:27:32.804Z"),
      location: "홍대입구",
      image: "/image/dummyImage.png",
    },
    User: {
      teamId: 0,
      id: 0,
      name: "네임1",
      image: "/image/img-profile-large-default",
    },
  },
];

export default function ReviewSection() {
  return (
    <div className="inline-flex h-[687px] flex-shrink-0 flex-col items-center gap-6 border-t-2 border-gray-200 bg-white p-6">
      <div className="flex flex-col items-start gap-4">
        <span className="text-lg font-semibold text-gray-900">
          이용자들은 이 프로그램을 이렇게 느꼈어요!
        </span>
        <div className="flex flex-col items-start gap-4">
          <ReviewList reviewData={reviews} />
        </div>
      </div>
      <Pagination />
    </div>
  );
}
