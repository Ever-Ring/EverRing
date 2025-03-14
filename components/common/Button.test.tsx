import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Button from "@components/common/Button";

describe("Button Component", () => {
  test("should render with the given text when text prop is provided", () => {
    render(<Button text="Click me" />);
    expect(screen.getByRole("button")).toHaveTextContent("Click me");
  });

  test("should apply large size classes when size is not specified (default)", () => {
    render(<Button text="Large Button" />);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("px-6");
  });

  test("should apply small size classes when size is small", () => {
    render(<Button text="Small Button" size="small" />);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("w-[115px]");
    expect(button).toHaveClass("px-4");
  });

  test("should call onClick when button is clicked", () => {
    const onClickMock = jest.fn();
    render(<Button text="Click me" onClick={onClickMock} />);
    fireEvent.click(screen.getByRole("button"));
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  test("should not call onClick when button is disabled", () => {
    const onClickMock = jest.fn();
    render(<Button text="Click me" disabled onClick={onClickMock} />);
    fireEvent.click(screen.getByRole("button"));
    expect(onClickMock).not.toHaveBeenCalled();
  });

  test("should apply solid variant classes when button is enabled and variant is solid", () => {
    render(<Button text="Solid Button" variant="solid" />);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("bg-mint-600");
    expect(button).toHaveClass("text-white");
  });

  test("should apply outlined variant classes when button is enabled and variant is outlined", () => {
    render(<Button text="Outlined Button" variant="outlined" />);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("border-mint-600");
    expect(button).toHaveClass("bg-white");
  });

  test("should apply disabled classes for solid variant when button is disabled", () => {
    render(<Button text="Disabled Solid" variant="solid" disabled />);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("cursor-not-allowed");
    expect(button).toHaveClass("bg-gray-400");
    expect(button).toHaveClass("border-gray-400");
  });

  test("should apply disabled classes for outlined variant when button is disabled", () => {
    render(<Button text="Disabled Outlined" variant="outlined" disabled />);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("cursor-not-allowed");
    expect(button).toHaveClass("border-gray-400");
    expect(button).toHaveClass("text-gray-400");
  });

  test("should apply the correct type attribute when type prop is provided", () => {
    render(<Button text="Submit" type="submit" />);
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("type", "submit");
  });
});
