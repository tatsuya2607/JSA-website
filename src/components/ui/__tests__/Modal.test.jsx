import { describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Modal from "../Modal";

describe("Modal", () => {
  it("does not render when isOpen is false", () => {
    render(
      <Modal isOpen={false} onClose={() => {}}>
        <p>content</p>
      </Modal>
    );
    expect(screen.queryByText("content")).not.toBeInTheDocument();
  });

  it("renders children when isOpen is true", () => {
    render(
      <Modal isOpen={true} onClose={() => {}}>
        <p>content</p>
      </Modal>
    );
    expect(screen.getByText("content")).toBeInTheDocument();
  });

  it("has role='dialog' and aria-modal='true'", () => {
    render(
      <Modal isOpen={true} onClose={() => {}} label="Test dialog">
        <p>content</p>
      </Modal>
    );
    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect(dialog).toHaveAttribute("aria-label", "Test dialog");
  });

  it("uses aria-labelledby when labelledBy provided", () => {
    render(
      <Modal isOpen={true} onClose={() => {}} labelledBy="title-id">
        <h1 id="title-id">Title</h1>
      </Modal>
    );
    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveAttribute("aria-labelledby", "title-id");
  });

  it("calls onClose when Escape key is pressed", () => {
    const onClose = vi.fn();
    render(
      <Modal isOpen={true} onClose={onClose}>
        <p>content</p>
      </Modal>
    );
    fireEvent.keyDown(document, { key: "Escape" });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("locks body scroll when open and restores on close", () => {
    document.body.style.overflow = "";
    const { rerender } = render(
      <Modal isOpen={true} onClose={() => {}}>
        <p>content</p>
      </Modal>
    );
    expect(document.body.style.overflow).toBe("hidden");

    rerender(
      <Modal isOpen={false} onClose={() => {}}>
        <p>content</p>
      </Modal>
    );
    expect(document.body.style.overflow).toBe("");
  });

  it("focuses first focusable element on open", () => {
    render(
      <Modal isOpen={true} onClose={() => {}}>
        <button>first</button>
        <button>second</button>
      </Modal>
    );
    expect(document.activeElement).toBe(screen.getByText("first"));
  });

  it("traps Tab key inside modal", async () => {
    const user = userEvent.setup();
    render(
      <Modal isOpen={true} onClose={() => {}}>
        <button>first</button>
        <button>last</button>
      </Modal>
    );
    const first = screen.getByText("first");
    const last = screen.getByText("last");

    last.focus();
    await user.tab();
    expect(document.activeElement).toBe(first);

    first.focus();
    await user.tab({ shift: true });
    expect(document.activeElement).toBe(last);
  });
});
