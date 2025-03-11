import { render, screen, fireEvent } from "@testing-library/react";
import MyProfile from "@features/mypage/components/MyProfile";
import useUserStore from "@stores/userStore";
import { DEFAULT_USER_IMAGE } from "@constants/user";
import { ImgHTMLAttributes } from "react";

jest.mock("@stores/userStore", () => ({
  __esModule: true,
  default: jest.fn(() => ({})),
}));
jest.mock("@features/mypage/components/EditProfileModal", () =>
  jest.fn(({ isOpen, onClose }) =>
    isOpen ? (
      <div>
        <div>Mocked EditProfileModal</div>
        <button onClick={onClose} aria-label="취소" type="button">
          취소
        </button>
      </div>
    ) : null,
  ),
);
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: ImgHTMLAttributes<HTMLImageElement>) => <img {...props} />,
}));

describe("MyProfile Component Test", () => {
  const mockUserInfo = {
    image: "/image/test.png",
    name: "김에버",
    companyName: "테스트 회사",
    email: "test@example.com",
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useUserStore as jest.MockedFunction<typeof useUserStore>).mockReturnValue(
      mockUserInfo,
    );
  });

  test("should display user profile image when user data is available", () => {
    render(<MyProfile />);

    const profileImage = screen.getByRole("img", {
      name: "profile image",
    });

    expect(profileImage).toHaveAttribute("src", "/image/test.png");
  });

  test("should display default profile image when user image is not provided", () => {
    (useUserStore as jest.MockedFunction<typeof useUserStore>).mockReturnValue({
      image: null,
    });

    render(<MyProfile />);

    const profileImage = screen.getByRole("img", {
      name: "profile image",
    });

    expect(profileImage).toHaveAttribute("src", DEFAULT_USER_IMAGE);
  });

  test("should display user name when user data is available", () => {
    render(<MyProfile />);
    expect(screen.getByText("김에버")).toBeInTheDocument();
  });

  test("should display user company name when user data is available", () => {
    render(<MyProfile />);

    expect(screen.getByText("테스트 회사")).toBeInTheDocument();
  });

  test("should display user email when user data is available", () => {
    render(<MyProfile />);
    expect(screen.getByText("test@example.com")).toBeInTheDocument();
  });

  test("should open the modal when edit button is clicked", () => {
    render(<MyProfile />);

    const editButton = screen.getByRole("button", { name: "프로필 수정" });
    fireEvent.click(editButton);

    expect(screen.getByText("Mocked EditProfileModal")).toBeInTheDocument();
  });

  test("should close the modal when close button is clicked", () => {
    render(<MyProfile />);

    const editButton = screen.getByRole("button", { name: "프로필 수정" });
    fireEvent.click(editButton);

    const closeButton = screen.getByRole("button", { name: "취소" });
    fireEvent.click(closeButton);

    expect(
      screen.queryByText("Mocked EditProfileModal"),
    ).not.toBeInTheDocument();
  });
});
