import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import EventCard from "../EventCard";

const tagColorMap = {
  Culture: "bg-green-100 text-green-600",
  Other: "bg-slate-200 text-slate-600",
};

const baseEvent = {
  id: "event-1",
  title: "Tea Ceremony",
  summary: "Traditional tea ceremony workshop",
  startAt: "2026-05-15T10:00:00",
  venueName: "Main Hall",
  imageUrl: "https://example.com/image.jpg",
  category: "culture",
};

function renderCard(event = baseEvent, categoryLabel = "Culture") {
  return render(
    <MemoryRouter>
      <EventCard
        event={event}
        formatDate={(d) => `formatted:${d}`}
        categoryLabel={categoryLabel}
        tagColorMap={tagColorMap}
      />
    </MemoryRouter>
  );
}

describe("EventCard", () => {
  it("renders event title and summary", () => {
    renderCard();
    expect(screen.getByText("Tea Ceremony")).toBeInTheDocument();
    expect(
      screen.getByText("Traditional tea ceremony workshop")
    ).toBeInTheDocument();
  });

  it("renders venue name when present", () => {
    renderCard();
    expect(screen.getByText("Main Hall")).toBeInTheDocument();
  });

  it("renders 'Venue TBD' when venueName is missing", () => {
    renderCard({ ...baseEvent, venueName: "" });
    expect(screen.getByText("Venue TBD")).toBeInTheDocument();
  });

  it("renders the image when imageUrl is present", () => {
    renderCard();
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", baseEvent.imageUrl);
  });

  it("renders fallback text when imageUrl is missing", () => {
    renderCard({ ...baseEvent, imageUrl: "" });
    expect(
      screen.getByText(/Event image will be announced soon/)
    ).toBeInTheDocument();
  });

  it("links to the event detail page", () => {
    renderCard();
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/events/event-1");
  });

  it("uses the provided formatDate function", () => {
    renderCard();
    expect(
      screen.getByText(`formatted:${baseEvent.startAt}`)
    ).toBeInTheDocument();
  });

  it("uses tagColorMap.Other when category label is unknown", () => {
    renderCard(baseEvent, "Unknown");
    const tag = screen.getByText("Unknown");
    expect(tag.className).toMatch(/slate/);
  });
});
