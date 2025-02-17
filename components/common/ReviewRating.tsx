import HeartIcon from "@assets/icon-heart-default.svg";

function HeartImage({ isActive }: { isActive?: boolean }) {
  return (
    <HeartIcon className={`${isActive ? "fill-mint-400" : "fill-gray-200"}`} />
  );
}

export default function ReviewRating({ score }: { score: number }) {
  return (
    <div className="flex flex-row items-start gap-[0.125rem]">
      {Array.from({ length: score }).map((_, index) => (
        // 인덱스 경고 해제를 위해 nanoid 라이브러리까지 설치해야하나...?
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
