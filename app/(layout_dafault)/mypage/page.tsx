// TODO MypageContent 작업이 완료되면 주석 풀기
// import MypageContent from "@features/mypage/components/MypageContent";
import MyProfile from "@features/mypage/components/MyProfile";

export default function Mypage() {
  return (
    <div className="flex h-full flex-col">
      <span className="sticky top-[56px] z-10 bg-gray-50 py-6 text-2xl font-semibold md:top-[60px] md:py-8">
        마이 페이지
      </span>
      <div className="flex flex-1 flex-col gap-y-7">
        <MyProfile />
        {/* <MypageContent /> */}
      </div>
    </div>
  );
}
