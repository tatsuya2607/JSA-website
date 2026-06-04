import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Hero from "../Hero";

describe("Hero", () => {
  it("renders title and subtitle", () => {
    render(
      <Hero
        title="Discover Japan"
        subtitle="Explore Japanese culture"
        image="https://example.com/img.jpg"
      />
    );
    expect(screen.getByText("Discover Japan")).toBeInTheDocument();
    expect(screen.getByText("Explore Japanese culture")).toBeInTheDocument();
  });

  it("renders title as h1", () => {
    render(<Hero title="Discover Japan" subtitle="x" image="i" />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Discover Japan"
    );
  });

  it("applies background image inline style", () => {
    const { container } = render(
      <Hero title="t" subtitle="s" image="https://example.com/x.jpg" />
    );
    const bg = container.querySelector('[style*="background-image"]');
    expect(bg).toBeTruthy();
    expect(bg.style.backgroundImage).toContain("https://example.com/x.jpg");
  });

  it("applies custom title color", () => {
    render(
      <Hero title="t" subtitle="s" image="i" titleColor="text-red-500" />
    );
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading.className).toMatch(/text-red-500/);
  });
});
