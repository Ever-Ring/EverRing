// TODO MypageContent 작업이 완료되면 주석 풀기
// import MypageContent from "@features/mypage/components/MypageContent";
import MyProfile from "@features/mypage/components/MyProfile";

export default function Mypage() {
  return (
    <div className="flex h-full flex-col gap-y-7">
      <span className="text-2xl font-semibold">마이 페이지</span>
      <div className="flex-1 space-y-7 overflow-y-auto">
        <MyProfile />
        {/* <MypageContent /> */}
      </div>
    </div>
  );
}
