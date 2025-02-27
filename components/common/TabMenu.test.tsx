import { render, screen, fireEvent } from "@testing-library/react";
import TabMenu from "@components/common/TabMenu";
import { TABS } from "@constants/tab";

describe("TabMenu", () => {
  const mockOnSelect = jest.fn();

  beforeEach(() => {
    mockOnSelect.mockClear();
  });

  it("should render all tabs correctly", () => {
    render(<TabMenu tabs={TABS} selectedIndex={0} onSelect={mockOnSelect} />);

    const tabElements = screen.getAllByRole("button");
    expect(tabElements).toHaveLength(TABS.length);

    expect(screen.getByText("나무링")).toBeInTheDocument();
    expect(screen.getByText("구름링")).toBeInTheDocument();
  });

  it("should highlight the selected tab", () => {
    render(<TabMenu tabs={TABS} selectedIndex={1} onSelect={mockOnSelect} />);

    const selectedTab = screen.getByText("구름링");
    expect(selectedTab).toHaveClass("text-gray-900");
  });

  it("should call onSelect when a tab is clicked", () => {
    render(<TabMenu tabs={TABS} selectedIndex={0} onSelect={mockOnSelect} />);

    const tabToClick = screen.getByText("구름링");
    fireEvent.click(tabToClick);

    expect(mockOnSelect).toHaveBeenCalledTimes(1);
    expect(mockOnSelect).toHaveBeenCalledWith(1);
  });

  it("should render icon when hasIcon is true", () => {
    render(
      <TabMenu tabs={TABS} selectedIndex={0} hasIcon onSelect={mockOnSelect} />,
    );

    const icon = screen.getAllByRole("img");
    expect(icon).toHaveLength(TABS.length);
  });

  it("should render nothing when tabs array is empty", () => {
    render(<TabMenu tabs={[]} selectedIndex={0} onSelect={mockOnSelect} />);

    const tabElements = screen.queryAllByRole("button");
    expect(tabElements).toHaveLength(0);
  });
});
