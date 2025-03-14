import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import PaginationButton from "@features/list-detail/components/PaginationButton";

describe("PaginationButton Component", () => {
  it("should render children correctly", () => {
    render(<PaginationButton>Test Button</PaginationButton>);
    expect(screen.getByRole("button")).toHaveTextContent("Test Button");
  });

  it("should have default classes", () => {
    render(<PaginationButton>Button</PaginationButton>);

    const button = screen.getByRole("button");

    expect(button).toHaveClass("flex");
    expect(button).toHaveClass("h-12");
    expect(button).toHaveClass("w-12");
    expect(button).toHaveClass("items-center");
    expect(button).toHaveClass("justify-center");
    expect(button).toHaveClass("rounded-lg");
    expect(button).toHaveClass("bg-gray-50");
    expect(button).toHaveClass("p-2.5");
  });

  it("should apply additional className prop", () => {
    render(
      <PaginationButton className="custom-class">Button</PaginationButton>,
    );

    const button = screen.getByRole("button");
    expect(button).toHaveClass("custom-class");
  });

  it("should call onClick when clicked and not disabled", () => {
    const onClickMock = jest.fn();

    render(
      <PaginationButton onClick={onClickMock}>Clickable</PaginationButton>,
    );

    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  it("should not call onClick when disabled", () => {
    const onClickMock = jest.fn();

    render(
      <PaginationButton disabled onClick={onClickMock}>
        Disabled Button
      </PaginationButton>,
    );

    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
    fireEvent.click(button);
    expect(onClickMock).not.toHaveBeenCalled();
  });

  it("should have type 'button'", () => {
    render(<PaginationButton>Button</PaginationButton>);

    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("type", "button");
  });
});
