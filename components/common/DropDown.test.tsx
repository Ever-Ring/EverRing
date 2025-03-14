import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import DropDown from "@components/common/DropDown";

describe("DropDown Component", () => {
  const items = ["Item 1", "Item 2", "Item 3"];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should not render dropdown list when isOpen is false", () => {
    render(
      <DropDown
        items={items}
        onSelect={() => {}}
        isOpen={false}
        setIsOpen={() => {}}
      />,
    );
    items.forEach((item) => {
      expect(screen.queryByText(item)).not.toBeInTheDocument();
    });
  });

  it("should render dropdown list when isOpen is true", () => {
    render(
      <DropDown
        items={items}
        onSelect={() => {}}
        isOpen
        setIsOpen={() => {}}
      />,
    );
    items.forEach((item) => {
      expect(screen.getByText(item)).toBeInTheDocument();
    });
  });

  it("should apply 'w-full' class when variant is solid", () => {
    render(
      <DropDown
        items={["Item 1"]}
        onSelect={() => {}}
        isOpen
        setIsOpen={() => {}}
        variant="solid"
      />,
    );
    const list = screen.getByRole("list");
    expect(list).toHaveClass("w-full");
  });

  it("should apply 'w-[120px]' class when variant is outlined", () => {
    render(
      <DropDown
        items={["Item 1"]}
        onSelect={() => {}}
        isOpen
        setIsOpen={() => {}}
        variant="outlined"
      />,
    );
    const list = screen.getByRole("list");
    expect(list).toHaveClass("w-[120px]");
  });

  it("should call onSelect and close dropdown when an item is clicked", () => {
    const mockOnSelect = jest.fn();
    const mockSetIsOpen = jest.fn();
    render(
      <DropDown
        items={items}
        onSelect={mockOnSelect}
        isOpen
        setIsOpen={mockSetIsOpen}
        selectedItem={null}
      />,
    );
    fireEvent.click(screen.getByText("Item 1"));
    expect(mockOnSelect).toHaveBeenCalledWith("Item 1");
    expect(mockSetIsOpen).toHaveBeenCalledWith(false);
  });

  it("should close dropdown when clicking outside", () => {
    const mockSetIsOpen = jest.fn();
    render(
      <DropDown
        items={items}
        onSelect={() => {}}
        isOpen
        setIsOpen={mockSetIsOpen}
      />,
    );
    fireEvent.mouseDown(document.body);
    expect(mockSetIsOpen).toHaveBeenCalledWith(false);
  });

  it("should not close dropdown when clicking inside the dropdown", () => {
    const mockSetIsOpen = jest.fn();
    const { container } = render(
      <DropDown
        items={items}
        onSelect={() => {}}
        isOpen
        setIsOpen={mockSetIsOpen}
      />,
    );
    fireEvent.mouseDown(container.firstChild as HTMLElement);
    expect(mockSetIsOpen).not.toHaveBeenCalled();
  });
});
