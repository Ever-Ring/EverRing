import Button from "@components/common/Button";

export default function FooterSection() {
  // const router = useRouter();
  return (
    // TODO 임시 배경색- 추후 수정
    <section className="flex w-full flex-col items-center justify-between gap-10 bg-[#F8D57E] px-4 py-[3.75rem] md:px-6 md:py-[6.25rem] lg:px-[15%] lg:py-[7.5rem]">
      <div className="flex flex-col items-center gap-5">
        <h2 className="text-4xl font-bold text-black">
          저속노화, 지금 당장 에버링과 시작해요!
        </h2>
        {/* <p className="text-center text-base text-gray-800">추가설명 넣을까말까..</p> */}
      </div>
      <Button text="에버링 시작하기" size="small" />
    </section>
  );
}
