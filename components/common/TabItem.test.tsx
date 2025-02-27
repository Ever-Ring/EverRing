import { render, screen, fireEvent } from "@testing-library/react";
import TabItem from "@components/common/TabItem";

describe("TabItem", () => {
  const mockOnClick = jest.fn();

  it("should render the title correctly", () => {
    render(
      <TabItem title="나의 리뷰" label="myreview" onClick={mockOnClick} />,
    );

    expect(screen.getByText("나의 리뷰")).toBeInTheDocument();
  });

  it("should call onClick handler when clicked", () => {
    render(
      <TabItem title="나의 모임" label="mygathering" onClick={mockOnClick} />,
    );

    fireEvent.click(screen.getByText("나의 모임"));
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it("should change the style when isSelected=true", () => {
    render(
      <TabItem
        title="내가 만든 모임"
        label="madebyme"
        isSelected
        onClick={mockOnClick}
      />,
    );

    const tabText = screen.getByText("내가 만든 모임");
    expect(tabText).toHaveClass("text-gray-900");
  });

  it("should render icon when hasIcon prop is passed", () => {
    render(
      <TabItem title="나무링" label="tree" hasIcon onClick={mockOnClick} />,
    );

    expect(screen.getByRole("img")).toBeInTheDocument();
  });

  it("should render tree icon when label is 'tree'", () => {
    render(
      <TabItem title="나무링" label="tree" hasIcon onClick={mockOnClick} />,
    );

    expect(screen.getByTestId("tree-icon")).toBeInTheDocument();
  });

  it("should render tree icon when label is 'cloud'", () => {
    render(
      <TabItem title="구름링" label="cloud" hasIcon onClick={mockOnClick} />,
    );

    expect(screen.getByTestId("cloud-icon")).toBeInTheDocument();
  });

  it("should render the correct icon with selected style when isSelected=true", () => {
    render(
      <TabItem
        title="나무링"
        label="tree"
        hasIcon
        isSelected
        onClick={mockOnClick}
      />,
    );
    const treeIcon = screen.getByTestId("tree-icon");

    expect(treeIcon).toHaveClass("fill-gray-900");

    render(
      <TabItem
        title="구름링"
        label="cloud"
        hasIcon
        isSelected
        onClick={mockOnClick}
      />,
    );
    const cloudIcon = screen.getByTestId("cloud-icon");

    expect(cloudIcon).toHaveClass("fill-gray-900");
  });
});
