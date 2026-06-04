import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";

vi.mock("../../api/events", () => ({
  getEventById: vi.fn(),
}));

import { getEventById } from "../../api/events";
import EventDetail from "../EventDetail";

beforeEach(() => {
  vi.clearAllMocks();
});

function renderDetail(id = "evt-1") {
  return render(
    <MemoryRouter initialEntries={[`/events/${id}`]}>
      <Routes>
        <Route path="/events/:id" element={<EventDetail />} />
        <Route path="/events" element={<div>events list</div>} />
      </Routes>
    </MemoryRouter>
  );
}

describe("EventDetail", () => {
  it("shows loading initially", () => {
    getEventById.mockReturnValueOnce(new Promise(() => {}));
    renderDetail();
    expect(screen.getByText(/Loading event details/)).toBeInTheDocument();
  });

  it("renders published event when fetched", async () => {
    getEventById.mockResolvedValueOnce({
      id: "evt-1",
      title: "Tea Ceremony",
      summary: "Traditional tea",
      startAt: "2026-05-15T10:00:00",
      venueName: "Main Hall",
      imageUrl: "https://example.com/tea.jpg",
      category: "culture",
      status: "published",
    });
    renderDetail();
    await waitFor(() => {
      expect(screen.getByText("Tea Ceremony")).toBeInTheDocument();
    });
    expect(screen.getByText("Traditional tea")).toBeInTheDocument();
    expect(screen.getByText("Main Hall")).toBeInTheDocument();
    expect(screen.getByText("Culture")).toBeInTheDocument();
  });

  it("shows 'unavailable' message when event is null", async () => {
    getEventById.mockResolvedValueOnce(null);
    renderDetail();
    await waitFor(() => {
      expect(screen.getByText(/This event is unavailable/)).toBeInTheDocument();
    });
  });

  it("shows 'unavailable' message when event is draft", async () => {
    getEventById.mockResolvedValueOnce({
      id: "evt-1",
      title: "x",
      status: "draft",
    });
    renderDetail();
    await waitFor(() => {
      expect(screen.getByText(/This event is unavailable/)).toBeInTheDocument();
    });
  });

  it("handles fetch error gracefully", async () => {
    getEventById.mockRejectedValueOnce(new Error("fail"));
    const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    renderDetail();
    await waitFor(() => {
      expect(screen.getByText(/This event is unavailable/)).toBeInTheDocument();
    });
    consoleErrorSpy.mockRestore();
  });

  it("renders 'Venue TBD' when venueName missing", async () => {
    getEventById.mockResolvedValueOnce({
      id: "evt-1",
      title: "Event",
      summary: "Summary",
      startAt: "2026-01-01",
      venueName: "",
      category: "culture",
      status: "published",
    });
    renderDetail();
    await waitFor(() => {
      expect(screen.getByText("Venue TBD")).toBeInTheDocument();
    });
  });
});
