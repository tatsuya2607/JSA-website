import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, act } from "@testing-library/react";
import useInView from "../useInView";

let observerCallback;
let observeMock;
let unobserveMock;
let disconnectMock;

beforeEach(() => {
  observeMock = vi.fn();
  unobserveMock = vi.fn();
  disconnectMock = vi.fn();
  observerCallback = null;

  global.IntersectionObserver = class {
    constructor(cb) {
      observerCallback = cb;
    }
    observe = observeMock;
    unobserve = unobserveMock;
    disconnect = disconnectMock;
  };
});

function TestComponent({ onState }) {
  const [ref, isInView] = useInView();
  onState(isInView);
  return <div ref={ref} data-testid="target" />;
}

describe("useInView", () => {
  it("initially returns isInView = false", () => {
    let captured;
    render(<TestComponent onState={(v) => (captured = v)} />);
    expect(captured).toBe(false);
  });

  it("observes the ref'd element", () => {
    render(<TestComponent onState={() => {}} />);
    expect(observeMock).toHaveBeenCalledTimes(1);
  });

  it("sets isInView to true when element intersects", () => {
    let captured = false;
    const onState = (v) => {
      captured = v;
    };
    render(<TestComponent onState={onState} />);
    act(() => {
      observerCallback([{ isIntersecting: true }]);
    });
    expect(captured).toBe(true);
  });

  it("disconnects observer on unmount", () => {
    const { unmount } = render(<TestComponent onState={() => {}} />);
    unmount();
    expect(disconnectMock).toHaveBeenCalled();
  });
});
