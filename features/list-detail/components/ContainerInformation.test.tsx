import { render, screen, fireEvent } from "@testing-library/react";
import ContainerInformation from "@features/list-detail/components/ContainerInformation";
import { Participant } from "@customTypes/gathering";
import useGetParticipants from "@features/list-detail/hooks/useGetParticipants";
import { useFavoriteStore } from "@stores/favoriteStore";

jest.mock("@features/list-detail/hooks/useGetParticipants", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("@stores/favoriteStore", () => ({
  __esModule: true,
  useFavoriteStore: jest.fn(),
}));

const sampleParticipants: Participant[] = [
  {
    teamId: 1,
    userId: 1,
    gatheringId: 123,
    joinedAt: "2025-03-14T10:00:00Z",
    User: {
      id: 1,
      email: "user1@example.com",
      name: "User 1",
      companyName: "Company 1",
      image: "image1.png",
    },
  },
  {
    teamId: 1,
    userId: 2,
    gatheringId: 123,
    joinedAt: "2025-03-14T10:00:00Z",
    User: {
      id: 2,
      email: "user2@example.com",
      name: "User 2",
      companyName: "Company 2",
      image: "image2.png",
    },
  },
  {
    teamId: 1,
    userId: 3,
    gatheringId: 123,
    joinedAt: "2025-03-14T10:00:00Z",
    User: {
      id: 3,
      email: "user3@example.com",
      name: "User 3",
      companyName: "Company 3",
      image: "image3.png",
    },
  },
  {
    teamId: 1,
    userId: 4,
    gatheringId: 123,
    joinedAt: "2025-03-14T10:00:00Z",
    User: {
      id: 4,
      email: "user4@example.com",
      name: "User 4",
      companyName: "Company 4",
      image: "image4.png",
    },
  },
  {
    teamId: 1,
    userId: 5,
    gatheringId: 123,
    joinedAt: "2025-03-14T10:00:00Z",
    User: {
      id: 5,
      email: "user5@example.com",
      name: "User 5",
      companyName: "Company 5",
      image: "image5.png",
    },
  },
];

const defaultProps = {
  maxCount: 10,
  gatheringId: 123,
  title: "Sample Meeting",
  location: "Sample Location",
  date: "2025-03-15",
  time: "10:00 AM",
};

describe("ContainerInformation Component", () => {
  beforeEach(() => {
    (useGetParticipants as jest.Mock).mockReturnValue({
      data: sampleParticipants,
    });
    (useFavoriteStore as unknown as jest.Mock).mockReturnValue({
      favorites: [],
      isFavorite: jest.fn().mockReturnValue(false),
      toggleFavorite: jest.fn(),
      clearFavorites: jest.fn(),
    });
  });

  it("should render the meeting header with title, location, date, and time", () => {
    render(<ContainerInformation {...defaultProps} />);

    expect(screen.getByText(defaultProps.title)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.location)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.date)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.time)).toBeInTheDocument();
  });

  it("should display the participant list and progress bar", () => {
    render(<ContainerInformation {...defaultProps} />);

    expect(screen.getByText("5명")).toBeInTheDocument();

    const progressBar = screen.getByRole("progressbar");
    expect(progressBar).toHaveStyle({ width: "50%" });
  });

  it("should show '개설확정' text when currentCount is 5 or greater", () => {
    render(<ContainerInformation {...defaultProps} />);

    expect(screen.getByText("개설확정")).toBeInTheDocument();
  });

  it("should display the hover dropdown with hidden participants when hovered over the +X icon", () => {
    render(<ContainerInformation {...defaultProps} />);

    const hiddenCountElement = screen.getByText("+1").parentElement!;
    fireEvent.mouseEnter(hiddenCountElement);

    expect(screen.getByText("User 5")).toBeInTheDocument();

    fireEvent.mouseLeave(hiddenCountElement);

    expect(screen.queryByText("User 5")).not.toBeInTheDocument();
  });
});
