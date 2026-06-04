import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import AboutSection from "../AboutSection";

describe("AboutSection", () => {
  it("renders the heading", () => {
    render(<AboutSection />);
    expect(
      screen.getByText("About Japanese Student Association")
    ).toBeInTheDocument();
  });

  it("renders the about cards", () => {
    render(<AboutSection />);
    expect(screen.getByText("Community")).toBeInTheDocument();
    expect(screen.getByText("Events")).toBeInTheDocument();
    expect(screen.getByText("Experience")).toBeInTheDocument();
  });

  it("renders the description", () => {
    render(<AboutSection />);
    expect(
      screen.getByText(/passionate group of students/i)
    ).toBeInTheDocument();
  });
});
