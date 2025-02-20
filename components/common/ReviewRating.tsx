import HeartIcon from "@assets/icon-heart-default.svg";
import HalfHeartIcon from "@assets/icon-heart-half.svg";

function HeartImage({ isActive }: { isActive?: boolean }) {
  return (
    <HeartIcon className={`${isActive ? "fill-mint-400" : "fill-gray-200"}`} />
  );
}

const getDecimalPart = (number: number) => {
  return number % 1;
};

export default function ReviewRating({ score }: { score: number }) {
  // TODO: 소수인 경우 반쪽하트를 넣음. 추후 퍼센테이지별로 다르게 채우도록 바꿀 수도 있음.
  const decimalPart = getDecimalPart(score);

  return (
    <div className="flex flex-row items-start gap-[0.125rem]">
      {Array.from({ length: Math.floor(score) }).map((_, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <HeartImage key={`filled-${index}`} isActive />
      ))}
      {decimalPart > 0 && <HalfHeartIcon />}
      {Array.from({ length: Math.floor(5 - score) }).map((_, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <HeartImage key={`empty-${index}`} />
      ))}
    </div>
  );
}
