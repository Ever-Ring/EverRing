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
    render(<ContainerInformation {...defaultProps} />);
    expect(screen.getByText(defaultProps.title)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.location)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.date)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.time)).toBeInTheDocument();
    expect(screen.getByText(/0명/)).toBeInTheDocument();
    const progressBar =
      screen.getByRole("progressbar", { hidden: true }) ||
      screen.getByText("", { selector: "div[style]" });
    expect(progressBar).toHaveStyle({ width: "0%" });
  });

  it("should render participant images and progress when participants exist", () => {
    (useGetParticipants as jest.Mock).mockReturnValue({
      data: sampleParticipants,
    });
    render(<ContainerInformation {...defaultProps} />);
    expect(screen.getByText(/5명/)).toBeInTheDocument();
    expect(screen.getByText("개설확정")).toBeInTheDocument();
    const progressDiv =
      screen.getByRole("progressbar", { hidden: true }) ||
      screen.getByText("", { selector: "div[style]" });
    expect(progressDiv).toHaveStyle({ width: "50%" });

    const images = screen.getAllByRole("img");
    const participantImages = images.filter((img) =>
      /image[1-5]\.png/.test(img.getAttribute("src") || ""),
    );
    expect(participantImages.length).toBe(4);
    expect(screen.getByText("+1")).toBeInTheDocument();
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
    render(<ContainerInformation {...defaultProps} />);
    expect(screen.getByText(/4명/)).toBeInTheDocument();
    expect(screen.queryByText("개설확정")).not.toBeInTheDocument();
    const progressDiv =
      screen.getByRole("progressbar", { hidden: true }) ||
      screen.getByText("", { selector: "div[style]" });
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
    render(<ContainerInformation {...defaultProps} />);
    expect(screen.getByText(/10명/)).toBeInTheDocument();
    const progressDiv =
      screen.getByRole("progressbar", { hidden: true }) ||
      screen.getByText("", { selector: "div[style]" });
    expect(progressDiv).toHaveStyle({ width: "100%" });
    const maxCountElement = screen.getByText(/최대인원 10명/);
    expect(maxCountElement).toHaveClass("text-mint-400");
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

    render(<ContainerInformation {...defaultProps} />);
    const fallbackImgElement = screen
      .getAllByRole("img")
      .find((img) =>
        (img as HTMLImageElement).src.includes(
          "/image/img-profile-large-default.svg",
        ),
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

    render(<ContainerInformation {...defaultProps} />);
    expect(screen.getByText("+1")).toBeInTheDocument();

    fireEvent.mouseEnter(screen.getByText("+1").parentElement!);

    expect(screen.getByText("NoImage Hidden User")).toBeInTheDocument();

    const fallbackImgElement = screen
      .getAllByRole("img")
      .find((img) =>
        (img as HTMLImageElement).src.includes(
          "/image/img-profile-large-default.svg",
        ),
      );
    expect(fallbackImgElement).toBeTruthy();
  });
});
