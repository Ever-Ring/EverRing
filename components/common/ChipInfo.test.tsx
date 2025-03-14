import React from "react";
import { render, screen } from "@testing-library/react";
import ChipInfo from "@components/common/ChipInfo";

describe("ChipInfo Component", () => {
  it("should render the given info text when info prop is provided", () => {
    const infoText = "Sample Info";
    render(<ChipInfo info={infoText} />);
    const textElement = screen.getByText(infoText);
    expect(textElement).toBeInTheDocument();
  });

  it("should apply default white variant class when variant is not provided", () => {
    const infoText = "Default White";
    render(<ChipInfo info={infoText} />);
    const textElement = screen.getByText(infoText);
    expect(textElement).toHaveClass("text-white");
    expect(textElement).not.toHaveClass("text-mint-600");
  });

  it("should apply mint variant class when variant is set to mint", () => {
    const infoText = "Mint Info";
    render(<ChipInfo info={infoText} variant="mint" />);
    const textElement = screen.getByText(infoText);
    expect(textElement).toHaveClass("text-mint-600");
    expect(textElement).not.toHaveClass("text-white");
  });
});
