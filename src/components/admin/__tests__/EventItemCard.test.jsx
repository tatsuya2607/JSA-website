import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import EventItemCard from "../EventItemCard";

const baseEvent = {
  id: "evt-1",
  title: "Tea Ceremony",
  startAt: "2026-05-15T10:00:00",
  category: "culture",
  status: "published",
  summary: "A traditional tea ceremony",
  imageUrl: "https://example.com/tea.jpg",
};

describe("EventItemCard", () => {
  it("renders event title and summary", () => {
    render(
      <EventItemCard
        event={baseEvent}
        handleEdit={() => {}}
        handleDelete={() => {}}
      />
    );
    expect(screen.getByText("Tea Ceremony")).toBeInTheDocument();
    expect(screen.getByText("A traditional tea ceremony")).toBeInTheDocument();
  });

  it("renders image when imageUrl is provided", () => {
    render(
      <EventItemCard
        event={baseEvent}
        handleEdit={() => {}}
        handleDelete={() => {}}
      />
    );
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", baseEvent.imageUrl);
  });

  it("renders 'No image' when imageUrl is missing", () => {
    render(
      <EventItemCard
        event={{ ...baseEvent, imageUrl: "" }}
        handleEdit={() => {}}
        handleDelete={() => {}}
      />
    );
    expect(screen.getByText("No image")).toBeInTheDocument();
  });

  it("renders 'TBD' when startAt is empty", () => {
    render(
      <EventItemCard
        event={{ ...baseEvent, startAt: "" }}
        handleEdit={() => {}}
        handleDelete={() => {}}
      />
    );
    expect(screen.getByText("TBD")).toBeInTheDocument();
  });

  it("calls handleEdit when Edit clicked", async () => {
    const user = userEvent.setup();
    const handleEdit = vi.fn();
    render(
      <EventItemCard
        event={baseEvent}
        handleEdit={handleEdit}
        handleDelete={() => {}}
      />
    );
    await user.click(screen.getByText("Edit"));
    expect(handleEdit).toHaveBeenCalledWith(baseEvent);
  });

  it("calls handleDelete with event id when Delete clicked", async () => {
    const user = userEvent.setup();
    const handleDelete = vi.fn();
    render(
      <EventItemCard
        event={baseEvent}
        handleEdit={() => {}}
        handleDelete={handleDelete}
      />
    );
    await user.click(screen.getByText("Delete"));
    expect(handleDelete).toHaveBeenCalledWith("evt-1");
  });
});
