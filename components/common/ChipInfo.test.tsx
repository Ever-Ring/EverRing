import React from "react";
import { render, screen } from "@testing-library/react";
import ChipInfo from "@components/common/ChipInfo";

describe("ChipInfo Component", () => {
  it("renders the given info text", () => {
    const infoText = "Sample Info";
    render(<ChipInfo info={infoText} />);
    const textElement = screen.getByText(infoText);
    expect(textElement).toBeInTheDocument();
  });

  it("applies default white variant class when variant is not provided", () => {
    const infoText = "Default White";
    render(<ChipInfo info={infoText} />);
    const textElement = screen.getByText(infoText);
    expect(textElement).toHaveClass("text-white");
    expect(textElement).not.toHaveClass("text-mint-600");
  });

  it("applies mint variant class when variant is set to mint", () => {
    const infoText = "Mint Info";
    render(<ChipInfo info={infoText} variant="mint" />);
    const textElement = screen.getByText(infoText);
    expect(textElement).toHaveClass("text-mint-600");
    expect(textElement).not.toHaveClass("text-white");
  });
});
