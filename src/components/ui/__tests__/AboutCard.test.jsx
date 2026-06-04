import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import AboutCard from "../AboutCard";

function MockIcon(props) {
  return <svg data-testid="mock-icon" {...props} />;
}

describe("AboutCard", () => {
  it("renders title and description", () => {
    render(
      <AboutCard icon={MockIcon} title="Community" description="Connect people" />
    );
    expect(screen.getByText("Community")).toBeInTheDocument();
    expect(screen.getByText("Connect people")).toBeInTheDocument();
  });

  it("renders the provided icon", () => {
    render(
      <AboutCard icon={MockIcon} title="Community" description="Connect" />
    );
    expect(screen.getByTestId("mock-icon")).toBeInTheDocument();
  });
});
