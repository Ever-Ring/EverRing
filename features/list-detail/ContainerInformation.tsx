function ContainerInformation() {
  return (
    <div className="flex w-full flex-col items-start gap-2.5 rounded-3xl border-2 border-gray-200 bg-white py-6">
      <div className="gap-11 self-stretch">
        <div className="gap-2.5 self-stretch px-6">
          <div className="gap-3">
            <div className="gap-0.5">
              <span className="text-lg font-semibold leading-7 text-gray-900">
                달램핏 오피스 스트레칭
              </span>
              <span className="text-sm font-medium leading-5 text-gray-700">
                을지로 3가 서울시 중구 청계천로 100
              </span>
            </div>
          </div>
        </div>
        <div className="w-full border-t-2 border-dashed border-gray-200" />
      </div>
    </div>
  );
}

export default ContainerInformation;
