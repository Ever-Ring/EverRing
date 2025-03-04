import { render, screen, fireEvent } from "@testing-library/react";
import Gnb from "@components/common/Gnb";
import { usePathname } from "next/navigation";
import useIsAuthenticated from "@hooks/useIsAuthenticated";
import useLogout from "@hooks/useLogout";
import mockRouter from "next-router-mock";
import { MemoryRouterProvider } from "next-router-mock/MemoryRouterProvider";
import useUserStore from "@stores/userStore";
import { useFavoriteStore } from "@stores/favoriteStore";
import { DEFAULT_USER_IMAGE } from "@constants/user";
import { ImgHTMLAttributes } from "react";

jest.mock(
  "next/dist/shared/lib/router-context",
  () =>
    jest.requireActual("next/dist/shared/lib/router-context.shared-runtime"),
  { virtual: true },
);
jest.mock("@hooks/useIsAuthenticated", () => jest.fn());
jest.mock("@hooks/useLogout", () => jest.fn());
jest.mock("next/navigation", () => ({ usePathname: jest.fn() }));
jest.mock("@stores/userStore", () => ({
  __esModule: true,
  default: jest.fn(() => ({
    image: null,
  })),
}));
jest.mock("@stores/favoriteStore", () => ({
  __esModule: true,
  useFavoriteStore: jest.fn(() => ({
    favorites: [],
  })),
}));
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: ImgHTMLAttributes<HTMLImageElement>) => <img {...props} />,
}));

describe("Gnb Component Test", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should navigate to /list when logo is clicked", async () => {
    await render(<Gnb />, {
      wrapper: MemoryRouterProvider,
    });
    fireEvent.click(screen.getByAltText("logo"));
    expect(mockRouter.asPath).toEqual("/list");
  });

  test("should navigate to /list when 모임 찾기 is clicked", async () => {
    await render(<Gnb />, {
      wrapper: MemoryRouterProvider,
    });
    fireEvent.click(screen.getByText("모임 찾기"));
    expect(mockRouter.asPath).toEqual("/list");
  });

  test("should navigate to /liked when 찜한 모임 is clicked", async () => {
    await render(<Gnb />, {
      wrapper: MemoryRouterProvider,
    });
    fireEvent.click(screen.getByText("찜한 모임"));
    expect(mockRouter.asPath).toEqual("/liked");
  });

  test("should navigate to /review when 모든 리뷰 is clicked", async () => {
    await render(<Gnb />, {
      wrapper: MemoryRouterProvider,
    });
    fireEvent.click(screen.getByText("모든 리뷰"));
    expect(mockRouter.asPath).toEqual("/review");
  });

  test("should render login link when user is not authenticated", () => {
    (useIsAuthenticated as jest.Mock).mockReturnValue(false);
    render(<Gnb />);
    expect(screen.getByText("로그인")).toBeInTheDocument();
  });

  test("should navigate to /signin when 로그인 is clicked", async () => {
    (useIsAuthenticated as jest.Mock).mockReturnValue(false);
    await render(<Gnb />, {
      wrapper: MemoryRouterProvider,
    });
    fireEvent.click(screen.getByText("로그인"));
    expect(mockRouter.asPath).toEqual("/signin");
  });

  test("should render user profile image when user is authenticated", () => {
    (useIsAuthenticated as jest.Mock).mockReturnValue(true);

    (useUserStore as jest.MockedFunction<typeof useUserStore>).mockReturnValue({
      image: "/image/test.png",
    });

    render(<Gnb />);

    const profileImage = screen.getByRole("img", {
      name: "user profile image",
    });
    expect(profileImage).toHaveAttribute("src", "/image/test.png");
  });

  test("should render default profile image when user image is not provided", () => {
    (useIsAuthenticated as jest.Mock).mockReturnValue(true);
    (useUserStore as jest.MockedFunction<typeof useUserStore>).mockReturnValue({
      image: null,
    });

    render(<Gnb />);
    const profileImage = screen.getByRole("img", {
      name: "user profile image",
    });

    expect(profileImage).toHaveAttribute("src", DEFAULT_USER_IMAGE);
  });

  test("should toggle dropdown when profile button is clicked", () => {
    (useIsAuthenticated as jest.Mock).mockReturnValue(true);
    render(<Gnb />);

    const profileButton = screen.getByRole("button");
    fireEvent.click(profileButton);
    expect(screen.getByText("마이페이지")).toBeInTheDocument();

    fireEvent.click(profileButton);
    expect(screen.queryByText("마이페이지")).not.toBeInTheDocument();
  });

  test("should navigate to /mypage when 마이페이지 is clicked", async () => {
    (useIsAuthenticated as jest.Mock).mockReturnValue(true);
    await render(<Gnb />, {
      wrapper: MemoryRouterProvider,
    });
    const profileButton = screen.getByRole("button");
    fireEvent.click(profileButton);
    fireEvent.click(screen.getByText("마이페이지"));
    expect(mockRouter.asPath).toEqual("/mypage");
  });

  test("should call logout function when 로그아웃 is clicked", () => {
    (useIsAuthenticated as jest.Mock).mockReturnValue(true);
    const mockLogout = jest.fn();
    (useLogout as jest.Mock).mockReturnValue(mockLogout);

    render(<Gnb />);

    const profileButton = screen.getByRole("button");
    fireEvent.click(profileButton);
    fireEvent.click(screen.getByText("로그아웃"));
    expect(mockLogout).toHaveBeenCalledTimes(1);
  });

  test("should highlight the clicked link", () => {
    (usePathname as jest.Mock).mockReturnValue("/list");
    render(<Gnb />);
    expect(screen.getByText("모임 찾기")).toHaveClass(
      "font-bold text-mint-600",
    );
  });

  test("should display a badge with the number of favorites when there are favorites", () => {
    (
      useFavoriteStore as jest.MockedFunction<typeof useFavoriteStore>
    ).mockReturnValue({
      favorites: [1, 2, 3],
    });
    render(<Gnb />);

    const favoriteBadge = screen.getByText("3");
    expect(favoriteBadge).toBeInTheDocument();
    expect(favoriteBadge).toHaveClass(
      "ml-1 rounded-full bg-black px-2 text-xs font-semibold text-white",
    );
  });

  test("should not display a badge when there are no favorites", () => {
    (
      useFavoriteStore as jest.MockedFunction<typeof useFavoriteStore>
    ).mockReturnValue({
      favorites: [],
    });
    render(<Gnb />);

    const favoriteBadge = screen.queryByText("0");
    expect(favoriteBadge).not.toBeInTheDocument();
  });
});
