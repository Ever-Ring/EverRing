import ReviewItem from "@components/common/ReviewItem";

interface Review {
  teamId: number;
  id: number;
  score: number;
  comment: string;
  createdAt: Date;
  Gathering: {
    teamId: number;
    id: number;
    type: string;
    name: string;
    dateTime: Date;
    location: string;
    image: string;
  };
  User: {
    teamId: number;
    id: number;
    name: string;
    image: string;
  };
}

interface ReviewListProps {
  reviewData: Review[];
}

export default function ReviewList({ reviewData }: ReviewListProps) {
  return (
    <ol className="flex flex-col items-start gap-6 self-stretch">
      {reviewData.map((review) => (
        <ReviewItem
          key={review.id}
          score={review.score}
          comment={review.comment}
          userImage={review.User.image}
          userName={review.User.name}
          gatheringImage={review.Gathering.image}
          gatheringName={review.Gathering.name}
          gatheringLocation={review.Gathering.location}
          createdAt={review.createdAt}
        />
      ))}
    </ol>
  );
}
