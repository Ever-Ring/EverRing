import { render, screen } from "@testing-library/react";
import ProgressBar from "@features/list-detail/components/ProgressBar";

describe("ProgressBar Component", () => {
  it("should render the progress bar correctly", () => {
    const progress = 50;
    const currentCount = 5;
    const maxCount = 10;

    render(
      <ProgressBar
        progress={progress}
        currentCount={currentCount}
        maxCount={maxCount}
      />,
    );

    const progressBar = screen.getByRole("progressbar");
    expect(progressBar).toHaveStyle({ width: "50%" });

    expect(screen.getByText("최소인원 5명")).toBeInTheDocument();
    expect(screen.getByText(`최대인원 ${maxCount}명`)).toBeInTheDocument();
  });

  it("should display the correct color for progress when currentCount equals maxCount", () => {
    const progress = 100;
    const currentCount = 10;
    const maxCount = 10;

    render(
      <ProgressBar
        progress={progress}
        currentCount={currentCount}
        maxCount={maxCount}
      />,
    );

    const progressBarText = screen.getByText(`최대인원 ${maxCount}명`);
    expect(progressBarText).toHaveClass("text-mint-400");
  });

  it("should display the correct color for progress when currentCount is less than maxCount", () => {
    const progress = 40;
    const currentCount = 4;
    const maxCount = 10;

    render(
      <ProgressBar
        progress={progress}
        currentCount={currentCount}
        maxCount={maxCount}
      />,
    );

    const progressBarText = screen.getByText(`최대인원 ${maxCount}명`);
    expect(progressBarText).toHaveClass("text-gray-700");
  });

  it("should handle zero progress correctly", () => {
    const progress = 0;
    const currentCount = 0;
    const maxCount = 10;

    render(
      <ProgressBar
        progress={progress}
        currentCount={currentCount}
        maxCount={maxCount}
      />,
    );

    const progressBar = screen.getByRole("progressbar");
    expect(progressBar).toHaveStyle({ width: "0%" });
  });

  it("should handle 100% progress correctly", () => {
    const progress = 100;
    const currentCount = 10;
    const maxCount = 10;

    render(
      <ProgressBar
        progress={progress}
        currentCount={currentCount}
        maxCount={maxCount}
      />,
    );

    const progressBar = screen.getByRole("progressbar");
    expect(progressBar).toHaveStyle({ width: "100%" });
  });
});
