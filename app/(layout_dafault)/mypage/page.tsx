import MyProfile from "@features/mypage/components/MyProfile";
import MypageContent from "@features/mypage/components/MypageContent";

export default function Mypage() {
  return (
    <div className="flex h-full flex-col">
      <span className="sticky top-[56px] z-10 bg-gray-50 py-6 text-2xl font-semibold md:top-[60px] md:py-8">
        마이 페이지
      </span>
      <div className="flex flex-1 flex-col gap-y-7">
        <MyProfile />
        <MypageContent />
      </div>
    </div>
  );
}
