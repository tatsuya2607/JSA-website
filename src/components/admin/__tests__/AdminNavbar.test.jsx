import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";

vi.mock("firebase/auth", () => ({
  signOut: vi.fn(),
}));

vi.mock("../../../firebase/firebase", () => ({
  auth: "MOCK_AUTH",
}));

import { signOut } from "firebase/auth";
import AdminNavbar from "../AdminNavbar";

beforeEach(() => {
  vi.clearAllMocks();
});

function renderNav(initialPath = "/admin") {
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <Routes>
        <Route path="/admin/*" element={<AdminNavbar />} />
        <Route path="/admin-login" element={<div>login page</div>} />
      </Routes>
    </MemoryRouter>
  );
}

describe("AdminNavbar", () => {
  it("renders 'JSA Admin' brand", () => {
    renderNav();
    expect(screen.getByText("JSA Admin")).toBeInTheDocument();
  });

  it("renders all admin nav links", () => {
    renderNav();
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("Events Management")).toBeInTheDocument();
    expect(screen.getByText("Team Management")).toBeInTheDocument();
  });

  it("renders Logout button", () => {
    renderNav();
    expect(screen.getByText("Logout")).toBeInTheDocument();
  });

  it("calls signOut and redirects on Logout click", async () => {
    signOut.mockResolvedValueOnce(undefined);
    const user = userEvent.setup();
    renderNav();
    await user.click(screen.getByText("Logout"));
    expect(signOut).toHaveBeenCalledWith("MOCK_AUTH");
    await waitFor(() => {
      expect(screen.getByText("login page")).toBeInTheDocument();
    });
  });

  it("handles signOut error gracefully", async () => {
    signOut.mockRejectedValueOnce(new Error("Sign out failed"));
    const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const user = userEvent.setup();
    renderNav();
    await user.click(screen.getByText("Logout"));
    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalled();
    });
    consoleErrorSpy.mockRestore();
  });
});
