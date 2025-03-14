import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import FloatingBar from "@features/list-detail/components/FloatingBar";

const defaultProps = {
  isTwoButtonMode: false,
  isJoined: false,
  isFull: false,
  onJoin: jest.fn(),
  onCancel: jest.fn(),
  onDeleteJoined: jest.fn(),
  isJoining: false,
  isCancelling: false,
  onShare: jest.fn(),
};

describe("FloatingBar Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render the main text when component is rendered", () => {
    render(<FloatingBar {...defaultProps} />);
    expect(
      screen.getByText(/건강한 삶을 위한 저속노화 모임/),
    ).toBeInTheDocument();
  });

  it("should render disabled '참여하기' button when isFull is true", () => {
    render(<FloatingBar {...defaultProps} isFull />);
    const button = screen.getByText("참여하기");
    expect(button.closest("button")).toBeDisabled();
  });

  it("should render disabled '취소 중...' button when isJoined is true and isCancelling is true", () => {
    render(<FloatingBar {...defaultProps} isJoined isCancelling />);
    const button = screen.getByText("취소 중...");
    expect(button.closest("button")).toBeDisabled();
  });

  it("should render '참여 취소하기' button and call onDeleteJoined when clicked if isJoined is true and isCancelling is false", () => {
    const mockOnDeleteJoined = jest.fn();
    render(
      <FloatingBar
        {...defaultProps}
        isJoined
        isCancelling={false}
        onDeleteJoined={mockOnDeleteJoined}
      />,
    );
    const button = screen.getByText("참여 취소하기");
    expect(button.closest("button")).not.toBeDisabled();
    fireEvent.click(button);
    expect(mockOnDeleteJoined).toHaveBeenCalledTimes(1);
  });

  it("should render disabled '참여 중...' button when isJoining is true", () => {
    render(<FloatingBar {...defaultProps} isJoined={false} isJoining />);
    const button = screen.getByText("참여 중...");
    expect(button.closest("button")).toBeDisabled();
  });

  it("should render '참여하기' button and call onJoin when clicked if not joined and not joining", () => {
    const mockOnJoin = jest.fn();
    render(
      <FloatingBar
        {...defaultProps}
        isJoined={false}
        isJoining={false}
        onJoin={mockOnJoin}
      />,
    );
    const button = screen.getByText("참여하기");
    expect(button.closest("button")).not.toBeDisabled();
    fireEvent.click(button);
    expect(mockOnJoin).toHaveBeenCalledTimes(1);
  });

  it("should render two buttons in two-button mode and call onCancel and onShare when clicked", () => {
    const mockOnCancel = jest.fn();
    const mockOnShare = jest.fn();
    render(
      <FloatingBar
        {...defaultProps}
        isTwoButtonMode
        onCancel={mockOnCancel}
        onShare={mockOnShare}
      />,
    );
    const cancelButton = screen.getByText("취소하기");
    const shareButton = screen.getByText("공유하기");
    fireEvent.click(cancelButton);
    fireEvent.click(shareButton);
    expect(mockOnCancel).toHaveBeenCalledTimes(1);
    expect(mockOnShare).toHaveBeenCalledTimes(1);
  });
});
