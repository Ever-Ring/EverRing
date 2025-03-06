// TODO 공통 컴포넌트로 사용될 수 있게

import Image from "next/image";
import { IMAGES } from "@constants/gathering";

interface GatheringClosureNoticeProps {
  isCanceled?: boolean;
}

export default function GatheringClosureNotice({
  isCanceled,
}: GatheringClosureNoticeProps) {
  const message = isCanceled
    ? "모집 취소된 모임이에요,"
    : "모집이 마감된 모임이에요,";

  if (!isCanceled) return null;
  return (
    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center rounded-[1.5rem] bg-black/70 text-lg font-medium text-white">
      <p>{message}</p>
      <p>다음 기회에 만나요 🙏</p>
      <Image
        src={IMAGES.BYE}
        alt="BYE"
        width={48}
        height={48}
        className="absolute top-[64%] sm:right-6 sm:top-6"
      />
    </div>
  );
}
