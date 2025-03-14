import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Button from "@components/common/Button";

describe("Button Component", () => {
  test("renders with the given text", () => {
    render(<Button text="Click me" />);
    expect(screen.getByRole("button")).toHaveTextContent("Click me");
  });

  test("applies large size classes by default", () => {
    render(<Button text="Large Button" />);
    const button = screen.getByRole("button");
    expect(button.className).toMatch(/px-6/);
  });

  test("applies small size classes when size is small", () => {
    render(<Button text="Small Button" size="small" />);
    const button = screen.getByRole("button");
    expect(button.className).toMatch(/w-\[115px\]/);
    expect(button.className).toMatch(/px-4/);
  });

  test("calls onClick when clicked", () => {
    const onClickMock = jest.fn();
    render(<Button text="Click me" onClick={onClickMock} />);
    fireEvent.click(screen.getByRole("button"));
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  test("does not call onClick when disabled", () => {
    const onClickMock = jest.fn();
    render(<Button text="Click me" disabled onClick={onClickMock} />);
    fireEvent.click(screen.getByRole("button"));
    expect(onClickMock).not.toHaveBeenCalled();
  });

  test("applies solid variant classes when enabled", () => {
    render(<Button text="Solid Button" variant="solid" />);
    const button = screen.getByRole("button");
    expect(button.className).toMatch(/bg-mint-600/);
    expect(button.className).toMatch(/text-white/);
  });

  test("applies outlined variant classes when enabled", () => {
    render(<Button text="Outlined Button" variant="outlined" />);
    const button = screen.getByRole("button");
    expect(button.className).toMatch(/border-mint-600/);
    expect(button.className).toMatch(/bg-white/);
  });

  test("applies disabled classes for solid variant", () => {
    render(<Button text="Disabled Solid" variant="solid" disabled />);
    const button = screen.getByRole("button");
    expect(button.className).toMatch(/cursor-not-allowed/);
    expect(button.className).toMatch(/bg-gray-400/);
    expect(button.className).toMatch(/border-gray-400/);
  });

  test("applies disabled classes for outlined variant", () => {
    render(<Button text="Disabled Outlined" variant="outlined" disabled />);
    const button = screen.getByRole("button");
    expect(button.className).toMatch(/cursor-not-allowed/);
    expect(button.className).toMatch(/border-gray-400/);
    expect(button.className).toMatch(/text-gray-400/);
  });

  test("applies the correct type attribute", () => {
    render(<Button text="Submit" type="submit" />);
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("type", "submit");
  });
});
