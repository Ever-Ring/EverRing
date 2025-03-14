import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Pagination from "@features/list-detail/components/Pagination";
import { generatePaginationRange } from "@features/list-detail/hooks/usePagination";

jest.mock("@features/list-detail/hooks/usePagination", () => ({
  generatePaginationRange: jest.fn(),
}));

describe("Pagination Component", () => {
  const onPageChangeMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should disable the left arrow and render ArrowLeftDisabled when currentPage is 1", () => {
    (generatePaginationRange as jest.Mock).mockReturnValue([1, 2, 3]);

    render(
      <Pagination
        currentPage={1}
        totalPages={3}
        onPageChange={onPageChangeMock}
      />,
    );

    const leftButton = screen.getAllByRole("button")[0];
    expect(leftButton).toBeDisabled();
    expect(screen.getByTestId("arrow-disabled")).toBeInTheDocument();
  });

  it("should enable the left arrow and call onPageChange with currentPage - 1 when clicked", () => {
    (generatePaginationRange as jest.Mock).mockReturnValue([1, 2, 3]);

    render(
      <Pagination
        currentPage={2}
        totalPages={3}
        onPageChange={onPageChangeMock}
      />,
    );

    const leftButton = screen.getAllByRole("button")[0];
    expect(leftButton).not.toBeDisabled();
    fireEvent.click(leftButton);
    expect(onPageChangeMock).toHaveBeenCalledWith(1);
  });

  it("should render pagination buttons and dots correctly", () => {
    (generatePaginationRange as jest.Mock).mockReturnValue([1, "...", 5]);

    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        onPageChange={onPageChangeMock}
      />,
    );

    const page1Button = screen.getByRole("button", { name: "1" });
    expect(page1Button).toBeDisabled();

    const page5Button = screen.getByRole("button", { name: "5" });
    expect(page5Button).not.toBeDisabled();

    expect(screen.getByText("...")).toBeInTheDocument();
  });

  it("should call onPageChange with the correct page number when a page button is clicked", () => {
    (generatePaginationRange as jest.Mock).mockReturnValue([1, 2, 3, 4, 5]);

    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        onPageChange={onPageChangeMock}
      />,
    );

    const page3Button = screen.getByRole("button", { name: "3" });
    expect(page3Button).not.toBeDisabled();

    fireEvent.click(page3Button);
    expect(onPageChangeMock).toHaveBeenCalledWith(3);
  });

  it("should disable the right arrow and render ArrowLeftDisabled (rotated) when currentPage equals totalPages", () => {
    (generatePaginationRange as jest.Mock).mockReturnValue([1, 2, 3]);

    render(
      <Pagination
        currentPage={3}
        totalPages={3}
        onPageChange={onPageChangeMock}
      />,
    );

    const buttons = screen.getAllByRole("button");

    const rightButton = buttons[buttons.length - 1];
    expect(rightButton).toBeDisabled();
    expect(screen.getByTestId("arrow-disabled")).toHaveClass("rotate-180");
  });

  it("should enable the right arrow and call onPageChange with currentPage + 1 when clicked", () => {
    (generatePaginationRange as jest.Mock).mockReturnValue([1, 2, 3]);

    render(
      <Pagination
        currentPage={2}
        totalPages={3}
        onPageChange={onPageChangeMock}
      />,
    );

    const buttons = screen.getAllByRole("button");

    const rightButton = buttons[buttons.length - 1];
    expect(rightButton).not.toBeDisabled();
    fireEvent.click(rightButton);
    expect(onPageChangeMock).toHaveBeenCalledWith(3);
  });
});
