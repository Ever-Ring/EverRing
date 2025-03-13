import Image from "next/image";
import HeartIcon from "@assets/icon-heart-default.svg";

function HeartImage({ isActive }: { isActive?: boolean }) {
  return (
    <HeartIcon
      className={`${isActive ? "fill-mint-400" : "fill-gray-200"} shrink-0`}
    />
  );
}

const getDecimalPart = (number: number) => {
  return number % 1;
};

export default function ReviewRating({ score }: { score: number }) {
  const decimalPart = getDecimalPart(score);

  return (
    <div className="flex flex-row items-start gap-[0.125rem]">
      {Array.from({ length: Math.floor(score) }).map((_, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <HeartImage key={`filled-${index}`} isActive />
      ))}
      {decimalPart > 0 && (
        <Image
          src="/image/icon-heart-half.svg"
          alt="별점"
          width={24}
          height={24}
        />
      )}
      {Array.from({ length: Math.floor(5 - score) }).map((_, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <HeartImage key={`empty-${index}`} />
      ))}
    </div>
  );
}
