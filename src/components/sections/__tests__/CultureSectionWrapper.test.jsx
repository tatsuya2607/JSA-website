import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import CultureSectionWrapper from "../CultureSectionWrapper";

describe("CultureSectionWrapper", () => {
  it("renders the section heading", () => {
    render(<CultureSectionWrapper />);
    expect(screen.getByText("Japanese Culture")).toBeInTheDocument();
  });

  it("renders culture sections from data", () => {
    render(<CultureSectionWrapper />);
    expect(screen.getByText("Arts & Crafts")).toBeInTheDocument();
    expect(screen.getByText("Food & Cuisine")).toBeInTheDocument();
    expect(screen.getByText("Festivals & Traditions")).toBeInTheDocument();
  });
});
