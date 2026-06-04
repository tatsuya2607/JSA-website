import { describe, expect, it } from "vitest";
import { renderHook } from "@testing-library/react";
import useFilteredEvents from "../useFilteredEvents";

const sampleEvents = [
  { id: "1", category: "culture", title: "Tea Ceremony" },
  { id: "2", category: "food", title: "Sushi Night" },
  { id: "3", category: "workshop", title: "Origami Class" },
  { id: "4", category: "culture", title: "Calligraphy" },
];

describe("useFilteredEvents", () => {
  it("returns all events when activeCategory is 'All'", () => {
    const { result } = renderHook(() => useFilteredEvents(sampleEvents, "All"));
    expect(result.current).toHaveLength(4);
  });

  it("filters events by category label", () => {
    const { result } = renderHook(() =>
      useFilteredEvents(sampleEvents, "Culture")
    );
    expect(result.current).toHaveLength(2);
    expect(result.current.every((e) => e.category === "culture")).toBe(true);
  });

  it("returns empty array when no events match", () => {
    const { result } = renderHook(() =>
      useFilteredEvents(sampleEvents, "Seasonal")
    );
    expect(result.current).toEqual([]);
  });

  it("handles empty events list", () => {
    const { result } = renderHook(() => useFilteredEvents([], "All"));
    expect(result.current).toEqual([]);
  });

  it("memoizes result for stable inputs", () => {
    const { result, rerender } = renderHook(
      ({ events, category }) => useFilteredEvents(events, category),
      { initialProps: { events: sampleEvents, category: "Culture" } }
    );
    const first = result.current;
    rerender({ events: sampleEvents, category: "Culture" });
    expect(result.current).toBe(first);
  });
});
