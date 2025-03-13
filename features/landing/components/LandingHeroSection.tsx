import Image from "next/image";
import { useRouter } from "next/navigation";

export default function LandingHero() {
  const router = useRouter();
  return (
    <section className="flex w-full flex-col items-center justify-center gap-10 px-4 py-[3.75rem] md:px-6 lg:flex-row lg:justify-between lg:px-[15%] lg:py-[7.5rem]">
      <div className="flex w-full flex-col items-center gap-[1.875rem] lg:w-[40.5rem] lg:items-start lg:gap-10">
        <div className="flex flex-col items-center gap-5 lg:items-start">
          <h1 className="text-center text-3xl font-bold md:text-5xl lg:text-start">
            함께 즐기는
            <br />
            건강한 삶, 에버링
          </h1>
          <p className="text-center text-base md:text-xl lg:text-start">
            건강한 저속노화를 위한 모임을 만들고, 참여하고, 나누는 경험.
            <br />
            에버링에서 함께하세요!
          </p>
        </div>

        <button
          type="button"
          onClick={() => router.push("/list")}
          className="flex w-fit items-center justify-center gap-2 whitespace-nowrap rounded-3xl border bg-mint-600 px-[3.125rem] py-4 text-white transition-colors hover:bg-mint-700 active:bg-mint-800"
        >
          <span className="text-center font-pretendard text-sm font-semibold leading-6 text-white transition-colors md:text-base">
            에버링 시작하기
          </span>
          <Image
            src="/image/icon-landing-RocketLaunch.svg"
            alt="에버링 시작하기 버튼"
            width={18}
            height={18}
          />
        </button>
      </div>
      <Image
        alt="header-image"
        src="/image/img-landing-hero-green.svg"
        width={450}
        height={450}
      />
    </section>
  );
}
