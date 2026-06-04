import { describe, expect, it, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";

vi.mock("../../api/events", () => ({
  getEvents: vi.fn(),
}));

import { getEvents } from "../../api/events";
import useEvents from "../useEvents";

beforeEach(() => {
  vi.clearAllMocks();
});

describe("useEvents", () => {
  it("initially returns loading=true with empty events", () => {
    getEvents.mockReturnValueOnce(new Promise(() => {}));
    const { result } = renderHook(() => useEvents());
    expect(result.current.loading).toBe(true);
    expect(result.current.events).toEqual([]);
  });

  it("returns events when fetch resolves", async () => {
    getEvents.mockResolvedValueOnce([
      { id: "1", title: "Tea Ceremony" },
      { id: "2", title: "Sushi" },
    ]);
    const { result } = renderHook(() => useEvents());
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.events).toHaveLength(2);
  });

  it("sets loading=false even when fetch fails", async () => {
    getEvents.mockRejectedValueOnce(new Error("Network error"));
    const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const { result } = renderHook(() => useEvents());
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.events).toEqual([]);
    consoleErrorSpy.mockRestore();
  });
});
