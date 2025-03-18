import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import MypageCard from "@features/mypage/components/MypageCard";
import useModalStore from "@stores/modalStore";
import { useDeleteGatheringJoined } from "@features/mypage/hooks/useDeleteGatheringJoinded";
import mockRouter from "next-router-mock";
import { MemoryRouterProvider } from "next-router-mock/MemoryRouterProvider";
import { GatheringJoined } from "@customTypes/gathering";

jest.mock("@stores/modalStore", () => ({
  __esModule: true,
  default: jest.fn(() => ({})),
}));

jest.mock("@features/mypage/hooks/useDeleteGatheringJoinded", () => ({
  useDeleteGatheringJoined: jest.fn().mockReturnValue({
    mutate: jest.fn().mockResolvedValue("success"),
    isLoading: false,
    isError: false,
    error: null,
  }),
}));

jest.mock("@features/mypage/components/WriteReviewModal", () => ({
  __esModule: true,
  default: ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) =>
    isOpen ? (
      <div>
        <div>Mocked WriteReviewModal</div>
        <button onClick={onClose} aria-label="취소" type="button">
          취소
        </button>
      </div>
    ) : null,
}));

describe("MypageCard Component", () => {
  const currentDate = new Date();
  const registrationEnd = new Date(currentDate);
  const dateTime = new Date(currentDate);
  registrationEnd.setHours(currentDate.getHours() + 1);
  dateTime.setDate(currentDate.getDate() + 1);

  const completedGatheringData = {
    id: 1234,
    name: "테스트 모임",
    image: "/image/test.png",
    dateTime: dateTime.toISOString(),
    participantCount: 5,
    capacity: 10,
    type: "NOTWORKATION",
    location: "서울",
    isCompleted: true,
    registrationEnd: registrationEnd.toISOString(),
    canceledAt: null,
    createdBy: 1,
    joinedAt: currentDate.toISOString(),
    isReviewed: false,
  };
  const pendingOnlineGatheringData = {
    id: 1,
    name: "테스트 모임",
    image: "/image/test.png",
    dateTime: dateTime.toISOString(),
    participantCount: 5,
    capacity: 10,
    type: "WORKATION",
    location: "서울",
    isCompleted: false,
    registrationEnd: registrationEnd.toISOString(),
    canceledAt: null,
    createdBy: 1,
    joinedAt: currentDate.toISOString(),
    isReviewed: false,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });
  beforeAll(() => {
    global.alert = jest.fn();
  });
  afterAll(() => {
    (global.alert as jest.Mock).mockRestore();
  });

  test("should display gathering name, location, and participant count", () => {
    render(<MypageCard gatheringData={completedGatheringData} />);

    expect(screen.getByText("테스트 모임")).toBeInTheDocument();
    expect(screen.getByText("서울")).toBeInTheDocument();
    expect(screen.getByText("5/10")).toBeInTheDocument();
  });

  test("should display '온라인' as location when gathering type is WORKATION", () => {
    render(<MypageCard gatheringData={pendingOnlineGatheringData} />);

    expect(screen.getByText("테스트 모임")).toBeInTheDocument();
    expect(screen.getByText("온라인")).toBeInTheDocument();
    expect(screen.getByText("5/10")).toBeInTheDocument();
  });

  test("should navigate to list-detail page when gathering name is clicked", () => {
    render(<MypageCard gatheringData={completedGatheringData} />, {
      wrapper: MemoryRouterProvider,
    });

    fireEvent.click(screen.getByText("테스트 모임"));

    expect(mockRouter.asPath).toEqual(
      `/list-detail/${completedGatheringData.id}`,
    );
  });

  test("should open WriteReviewModal when completed gathering's '리뷰 작성하기' button is clicked", () => {
    render(<MypageCard gatheringData={completedGatheringData} />);

    fireEvent.click(screen.getByRole("button", { name: /리뷰 작성하기/ }));
    expect(screen.getByText("Mocked WriteReviewModal")).toBeInTheDocument();
  });

  test("should close WriteReviewModal when '취소' button is clicked", () => {
    render(<MypageCard gatheringData={completedGatheringData} />);

    fireEvent.click(screen.getByRole("button", { name: /리뷰 작성하기/ }));
    fireEvent.click(screen.getByRole("button", { name: "취소" }));

    expect(
      screen.queryByText("Mocked WriteReviewModal"),
    ).not.toBeInTheDocument();
  });

  test("should call openModal with cancellation message when '참여 취소하기' button is clicked", () => {
    const mockOpenModal = jest.fn();
    (
      useModalStore as jest.MockedFunction<typeof useModalStore>
    ).mockReturnValueOnce({
      isOpen: false,
      modalOptions: null,
      openModal: mockOpenModal,
      closeModal: jest.fn(),
      confirmAction: jest.fn(),
    });

    render(<MypageCard gatheringData={pendingOnlineGatheringData} />);

    fireEvent.click(screen.getByRole("button", { name: /참여 취소하기/ }));

    expect(mockOpenModal).toHaveBeenCalledWith({
      text: "정말 모임 참여를 취소하시겠습니까?",
      hasTwoButton: true,
      onConfirm: expect.any(Function),
    });
  });

  test("should call deleteGatheringJoined when cancellation is confirmed", async () => {
    const mockDeleteGatheringJoined = jest.fn();

    (useDeleteGatheringJoined as jest.Mock).mockReturnValue({
      mutate: mockDeleteGatheringJoined,
      isLoading: false,
      isError: false,
      error: null,
    });

    const mockOpenModal = jest.fn();
    const mockConfirmAction = jest.fn();
    (
      useModalStore as jest.MockedFunction<typeof useModalStore>
    ).mockReturnValueOnce({
      isOpen: false,
      modalOptions: null,
      openModal: mockOpenModal,
      closeModal: jest.fn(),
      confirmAction: mockConfirmAction,
    });

    render(<MypageCard gatheringData={pendingOnlineGatheringData} />);

    fireEvent.click(screen.getByRole("button", { name: /참여 취소하기/ }));

    await waitFor(() =>
      expect(mockOpenModal).toHaveBeenCalledWith({
        text: "정말 모임 참여를 취소하시겠습니까?",
        hasTwoButton: true,
        onConfirm: expect.any(Function),
      }),
    );

    const { onConfirm } = mockOpenModal.mock.calls[0][0];
    onConfirm();

    expect(mockDeleteGatheringJoined).toHaveBeenCalledWith(
      pendingOnlineGatheringData.id,
      expect.objectContaining({ onSuccess: expect.any(Function) }),
    );
  });

  test("should disable the button when registration has ended and gathering is not completed", async () => {
    const nonCancelableGatheringData = {
      id: 2,
      name: "종료된 모임",
      type: "OFFLINE",
      location: "부산",
      dateTime: "2025-03-02T12:00:00Z",
      registrationEnd: "2025-03-01T12:00:00Z",
      image: "/test-image.jpg",
      participantCount: 5,
      capacity: 10,
      isCompleted: false,
      canceledAt: null,
    } as GatheringJoined;

    render(<MypageCard gatheringData={nonCancelableGatheringData} />);

    const button = screen.getByRole("button", { name: "참여 취소하기" });

    expect(button).toBeDisabled();
  });
});
