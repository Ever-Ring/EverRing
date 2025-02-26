/* eslint-disable import/extensions */
import FloatingBar from "features/list-detail/FloatingBar";

export default function Home() {
  return (
    <FloatingBar
      type="twoButton"
      primaryButtonText="자세히 보기"
      secondaryButtonText="신청하기"
    />
  );
}
