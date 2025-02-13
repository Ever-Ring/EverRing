import Image from "next/image";

export default function MyProfile() {
  return (
    <div className="relative">
      <div className="h-16 rounded-t-3xl border-x-2 border-t-2 border-gray-200 bg-mint-400 pt-4">
        <div className="flex items-center justify-between px-6">
          <span className="text-lg font-semibold">내 프로필</span>
          <button type="button">
            <Image src="/image/edit.svg" alt="edit" width={32} height={32} />
          </button>
        </div>
        <hr className="mt-2 border border-mint-600" />
      </div>
      <Image
        src="/image/img-profile-large-default.svg"
        alt="profile image"
        width={56}
        height={56}
        className="absolute left-6 top-14 rounded-full border-2 border-white"
      />
      <div className="flex flex-col rounded-b-3xl border-x-2 border-b-2 border-gray-200 bg-white py-4 pl-24">
        <span className="text-base font-semibold">닉네임</span>
        <div className="flex flex-row gap-x-2">
          <div className="flex flex-col">
            <span className="text-sm font-medium">company.</span>
            <span className="text-sm font-medium">E-mail.</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-normal">회사명</span>
            <span className="text-sm font-normal">email@email.com</span>
          </div>
        </div>
      </div>
    </div>
  );
}
