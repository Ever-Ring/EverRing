const TOTAL_VISIBLE_PAGES = 5;
const SIDE_PAGES = Math.floor(TOTAL_VISIBLE_PAGES / 2);
const EDGE_PAGE_COUNT = 3;

export const createSimplePagination = (totalPages: number): number[] => {
  return Array.from({ length: totalPages }, (_, i) => i + 1);
};

export const calculatePageRange = (
  currentPage: number,
  totalPages: number,
): { leftSibling: number; rightSibling: number } => {
  if (currentPage <= EDGE_PAGE_COUNT) {
    return {
      leftSibling: 2,
      rightSibling: TOTAL_VISIBLE_PAGES - 1,
    };
  }

  if (currentPage >= totalPages - EDGE_PAGE_COUNT + 1) {
    return {
      leftSibling: totalPages - TOTAL_VISIBLE_PAGES + 2,
      rightSibling: totalPages - 1,
    };
  }

  return {
    leftSibling: Math.max(2, currentPage - SIDE_PAGES),
    rightSibling: Math.min(totalPages - 1, currentPage + SIDE_PAGES),
  };
};

export const generatePaginationRange = (
  currentPage: number,
  totalPages: number,
): (number | string)[] => {
  if (totalPages <= TOTAL_VISIBLE_PAGES) {
    return createSimplePagination(totalPages);
  }

  const range: (number | string)[] = [1];
  const { leftSibling, rightSibling } = calculatePageRange(
    currentPage,
    totalPages,
  );

  if (leftSibling > 2) {
    range.push("...");
  }

  for (let i = leftSibling; i <= rightSibling; i += 1) {
    range.push(i);
  }

  if (rightSibling < totalPages - 1) {
    range.push("...");
  }

  range.push(totalPages);

  return range;
};
