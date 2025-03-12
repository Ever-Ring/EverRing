/* eslint-disable react/no-array-index-key */
import ArrowLeft from "@assets/icon-arrow-default-left.svg";
import ArrowRight from "@assets/icon-arrow-default-right.svg";
import ArrowLeftDisabled from "@assets/icon-arrow-disabled-left.svg";
import PaginationButton from "@features/list-detail/components/PaginationButton";
import { generatePaginationRange } from "@features/list-detail/hooks/usePagination";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  return (
    <div className="flex items-center gap-2.5">
      <PaginationButton
        onClick={
          currentPage > 1 ? () => onPageChange(currentPage - 1) : undefined
        }
        disabled={currentPage === 1}
      >
        {currentPage === 1 ? <ArrowLeftDisabled /> : <ArrowLeft />}
      </PaginationButton>

      {generatePaginationRange(currentPage, totalPages).map((page, index) =>
        typeof page === "number" ? (
          <PaginationButton
            key={`page-${page}`}
            onClick={() => onPageChange(page)}
            disabled={page === currentPage}
            className={
              page === currentPage
                ? "bg-gray-200 font-bold text-gray-900"
                : "text-gray-200"
            }
          >
            {page}
          </PaginationButton>
        ) : (
          <span key={`dots-${index}`} className="px-2 text-gray-400">
            {page}
          </span>
        ),
      )}

      <PaginationButton
        onClick={
          currentPage < totalPages
            ? () => onPageChange(currentPage + 1)
            : undefined
        }
        disabled={currentPage === totalPages}
      >
        {currentPage === totalPages ? (
          <ArrowLeftDisabled className="rotate-180" />
        ) : (
          <ArrowRight />
        )}
      </PaginationButton>
    </div>
  );
}
