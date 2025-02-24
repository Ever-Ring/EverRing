/* eslint-disable react/no-array-index-key */
import PaginationButton from "@features/list-detail/components/PaginationButton";
import ArrowLeft from "@assets/icon-arrow-default-left.svg";
import ArrowRight from "@assets/icon-arrow-default-right.svg";
import ArrowLeftDisabled from "@assets/icon-arrow-disabled-left.svg";

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
  const getPaginationRange = () => {
    const range: (number | string)[] = [];
    const totalVisiblePages = 5;

    if (totalPages <= totalVisiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const sidePages = Math.floor(totalVisiblePages / 2);
    let leftSibling = Math.max(currentPage - sidePages, 2);
    let rightSibling = Math.min(currentPage + sidePages, totalPages - 1);

    if (currentPage <= 3) {
      leftSibling = 2;
      rightSibling = Math.min(4, totalPages - 1);
    } else if (currentPage >= totalPages - 2) {
      leftSibling = Math.max(totalPages - 3, 2);
      rightSibling = totalPages - 1;
    }

    range.push(1);

    if (leftSibling > 2) range.push("...");

    for (let i = leftSibling; i <= rightSibling; i += 1) {
      range.push(i);
    }

    if (rightSibling < totalPages - 1) range.push("...");

    if (totalPages > 1) range.push(totalPages);

    return range;
  };

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

      {getPaginationRange().map((page, index) =>
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
