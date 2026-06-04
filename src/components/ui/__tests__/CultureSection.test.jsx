import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import CultureSection from "../CultureSection";

const baseProps = {
  tag: "Traditional Art",
  title: "Arts & Crafts",
  description: "Beautiful Japanese arts",
  items: ["Origami", "Calligraphy"],
  image: "https://example.com/art.jpg",
};

describe("CultureSection", () => {
  it("renders tag, title, and description", () => {
    render(<CultureSection {...baseProps} />);
    expect(screen.getByText("Traditional Art")).toBeInTheDocument();
    expect(screen.getByText("Arts & Crafts")).toBeInTheDocument();
    expect(screen.getByText("Beautiful Japanese arts")).toBeInTheDocument();
  });

  it("renders all items in a list", () => {
    render(<CultureSection {...baseProps} />);
    expect(screen.getByText("Origami")).toBeInTheDocument();
    expect(screen.getByText("Calligraphy")).toBeInTheDocument();
  });

  it("renders image with title as alt", () => {
    render(<CultureSection {...baseProps} />);
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", "https://example.com/art.jpg");
    expect(img).toHaveAttribute("alt", "Arts & Crafts");
  });

  it("applies row-reverse class when isReversed is true", () => {
    const { container } = render(<CultureSection {...baseProps} isReversed />);
    const flexDiv = container.querySelector(".md\\:flex-row-reverse");
    expect(flexDiv).toBeInTheDocument();
  });

  it("applies row class when isReversed is false", () => {
    const { container } = render(
      <CultureSection {...baseProps} isReversed={false} />
    );
    const flexDiv = container.querySelector(".md\\:flex-row");
    expect(flexDiv).toBeInTheDocument();
  });

  it("handles empty items array safely", () => {
    render(<CultureSection {...baseProps} items={[]} />);
    expect(screen.getByText("Arts & Crafts")).toBeInTheDocument();
  });

  it("handles missing items prop safely", () => {
    const { items, ...rest } = baseProps;
    void items;
    render(<CultureSection {...rest} />);
    expect(screen.getByText("Arts & Crafts")).toBeInTheDocument();
  });
});
