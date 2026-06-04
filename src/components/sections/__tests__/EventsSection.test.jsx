import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import EventsSection from "../EventsSection";

function renderSection(props) {
  return render(
    <MemoryRouter>
      <EventsSection {...props} />
    </MemoryRouter>
  );
}

const sampleEvent = (id) => ({
  id: `event-${id}`,
  title: `Event ${id}`,
  summary: "Summary",
  startAt: "2026-05-15T10:00:00",
  venueName: "Venue",
  imageUrl: "",
  category: "culture",
});

describe("EventsSection", () => {
  it("shows Loading... when loading is true", () => {
    renderSection({ events: [], loading: true });
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("shows EmptyState when no events and not loading", () => {
    renderSection({ events: [], loading: false });
    expect(screen.getByText("Coming Soon")).toBeInTheDocument();
    expect(screen.getByText("No events yet")).toBeInTheDocument();
  });

  it("renders up to 3 events", () => {
    const events = [1, 2, 3, 4, 5].map(sampleEvent);
    renderSection({ events, loading: false });
    expect(screen.getByText("Event 1")).toBeInTheDocument();
    expect(screen.getByText("Event 2")).toBeInTheDocument();
    expect(screen.getByText("Event 3")).toBeInTheDocument();
    expect(screen.queryByText("Event 4")).not.toBeInTheDocument();
  });

  it("shows 'View All Events' link when more than 3 events", () => {
    const events = [1, 2, 3, 4].map(sampleEvent);
    renderSection({ events, loading: false });
    const link = screen.getByText("View All Events");
    expect(link).toHaveAttribute("href", "/events");
  });

  it("does not show 'View All Events' when 3 or fewer events", () => {
    const events = [1, 2, 3].map(sampleEvent);
    renderSection({ events, loading: false });
    expect(screen.queryByText("View All Events")).not.toBeInTheDocument();
  });
});
