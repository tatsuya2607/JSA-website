import { describe, expect, it, beforeEach } from "vitest";
import { render, screen, act } from "@testing-library/react";
import FadeIn from "../FadeIn";

let observerCallback;

beforeEach(() => {
  global.IntersectionObserver = class {
    constructor(cb) {
      observerCallback = cb;
    }
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});

describe("FadeIn", () => {
  it("renders children", () => {
    render(<FadeIn>hello</FadeIn>);
    expect(screen.getByText("hello")).toBeInTheDocument();
  });

  it("starts with opacity-0 class", () => {
    render(<FadeIn>hello</FadeIn>);
    const wrapper = screen.getByText("hello");
    expect(wrapper.className).toMatch(/opacity-0/);
  });

  it("transitions to opacity-100 once in view", () => {
    render(<FadeIn>hello</FadeIn>);
    act(() => {
      observerCallback([{ isIntersecting: true }]);
    });
    const wrapper = screen.getByText("hello");
    expect(wrapper.className).toMatch(/opacity-100/);
  });

  it("applies the delay via inline style", () => {
    render(<FadeIn delay={300}>hello</FadeIn>);
    const wrapper = screen.getByText("hello");
    expect(wrapper.style.transitionDelay).toBe("300ms");
  });
});
