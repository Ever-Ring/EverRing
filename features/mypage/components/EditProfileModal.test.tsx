import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import EditProfileModal from "@features/mypage/components/EditProfileModal";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ImgHTMLAttributes } from "react";

const queryClient = new QueryClient();

const mockOnClose = jest.fn();
const mockMutate = jest.fn();

jest.mock("@features/mypage/hooks/useUpdateUserInfo", () => ({
  __esModule: true,
  default: () => ({
    mutate: mockMutate,
  }),
}));
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: ImgHTMLAttributes<HTMLImageElement>) => <img {...props} />,
}));

describe("EditProfileModal Component Test", () => {
  const mockUserInfo = {
    companyName: "테스트 회사",
    image: "/image/test.png",
  };

  function renderComponent() {
    return render(
      <QueryClientProvider client={queryClient}>
        <EditProfileModal
          isOpen
          onClose={mockOnClose}
          userInfo={mockUserInfo}
        />
      </QueryClientProvider>,
    );
  }

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should display user profile image", () => {
    renderComponent();

    const profileImage = screen.getByRole("img", {
      name: "profile image",
    });
    expect(profileImage).toBeInTheDocument();
    expect(profileImage).toHaveAttribute("src", "/image/test.png");
  });

  test("should edit profile image when profile image edit button is clicked", async () => {
    renderComponent();

    const profileImageButton = screen.getByLabelText("프로필 이미지 수정");
    fireEvent.click(profileImageButton);

    const fileInput = screen.getByLabelText(
      "프로필 이미지 수정",
    ) as HTMLInputElement;

    const file = new File(["dummy content"], "new.png", { type: "image/png" });
    fireEvent.change(fileInput, { target: { files: [file] } });

    expect(fileInput.files?.[0]).toBe(file);
  });

  test("should display user company name", () => {
    renderComponent();

    const input = screen.getByRole("textbox", { name: "직업 / 소속" });
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue("테스트 회사");
  });

  test("should edit company name", () => {
    renderComponent();

    const input = screen.getByRole("textbox", { name: "직업 / 소속" });
    fireEvent.change(input, { target: { value: "새 회사명" } });
    expect(input).toHaveValue("새 회사명");
  });

  test("should call onSubmit function when save button is clicked", async () => {
    renderComponent();
    const saveButton = screen.getByRole("button", { name: "저장" });
    fireEvent.click(saveButton);

    await waitFor(() => expect(mockMutate).toHaveBeenCalled());
  });

  test("should close modal when cancel button is clicked", () => {
    renderComponent();

    const cancelButton = screen.getByText("취소");
    fireEvent.click(cancelButton);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test("should close modal when close button is clicked", () => {
    renderComponent();
    const closeButton = screen.getByRole("button", { name: "닫기" });
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test("should not render modal when isOpen is false", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <EditProfileModal
          isOpen={false}
          onClose={mockOnClose}
          userInfo={mockUserInfo}
        />
      </QueryClientProvider>,
    );

    const modal = screen.queryByText("프로필 수정하기");
    expect(modal).not.toBeInTheDocument();
  });
});
