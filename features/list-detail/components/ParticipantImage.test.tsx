import React from "react";
import { render } from "@testing-library/react";
import ParticipantImage from "@features/list-detail/components/ParticipantImage";

describe("ParticipantImage Component", () => {
  it("should render a div with the background image when imageUrl is provided", () => {
    const imageUrl = "test-image.png";
    const { container } = render(
      <ParticipantImage imageUrl={imageUrl} alt="" />,
    );
    const divElement = container.firstChild as HTMLElement;
    expect(divElement).toHaveStyle(`background-image: url("${imageUrl}")`);
  });

  it("should render a div with no background image when imageUrl is not provided", () => {
    const { container } = render(<ParticipantImage alt="" />);
    const divElement = container.firstChild as HTMLElement;
    expect(divElement).toHaveStyle("background-image: none");
  });

  it("should have the correct classes applied", () => {
    const { container } = render(
      <ParticipantImage imageUrl="test-image.png" alt="" />,
    );
    const divElement = container.firstChild as HTMLElement;
    expect(divElement).toHaveClass(
      "relative",
      "h-[29px]",
      "w-[29px]",
      "rounded-full",
      "bg-gray-300",
    );
  });
});
