import Image from "next/image";
import { useRouter } from "next/navigation";

export default function FooterSection() {
  const router = useRouter();
  return (
    <section className="mt-[3.75rem] flex w-full flex-col items-center justify-between gap-10 bg-mint-100 px-4 py-[3.75rem] md:mt-[6.25rem] md:px-6 md:py-[6.25rem] lg:mt-[7.5rem] lg:px-[15%] lg:py-[7.5rem]">
      <div className="flex flex-col items-center gap-5">
        <h2 className="text-center text-3xl font-bold text-black md:text-4xl">
          건강한 삶, <br />
          지금 당장 에버링과 시작해요!
        </h2>
      </div>

      <button
        type="button"
        onClick={() => router.push("/signup")}
        className="flex w-fit items-center justify-center gap-2 whitespace-nowrap rounded-3xl border bg-mint-600 px-[3.125rem] py-4 text-white transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl"
      >
        <span className="text-center font-pretendard text-sm font-semibold leading-6 text-white transition-colors md:text-base">
          에버링 가입하기
        </span>
        <Image
          src="/image/arrow_right_white.svg"
          alt="에버링 회원가입 버튼"
          width={18}
          height={18}
        />
      </button>
    </section>
  );
}
