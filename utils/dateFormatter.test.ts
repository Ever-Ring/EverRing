import { formatDate } from "@utils/dateFormatter";

describe("formatDate", () => {
  it("should format a date correctly", () => {
    const date = "2025-12-18";
    expect(formatDate(date)).toBe("2025.12.18");
  });

  it("should format a date with single digit month and day correctly", () => {
    const date = "2025-1-9";
    expect(formatDate(date)).toBe("2025.01.09");
  });

  it("should return 'Invalid Date' for an invalid date", () => {
    const invalidDate1 = "";
    expect(formatDate(invalidDate1)).toBe("Invalid Date");

    const invalidDate2 = "string";
    expect(formatDate(invalidDate2)).toBe("Invalid Date");
  });

  it("should return '2000.01.01' for new Date('0')", () => {
    const zero1 = "0";
    expect(formatDate(zero1)).not.toBe("Invalid Date");

    const zero2 = "0";
    expect(formatDate(zero2)).toBe("2000.01.01");
  });
});
