import { render, screen, fireEvent } from "@testing-library/react";
import MeetingHeader from "@features/list-detail/components/MeetingHeader";
import { useFavoriteStore } from "@stores/favoriteStore";

jest.mock("@stores/favoriteStore", () => ({
  useFavoriteStore: jest.fn(),
}));

describe("MeetingHeader", () => {
  const mockToggleFavorite = jest.fn();
  const gatheringId = 1;
  const title = "Sample Meeting";
  const location = "Meeting Room A";
  const date = "2025-03-15";
  const time = "10:00 AM";

  beforeEach(() => {
    mockToggleFavorite.mockClear();

    (useFavoriteStore as unknown as jest.Mock).mockReturnValue({
      favorites: [gatheringId],
      isFavorite: (id: number) => id === gatheringId,
      toggleFavorite: mockToggleFavorite,
      clearFavorites: jest.fn(),
    });
  });

  it("should render the meeting header with title, location, date, and time", () => {
    render(
      <MeetingHeader
        gatheringId={gatheringId}
        title={title}
        location={location}
        date={date}
        time={time}
      />,
    );

    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(location)).toBeInTheDocument();
    expect(screen.getByText(date)).toBeInTheDocument();
    expect(screen.getByText(time)).toBeInTheDocument();
  });

  it("should display active heart icon when meeting is favorited", () => {
    render(
      <MeetingHeader
        gatheringId={gatheringId}
        title={title}
        location={location}
        date={date}
        time={time}
      />,
    );

    const heartIcon = screen.getByLabelText("찜 아이콘 등록 상태");
    expect(heartIcon).toBeInTheDocument();
  });

  it("should display inactive heart icon when meeting is not favorited", () => {
    (useFavoriteStore as unknown as jest.Mock).mockReturnValue({
      favorites: [],
      isFavorite: (id: number) => id !== gatheringId,
      toggleFavorite: mockToggleFavorite,
      clearFavorites: jest.fn(),
    });

    render(
      <MeetingHeader
        gatheringId={gatheringId}
        title={title}
        location={location}
        date={date}
        time={time}
      />,
    );

    const heartIcon = screen.getByLabelText("찜 아이콘 해제 상태");
    expect(heartIcon).toBeInTheDocument();
  });

  it("should call toggleFavorite when the heart icon is clicked", () => {
    render(
      <MeetingHeader
        gatheringId={gatheringId}
        title={title}
        location={location}
        date={date}
        time={time}
      />,
    );

    const heartIconButton = screen.getByRole("button");
    fireEvent.click(heartIconButton);

    expect(mockToggleFavorite).toHaveBeenCalledWith(gatheringId);
  });
});
