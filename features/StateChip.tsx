import Image from "next/image";

interface StateChipProps {
  completed?: boolean;
  isPending?: boolean;
}

export default function StateChip({ completed, isPending }: StateChipProps) {
  return (
    <div className="flex flex-row gap-x-2">
      <div
        className={`box-border flex items-center rounded-full border-2 border-transparent px-3 py-1 ${
          completed ? "bg-gray-200 text-gray-500" : "bg-mint-100 text-mint-600"
        }`}
      >
        <p>{completed ? "이용 완료" : "이용 예정"}</p>
      </div>
      {!completed && (
        <div
          className={`box-border rounded-full px-3 py-1 ${
            isPending
              ? "border-2 border-gray-200 bg-white text-gray-500"
              : "border-2 border-mint-100 bg-white text-mint-500"
          }`}
        >
          {isPending ? (
            <p>개설 대기</p>
          ) : (
            <div className="flex items-center gap-x-1">
              <Image
                src="/image/check.svg"
                alt="check"
                width={16}
                height={16}
              />
              <p>개설 확정</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
