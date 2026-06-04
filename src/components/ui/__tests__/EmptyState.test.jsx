import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import EmptyState from "../EmptyState";

function renderWithRouter(ui) {
  return render(<MemoryRouter>{ui}</MemoryRouter>);
}

describe("EmptyState", () => {
  it("renders default title and message", () => {
    renderWithRouter(<EmptyState />);
    expect(screen.getByText("No Data")).toBeInTheDocument();
    expect(screen.getByText("Nothing to display")).toBeInTheDocument();
  });

  it("renders custom title, message, and subMessage", () => {
    renderWithRouter(
      <EmptyState
        title="No events"
        message="Coming soon"
        subMessage="Stay tuned"
      />
    );
    expect(screen.getByText("No events")).toBeInTheDocument();
    expect(screen.getByText("Coming soon")).toBeInTheDocument();
    expect(screen.getByText("Stay tuned")).toBeInTheDocument();
  });

  it("does not render button when buttonText is empty", () => {
    renderWithRouter(<EmptyState buttonText="" buttonLink="/" />);
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });

  it("does not render button when buttonLink is empty", () => {
    renderWithRouter(<EmptyState buttonText="Go home" buttonLink="" />);
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });

  it("renders a Link when both buttonText and buttonLink provided", () => {
    renderWithRouter(<EmptyState buttonText="Go home" buttonLink="/" />);
    const link = screen.getByRole("link", { name: "Go home" });
    expect(link).toHaveAttribute("href", "/");
  });
});
