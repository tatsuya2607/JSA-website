import { describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FilterDropdown from "../FilterDropdown";

const categories = ["All", "Culture", "Food", "Workshop"];

describe("FilterDropdown", () => {
  it("renders the toggle button", () => {
    render(
      <FilterDropdown
        categories={categories}
        activeCategory="All"
        setActiveCategory={() => {}}
      />
    );
    expect(screen.getByText("Filter by Category")).toBeInTheDocument();
  });

  it("does not show options initially", () => {
    render(
      <FilterDropdown
        categories={categories}
        activeCategory="All"
        setActiveCategory={() => {}}
      />
    );
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("opens the listbox when toggle is clicked", async () => {
    const user = userEvent.setup();
    render(
      <FilterDropdown
        categories={categories}
        activeCategory="All"
        setActiveCategory={() => {}}
      />
    );
    await user.click(screen.getByText("Filter by Category"));
    expect(screen.getByRole("listbox")).toBeInTheDocument();
  });

  it("calls setActiveCategory when an option is clicked", async () => {
    const setActive = vi.fn();
    const user = userEvent.setup();
    render(
      <FilterDropdown
        categories={categories}
        activeCategory="All"
        setActiveCategory={setActive}
      />
    );
    await user.click(screen.getByText("Filter by Category"));
    await user.click(screen.getByText("Culture"));
    expect(setActive).toHaveBeenCalledWith("Culture");
  });

  it("closes when an option is clicked", async () => {
    const user = userEvent.setup();
    render(
      <FilterDropdown
        categories={categories}
        activeCategory="All"
        setActiveCategory={() => {}}
      />
    );
    await user.click(screen.getByText("Filter by Category"));
    await user.click(screen.getByText("Culture"));
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("closes on Escape key", async () => {
    const user = userEvent.setup();
    render(
      <FilterDropdown
        categories={categories}
        activeCategory="All"
        setActiveCategory={() => {}}
      />
    );
    await user.click(screen.getByText("Filter by Category"));
    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("closes when clicking outside", async () => {
    const user = userEvent.setup();
    render(
      <div>
        <button>outside</button>
        <FilterDropdown
          categories={categories}
          activeCategory="All"
          setActiveCategory={() => {}}
        />
      </div>
    );
    await user.click(screen.getByText("Filter by Category"));
    expect(screen.getByRole("listbox")).toBeInTheDocument();
    fireEvent.mouseDown(screen.getByText("outside"));
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("marks active category with aria-selected", async () => {
    const user = userEvent.setup();
    render(
      <FilterDropdown
        categories={categories}
        activeCategory="Culture"
        setActiveCategory={() => {}}
      />
    );
    await user.click(screen.getByText("Filter by Category"));
    const cultureOption = screen.getByRole("option", { name: "Culture" });
    expect(cultureOption).toHaveAttribute("aria-selected", "true");
  });

  it("toggle button has correct aria attributes", () => {
    render(
      <FilterDropdown
        categories={categories}
        activeCategory="All"
        setActiveCategory={() => {}}
      />
    );
    const toggle = screen.getByText("Filter by Category");
    expect(toggle).toHaveAttribute("aria-haspopup", "listbox");
    expect(toggle).toHaveAttribute("aria-expanded", "false");
  });
});
