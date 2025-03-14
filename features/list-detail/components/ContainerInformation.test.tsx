import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ContainerInformation from "@features/list-detail/components/ContainerInformation";
import useGetParticipants from "@features/list-detail/hooks/useGetParticipants";
import { useFavoriteStore, FavoriteStore } from "@stores/favoriteStore";

jest.mock("@features/list-detail/hooks/useGetParticipants", () => ({
  __esModule: true,
  default: jest.fn(),
}));
jest.mock("@stores/favoriteStore", () => ({
  __esModule: true,
  useFavoriteStore: jest.fn(),
}));

const sampleParticipants = [
  { User: { id: "1", image: "image1.png", name: "User 1" } },
  { User: { id: "2", image: "image2.png", name: "User 2" } },
  { User: { id: "3", image: "image3.png", name: "User 3" } },
  { User: { id: "4", image: "image4.png", name: "User 4" } },
  { User: { id: "5", image: "image5.png", name: "User 5" } },
];

const defaultProps = {
  maxCount: 10,
  gatheringId: 123,
  title: "테스트 모임 제목",
  location: "테스트 장소",
  date: "2025-03-14",
  time: "14:00",
};

describe("ContainerInformation Component", () => {
  const mockToggleFavorite = jest.fn();
  const mockIsFavorite = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useGetParticipants as jest.Mock).mockReturnValue({ data: [] });
    (useFavoriteStore as unknown as jest.Mock<FavoriteStore>).mockReturnValue({
      favorites: [],
      isFavorite: mockIsFavorite,
      toggleFavorite: mockToggleFavorite,
      clearFavorites: jest.fn(),
    });
    mockIsFavorite.mockReturnValue(false);
  });

  it("should render container information correctly when no participants", () => {
    const { container } = render(<ContainerInformation {...defaultProps} />);
    expect(screen.getByText(defaultProps.title)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.location)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.date)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.time)).toBeInTheDocument();

    const countElement = screen.getByText(/^\s*0\s*명\s*$/);
    expect(countElement).toBeInTheDocument();

    const progressDiv = container.querySelector('div[style*="width:"]');
    expect(progressDiv).toHaveStyle({ width: "0%" });
  });

  it("should render participant images and progress when participants exist", () => {
    (useGetParticipants as jest.Mock).mockReturnValue({
      data: sampleParticipants,
    });
    const { container } = render(<ContainerInformation {...defaultProps} />);

    const countElement = screen.getByText(/^\s*5\s*명\s*$/);
    expect(countElement).toBeInTheDocument();
    expect(screen.getByText("개설확정")).toBeInTheDocument();

    const progressDiv = container.querySelector('div[style*="width:"]');
    expect(progressDiv).toHaveStyle({ width: "50%" });

    const images = container.querySelectorAll("div[style*='background-image']");
    const participantImages = Array.from(images).filter((img) =>
      /image[1-5]\.png/.test((img as HTMLElement).style.backgroundImage),
    );
    expect(participantImages.length).toBe(4);
    expect(screen.getByText("+1")).toBeInTheDocument();
  });

  it("should display dropdown with hidden participant details when hovered over hidden count", () => {
    (useGetParticipants as jest.Mock).mockReturnValue({
      data: sampleParticipants,
    });
    render(<ContainerInformation {...defaultProps} />);

    const hiddenCountElement = screen.getByText("+1").parentElement;
    expect(screen.queryByText("User 5")).not.toBeInTheDocument();
    fireEvent.mouseEnter(hiddenCountElement!);
    expect(screen.getByText("User 5")).toBeInTheDocument();
    fireEvent.mouseLeave(hiddenCountElement!);
  });

  it("should NOT display '개설확정' and render correct progress when currentCount is less than 5", () => {
    const fourParticipants = [
      { User: { id: "1", image: "image1.png", name: "User 1" } },
      { User: { id: "2", image: "image2.png", name: "User 2" } },
      { User: { id: "3", image: "image3.png", name: "User 3" } },
      { User: { id: "4", image: "image4.png", name: "User 4" } },
    ];
    (useGetParticipants as jest.Mock).mockReturnValue({
      data: fourParticipants,
    });
    const { container } = render(<ContainerInformation {...defaultProps} />);

    const countElement = screen.getByText(/^\s*4\s*명\s*$/);
    expect(countElement).toBeInTheDocument();
    expect(screen.queryByText("개설확정")).not.toBeInTheDocument();

    const progressDiv = container.querySelector('div[style*="width:"]');
    expect(progressDiv).toHaveStyle({ width: "40%" });
  });

  it("should display 100% progress and apply mint color when currentCount equals maxCount", () => {
    const tenParticipants = Array.from({ length: 10 }, (_, i) => ({
      User: {
        id: String(i + 1),
        image: `image${i + 1}.png`,
        name: `User ${i + 1}`,
      },
    }));
    (useGetParticipants as jest.Mock).mockReturnValue({
      data: tenParticipants,
    });
    const { container } = render(<ContainerInformation {...defaultProps} />);

    const maxCountElement = screen.getByText(/^최대인원\s*10\s*명$/);
    expect(maxCountElement).toHaveClass("text-mint-400");

    const progressDiv = container.querySelector('div[style*="width:"]');
    expect(progressDiv).toHaveStyle({ width: "100%" });
  });

  it("should use DEFAULT_USER_IMAGE for a visible user when image is undefined", () => {
    const participantsNoImage = [
      { User: { id: "1", image: undefined, name: "NoImage User" } },
      { User: { id: "2", image: "image2.png", name: "User 2" } },
      { User: { id: "3", image: "image3.png", name: "User 3" } },
      { User: { id: "4", image: "image4.png", name: "User 4" } },
    ];
    (useGetParticipants as jest.Mock).mockReturnValue({
      data: participantsNoImage,
    });
    const { container } = render(<ContainerInformation {...defaultProps} />);

    const fallbackImgElement = container.querySelector(
      'div[style*="background-image: url(\\"/image/img-profile-large-default.svg\\")"]',
    );
    expect(fallbackImgElement).toBeTruthy();
  });

  it("should use DEFAULT_USER_IMAGE for a hidden user when image is null", () => {
    const participantsHiddenNoImage = [
      { User: { id: "1", image: "image1.png", name: "User 1" } },
      { User: { id: "2", image: "image2.png", name: "User 2" } },
      { User: { id: "3", image: "image3.png", name: "User 3" } },
      { User: { id: "4", image: "image4.png", name: "User 4" } },
      { User: { id: "5", image: null, name: "NoImage Hidden User" } },
    ];
    (useGetParticipants as jest.Mock).mockReturnValue({
      data: participantsHiddenNoImage,
    });
    const { container } = render(<ContainerInformation {...defaultProps} />);

    expect(screen.getByText("+1")).toBeInTheDocument();
    fireEvent.mouseEnter(screen.getByText("+1").parentElement!);
    expect(screen.getByText("NoImage Hidden User")).toBeInTheDocument();

    const fallbackImgElement = container.querySelector(
      'div[style*="background-image: url(\\"/image/img-profile-large-default.svg\\")"]',
    );
    expect(fallbackImgElement).toBeTruthy();
  });

  it("should call toggleFavorite when favorite button is clicked", () => {
    render(<ContainerInformation {...defaultProps} />);

    const favoriteButton = screen.getByLabelText("찜 아이콘 해제 상태");
    fireEvent.click(favoriteButton);
    expect(mockToggleFavorite).toHaveBeenCalledWith(defaultProps.gatheringId);
  });

  it("should render favorite icon as active when isFavorite returns true", () => {
    mockIsFavorite.mockReturnValue(true);
    render(<ContainerInformation {...defaultProps} />);
    expect(screen.getByLabelText("찜 아이콘 등록 상태")).toBeInTheDocument();
  });
});
