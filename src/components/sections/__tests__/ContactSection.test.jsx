import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import ContactSection from "../ContactSection";

describe("ContactSection", () => {
  it("renders the heading", () => {
    render(<ContactSection />);
    expect(screen.getByText("Get In Touch")).toBeInTheDocument();
  });

  it("renders email link with mailto", () => {
    render(<ContactSection />);
    const emailLink = screen.getByText("jsa@university.edu").closest("a");
    expect(emailLink).toHaveAttribute("href", "mailto:jsa@university.edu");
  });

  it("renders social media links with aria-label", () => {
    render(<ContactSection />);
    expect(screen.getByLabelText("Facebook")).toBeInTheDocument();
    expect(screen.getByLabelText("X (Twitter)")).toBeInTheDocument();
    expect(screen.getByLabelText("Instagram")).toBeInTheDocument();
  });

  it("social links open in new tab with safe rel", () => {
    render(<ContactSection />);
    const fb = screen.getByLabelText("Facebook");
    expect(fb).toHaveAttribute("target", "_blank");
    expect(fb).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("uses different card background when bg='gray'", () => {
    const { container } = render(<ContactSection bg="gray" />);
    expect(container.querySelector(".bg-white")).toBeInTheDocument();
  });
});
