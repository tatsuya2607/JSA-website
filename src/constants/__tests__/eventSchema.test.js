import { describe, expect, it } from "vitest";
import {
  EVENT_CATEGORIES,
  EVENT_STATUSES,
  CATEGORY_LABELS,
  toCategoryLabel,
  normalizeEventPayload,
} from "../eventSchema";

describe("toCategoryLabel", () => {
  it("returns 'Other' for falsy values", () => {
    expect(toCategoryLabel("")).toBe("Other");
    expect(toCategoryLabel(null)).toBe("Other");
    expect(toCategoryLabel(undefined)).toBe("Other");
  });

  it("returns 'Other' for unknown categories", () => {
    expect(toCategoryLabel("unknown-category")).toBe("Other");
  });

  it("maps known category keys to labels", () => {
    expect(toCategoryLabel("culture")).toBe("Culture");
    expect(toCategoryLabel("workshop")).toBe("Workshop");
    expect(toCategoryLabel("food")).toBe("Food");
    expect(toCategoryLabel("entertainment")).toBe("Entertainment");
  });

  it("has a label for every EVENT_CATEGORIES entry", () => {
    EVENT_CATEGORIES.forEach((category) => {
      expect(CATEGORY_LABELS[category]).toBeDefined();
    });
  });
});

describe("normalizeEventPayload", () => {
  it("trims string fields", () => {
    const result = normalizeEventPayload({
      title: "  hello  ",
      category: "culture",
      startAt: "2026-01-01",
      venueName: "  venue  ",
      summary: "  summary  ",
      imageUrl: "  url  ",
      status: "published",
    });

    expect(result.title).toBe("hello");
    expect(result.venueName).toBe("venue");
    expect(result.summary).toBe("summary");
    expect(result.imageUrl).toBe("url");
  });

  it("defaults invalid category to 'culture'", () => {
    const result = normalizeEventPayload({ category: "invalid" });
    expect(result.category).toBe("culture");
  });

  it("preserves valid category", () => {
    const result = normalizeEventPayload({ category: "workshop" });
    expect(result.category).toBe("workshop");
  });

  it("defaults invalid status to 'draft'", () => {
    const result = normalizeEventPayload({ status: "invalid" });
    expect(result.status).toBe("draft");
  });

  it("preserves valid status", () => {
    const result = normalizeEventPayload({ status: "published" });
    expect(result.status).toBe("published");
  });

  it("handles undefined inputs gracefully", () => {
    const result = normalizeEventPayload({});
    expect(result.title).toBe("");
    expect(result.venueName).toBe("");
    expect(result.summary).toBe("");
    expect(result.imageUrl).toBe("");
    expect(result.startAt).toBe("");
    expect(result.category).toBe("culture");
    expect(result.status).toBe("draft");
  });
});

describe("EVENT_STATUSES", () => {
  it("contains draft and published", () => {
    expect(EVENT_STATUSES).toContain("draft");
    expect(EVENT_STATUSES).toContain("published");
  });
});
