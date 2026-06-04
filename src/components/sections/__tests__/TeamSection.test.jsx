import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";

vi.mock("../../api/teamMembers", () => ({
  fetchMembers: vi.fn(),
}));

import { fetchMembers } from "../../api/teamMembers";
import TeamSection from "../TeamSection";

beforeEach(() => {
  vi.clearAllMocks();
});

describe("TeamSection", () => {
  it("renders heading", async () => {
    fetchMembers.mockResolvedValueOnce([]);
    render(<TeamSection />);
    expect(screen.getByText("Meet Our Team")).toBeInTheDocument();
  });

  it("shows Loading... while fetching", () => {
    fetchMembers.mockReturnValueOnce(new Promise(() => {}));
    render(<TeamSection />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders team member cards when fetched", async () => {
    fetchMembers.mockResolvedValueOnce([
      {
        id: "m1",
        name: "Alice",
        role: "President",
        message: "Welcome",
        imageUrl: "https://example.com/a.jpg",
      },
    ]);
    render(<TeamSection />);
    await waitFor(() => {
      expect(screen.getByText("Alice")).toBeInTheDocument();
    });
    expect(screen.getByText("President")).toBeInTheDocument();
    expect(screen.getByText("Welcome")).toBeInTheDocument();
  });

  it("stops loading when fetch fails", async () => {
    fetchMembers.mockRejectedValueOnce(new Error("fail"));
    const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    render(<TeamSection />);
    await waitFor(() => {
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
    });
    consoleErrorSpy.mockRestore();
  });
});
