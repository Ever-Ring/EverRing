import PaginationButton from "@features/list-detail/PaginationButton";
import ArrowLeft from "@assets/icon-arrow-default-left.svg";
import ArrowRight from "@assets/icon-arrow-default-right.svg";
// import ArrowLeftDisabled from "@assets/icon-arrow-disabled-left.svg";

export default function Pagination() {
  return (
    <div className="flex items-start gap-2.5">
      <PaginationButton>
        <ArrowLeft />
      </PaginationButton>
      <div className="flex items-start gap-1">
        <PaginationButton>
          <span className="text-center text-base font-semibold text-[#1F1F1F]">
            1
          </span>
        </PaginationButton>
      </div>
      <PaginationButton>
        <ArrowRight />
      </PaginationButton>
    </div>
  );
}
