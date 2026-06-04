import { describe, expect, it } from "vitest";
import { formatDate } from "../formatDate";

describe("formatDate", () => {
  it("returns 'TBD' when startAt is empty", () => {
    expect(formatDate("")).toBe("TBD");
    expect(formatDate(null)).toBe("TBD");
    expect(formatDate(undefined)).toBe("TBD");
  });

  it("returns 'TBD' for invalid date strings", () => {
    expect(formatDate("not-a-date")).toBe("TBD");
  });

  it("formats valid ISO date in short month form by default", () => {
    const result = formatDate("2026-05-15T10:00:00");
    expect(result).toMatch(/May/);
    expect(result).toMatch(/15/);
    expect(result).toMatch(/2026/);
  });

  it("formats with time when withTime is true", () => {
    const result = formatDate("2026-05-15T14:30:00", { withTime: true });
    expect(result).toMatch(/May/);
    expect(result).toMatch(/15/);
    expect(result).toMatch(/2026/);
    expect(result).toMatch(/\d{1,2}:\d{2}/);
  });

  it("uses long month name when withTime is true", () => {
    const withTime = formatDate("2026-01-01T00:00:00", { withTime: true });
    const withoutTime = formatDate("2026-01-01T00:00:00");
    expect(withTime).toMatch(/January/);
    expect(withoutTime).toMatch(/Jan(?!u)/);
  });
});
