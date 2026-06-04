import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Navbar from "../Navbar";

function renderAt(initialPath) {
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <Navbar />
    </MemoryRouter>
  );
}

describe("Navbar", () => {
  it("renders Home, Events, and Culture links", () => {
    renderAt("/");
    expect(screen.getAllByText("Home").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Events").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Culture").length).toBeGreaterThanOrEqual(1);
  });

  it("marks Home as active when on '/'", () => {
    renderAt("/");
    const homeLinks = screen.getAllByText("Home");
    const desktopHome = homeLinks.find((el) => el.tagName === "A");
    expect(desktopHome.className).toMatch(/bg-gray-950/);
  });

  it("does NOT mark Culture as active when on '/'", () => {
    renderAt("/");
    const cultureLinks = screen.getAllByText("Culture");
    const desktopCulture = cultureLinks.find((el) => el.tagName === "A");
    expect(desktopCulture.className).not.toMatch(/bg-gray-950/);
  });

  it("marks Events as active when on '/events'", () => {
    renderAt("/events");
    const eventsLinks = screen.getAllByText("Events");
    const desktopEvents = eventsLinks.find((el) => el.tagName === "A");
    expect(desktopEvents.className).toMatch(/bg-gray-950/);
  });

  it("Contact Us link goes to /#contact on home", () => {
    renderAt("/");
    const contactLinks = screen.getAllByText("Contact Us");
    const desktopContact = contactLinks.find((el) => el.tagName === "A");
    expect(desktopContact).toHaveAttribute("href", "/#contact");
  });

  it("Contact Us link goes to /events#contact on events page", () => {
    renderAt("/events");
    const contactLinks = screen.getAllByText("Contact Us");
    const desktopContact = contactLinks.find((el) => el.tagName === "A");
    expect(desktopContact).toHaveAttribute("href", "/events#contact");
  });
});
