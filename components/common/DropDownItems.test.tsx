import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import DropDownItems from "@components/common/DropDownItems";

describe("DropDownItems Component", () => {
  const mockOnSelect = jest.fn();
  const testItem = "Test Item";

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render the given item text when item prop is provided", () => {
    render(
      <DropDownItems
        item={testItem}
        isSelected={false}
        onSelect={mockOnSelect}
      />,
    );
    const button = screen.getByRole("button");
    expect(button).toHaveTextContent(testItem);
  });

  it("should call onSelect with the item when the button is clicked", () => {
    render(
      <DropDownItems
        item={testItem}
        isSelected={false}
        onSelect={mockOnSelect}
      />,
    );
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(mockOnSelect).toHaveBeenCalledTimes(1);
    expect(mockOnSelect).toHaveBeenCalledWith(testItem);
  });

  it("should apply 'text-base' class when textSize is large (default)", () => {
    render(
      <DropDownItems
        item={testItem}
        isSelected={false}
        onSelect={mockOnSelect}
      />,
    );
    const button = screen.getByRole("button");
    expect(button).toHaveClass("text-base");
    expect(button).not.toHaveClass("text-sm");
  });

  it("should apply 'text-sm' class when textSize is small", () => {
    render(
      <DropDownItems
        item={testItem}
        isSelected={false}
        onSelect={mockOnSelect}
        textSize="small"
      />,
    );
    const button = screen.getByRole("button");
    expect(button).toHaveClass("text-sm");
    expect(button).not.toHaveClass("text-base");
  });

  it("should apply selected classes when isSelected is true", () => {
    render(
      <DropDownItems item={testItem} isSelected onSelect={mockOnSelect} />,
    );
    const button = screen.getByRole("button");
    expect(button).toHaveClass("rounded-xl");
    expect(button).toHaveClass("bg-mint-100");
  });

  it("should not apply selected classes when isSelected is false", () => {
    render(
      <DropDownItems
        item={testItem}
        isSelected={false}
        onSelect={mockOnSelect}
      />,
    );
    const button = screen.getByRole("button");
    expect(button).not.toHaveClass("rounded-xl");
    expect(button).not.toHaveClass("bg-mint-100");
  });
});
