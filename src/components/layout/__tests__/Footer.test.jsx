import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Footer from "../Footer";

describe("Footer", () => {
  it("renders the JSA name", () => {
    render(<Footer />);
    expect(screen.getByText("Japanese Student Association")).toBeInTheDocument();
  });

  it("renders the copyright text", () => {
    render(<Footer />);
    expect(screen.getByText(/2026/)).toBeInTheDocument();
    expect(screen.getByText(/Nihon Culture Club/)).toBeInTheDocument();
  });

  it("uses a semantic footer element", () => {
    const { container } = render(<Footer />);
    expect(container.querySelector("footer")).toBeInTheDocument();
  });
});
