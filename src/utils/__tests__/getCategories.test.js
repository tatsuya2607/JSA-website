import { describe, expect, it } from "vitest";
import { getCategories } from "../getCategories";

describe("getCategories", () => {
  it("returns an array starting with 'All'", () => {
    const categories = getCategories();
    expect(categories[0]).toBe("All");
  });

  it("includes all category labels", () => {
    const categories = getCategories();
    expect(categories).toContain("Culture");
    expect(categories).toContain("Food");
    expect(categories).toContain("Workshop");
    expect(categories).toContain("Other");
  });

  it("includes one more item than EVENT_CATEGORIES (for 'All')", () => {
    const categories = getCategories();
    expect(categories.length).toBeGreaterThanOrEqual(2);
  });
});
