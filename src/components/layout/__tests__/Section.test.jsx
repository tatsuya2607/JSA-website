import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Section from "../Section";

describe("Section", () => {
  it("renders children", () => {
    render(<Section>hello</Section>);
    expect(screen.getByText("hello")).toBeInTheDocument();
  });

  it("applies the id attribute", () => {
    const { container } = render(<Section id="my-section">x</Section>);
    expect(container.querySelector("section")).toHaveAttribute("id", "my-section");
  });

  it("applies white background by default", () => {
    const { container } = render(<Section>x</Section>);
    const section = container.querySelector("section");
    expect(section.className).toMatch(/bg-white/);
  });

  it("applies gray background when bg='gray'", () => {
    const { container } = render(<Section bg="gray">x</Section>);
    const section = container.querySelector("section");
    expect(section.className).toMatch(/bg-gray-100/);
  });

  it("applies dark background when bg='dark'", () => {
    const { container } = render(<Section bg="dark">x</Section>);
    const section = container.querySelector("section");
    expect(section.className).toMatch(/bg-slate-900/);
  });

  it("appends custom className", () => {
    const { container } = render(<Section className="custom-class">x</Section>);
    const section = container.querySelector("section");
    expect(section.className).toMatch(/custom-class/);
  });
});
