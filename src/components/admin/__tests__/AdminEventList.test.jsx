import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import AdminEventList from "../AdminEventList";

const sampleEvents = [
  {
    id: "e1",
    title: "Event 1",
    startAt: "2026-01-01",
    category: "culture",
    status: "published",
    summary: "Summary 1",
    imageUrl: "",
  },
  {
    id: "e2",
    title: "Event 2",
    startAt: "2026-02-01",
    category: "food",
    status: "draft",
    summary: "Summary 2",
    imageUrl: "",
  },
];

describe("AdminEventList", () => {
  it("renders 'All Events' heading", () => {
    render(
      <AdminEventList
        events={[]}
        isLoading={false}
        handleEdit={() => {}}
        handleDelete={() => {}}
        errorMessage=""
        successMessage=""
      />
    );
    expect(screen.getByText("All Events")).toBeInTheDocument();
  });

  it("shows loading text when isLoading is true", () => {
    render(
      <AdminEventList
        events={[]}
        isLoading={true}
        handleEdit={() => {}}
        handleDelete={() => {}}
        errorMessage=""
        successMessage=""
      />
    );
    expect(screen.getByText("Loading events...")).toBeInTheDocument();
  });

  it("renders all events when not loading", () => {
    render(
      <AdminEventList
        events={sampleEvents}
        isLoading={false}
        handleEdit={() => {}}
        handleDelete={() => {}}
        errorMessage=""
        successMessage=""
      />
    );
    expect(screen.getByText("Event 1")).toBeInTheDocument();
    expect(screen.getByText("Event 2")).toBeInTheDocument();
  });

  it("shows error message when provided", () => {
    render(
      <AdminEventList
        events={[]}
        isLoading={false}
        handleEdit={() => {}}
        handleDelete={() => {}}
        errorMessage="Something failed"
        successMessage=""
      />
    );
    expect(screen.getByText("Something failed")).toBeInTheDocument();
  });

  it("shows success message when provided", () => {
    render(
      <AdminEventList
        events={[]}
        isLoading={false}
        handleEdit={() => {}}
        handleDelete={() => {}}
        errorMessage=""
        successMessage="Saved!"
      />
    );
    expect(screen.getByText("Saved!")).toBeInTheDocument();
  });
});
