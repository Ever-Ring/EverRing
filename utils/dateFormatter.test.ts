import {
  formatDate,
  formatDateTime,
  isExpired,
  getRemainingHours,
} from "@utils/dateFormatter";

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

describe("formatDateTime Test", () => {
  test("should format date and time correctly for valid input", () => {
    const dateTime = "2025-12-18T10:30:00Z";
    const { date, time } = formatDateTime(dateTime);
    expect(date).toBe("12월 18일");
    expect(time).toBe("19:30");
  });

  test("should format single digit month and day correctly", () => {
    const dateTime = "2025-01-09T00:05:00Z";
    const { date, time } = formatDateTime(dateTime);
    expect(date).toBe("1월 9일");
    expect(time).toBe("09:05");
  });

  test("should format Unix epoch time (1970-01-01T00:00:00Z) correctly", () => {
    const dateTime = "1970-01-01T00:00:00Z";
    const { date, time } = formatDateTime(dateTime);
    expect(date).toBe("1월 1일");
    expect(time).toBe("09:00");
  });

  test("should format correctly for a future date", () => {
    const dateTime = "2030-05-10T14:30:00Z";
    const { date, time } = formatDateTime(dateTime);
    expect(date).toBe("5월 10일");
    expect(time).toBe("23:30");
  });
});

describe("isExpired Test", () => {
  test("should return false if dateString is undefined", () => {
    expect(isExpired(undefined)).toBe(false);
  });

  test("should return true if dateString is in the past", () => {
    const pastDate = new Date();
    pastDate.setHours(pastDate.getHours() - 2);
    expect(isExpired(pastDate.toISOString())).toBe(true);
  });

  test("should return false if dateString is in the future", () => {
    const futureDate = new Date();
    futureDate.setHours(futureDate.getHours() + 2);
    expect(isExpired(futureDate.toISOString())).toBe(false);
  });
});

describe("getRemainingHours Test", () => {
  test("should return 0 if dateString is undefined", () => {
    expect(getRemainingHours(undefined as unknown as string)).toBe(0);
  });

  test("should return positive hours if dateString is in the future", () => {
    const futureDate = new Date();
    futureDate.setHours(futureDate.getHours() + 5);
    expect(getRemainingHours(futureDate.toISOString())).toBe(5);
  });

  test("should return negative hours if dateString is in the past", () => {
    const now = new Date();
    now.setMinutes(0, 0, 0);

    const pastDate = new Date(now);
    pastDate.setHours(pastDate.getHours() - 3);

    jest.useFakeTimers().setSystemTime(now);

    expect(getRemainingHours(pastDate.toISOString())).toBe(-3);

    jest.useRealTimers();
  });

  test("should return 0 if dateString is now", () => {
    const now = new Date();
    expect(getRemainingHours(now.toISOString())).toBe(0);
  });
});
