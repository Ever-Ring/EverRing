import validateImageSize from "@features/mypage/utils/fileUtils";

describe("validateImageSize", () => {
  test("should return true when file size is less than 5MB", () => {
    const file = new File(["dummy content"], "test.jpg", {
      type: "image/jpeg",
    });
    Object.defineProperty(file, "size", { value: 4 * 1024 * 1024 });

    expect(validateImageSize(file)).toBe(true);
  });

  test("should return false when file size exceeds 5MB.", () => {
    const file = new File(["dummy content"], "test.jpg", {
      type: "image/jpeg",
    });
    Object.defineProperty(file, "size", { value: 6 * 1024 * 1024 });

    expect(validateImageSize(file)).toBe(false);
  });
});
