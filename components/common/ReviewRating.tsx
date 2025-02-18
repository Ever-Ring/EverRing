import HeartIcon from "@assets/icon-heart-default.svg";

function HeartImage({ isActive }: { isActive?: boolean }) {
  return (
    <HeartIcon className={`${isActive ? "fill-mint-400" : "fill-gray-200"}`} />
  );
}

export default function ReviewRating({ score }: { score: number }) {
  // TODO: 만약 score가 소수라면 하트를 어떻게 해야하지....
  return (
    <div className="flex flex-row items-start gap-[0.125rem]">
      {Array.from({ length: score }).map((_, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <HeartImage key={`filled-${index}`} isActive />
      ))}
      {Array.from({ length: 5 - score }).map((_, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <HeartImage key={`empty-${index}`} />
      ))}
    </div>
  );
}
