import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import EventForm from "../EventForm";

const baseFormData = {
  title: "",
  category: "",
  startAt: "",
  venueName: "",
  imageUrl: "",
  summary: "",
  status: "",
};

function renderForm(overrides = {}) {
  const props = {
    formData: baseFormData,
    setFormData: vi.fn(),
    handleSubmit: vi.fn((e) => e.preventDefault()),
    handleImageUpload: vi.fn(),
    isSaving: false,
    isUploadingImage: false,
    editingEventId: "",
    errorMessage: "",
    resetForm: vi.fn(),
    ...overrides,
  };
  render(<EventForm {...props} />);
  return props;
}

describe("EventForm", () => {
  it("renders 'Create Event' heading when not editing", () => {
    renderForm();
    expect(screen.getByRole("heading", { name: "Create Event" })).toBeInTheDocument();
  });

  it("renders 'Edit Event' heading when editing", () => {
    renderForm({ editingEventId: "abc" });
    expect(screen.getByRole("heading", { name: "Edit Event" })).toBeInTheDocument();
  });

  it("renders all form labels", () => {
    renderForm();
    expect(screen.getByLabelText("Title")).toBeInTheDocument();
    expect(screen.getByLabelText("Date & Time")).toBeInTheDocument();
    expect(screen.getByLabelText("Category")).toBeInTheDocument();
    expect(screen.getByLabelText("Venue")).toBeInTheDocument();
    expect(screen.getByLabelText("Image")).toBeInTheDocument();
    expect(screen.getByLabelText("Summary")).toBeInTheDocument();
    expect(screen.getByLabelText("Status")).toBeInTheDocument();
  });

  it("displays error message when provided", () => {
    renderForm({ errorMessage: "Validation failed" });
    expect(screen.getByText("Validation failed")).toBeInTheDocument();
  });

  it("disables submit button while saving", () => {
    renderForm({ isSaving: true });
    expect(screen.getByRole("button", { name: /Saving/ })).toBeDisabled();
  });

  it("shows Cancel button only when editing", () => {
    const { rerender } = render(
      <EventForm
        formData={baseFormData}
        setFormData={vi.fn()}
        handleSubmit={vi.fn()}
        handleImageUpload={vi.fn()}
        isSaving={false}
        isUploadingImage={false}
        editingEventId=""
        errorMessage=""
        resetForm={vi.fn()}
      />
    );
    expect(screen.queryByText("Cancel")).not.toBeInTheDocument();

    rerender(
      <EventForm
        formData={baseFormData}
        setFormData={vi.fn()}
        handleSubmit={vi.fn()}
        handleImageUpload={vi.fn()}
        isSaving={false}
        isUploadingImage={false}
        editingEventId="abc"
        errorMessage=""
        resetForm={vi.fn()}
      />
    );
    expect(screen.getByText("Cancel")).toBeInTheDocument();
  });

  it("calls handleSubmit on form submission", async () => {
    const user = userEvent.setup();
    const props = renderForm({
      formData: {
        ...baseFormData,
        title: "Valid Title",
        category: "culture",
        startAt: "2026-05-15T10:00",
        summary: "Some valid summary that is long enough",
      },
    });
    await user.click(screen.getByRole("button", { name: "Create Event" }));
    expect(props.handleSubmit).toHaveBeenCalled();
  });

  it("calls handleImageUpload when a file is selected", async () => {
    const props = renderForm();
    const input = screen.getByLabelText("Image");
    const file = new File(["x"], "image.jpg", { type: "image/jpeg" });
    await userEvent.upload(input, file);
    expect(props.handleImageUpload).toHaveBeenCalled();
  });
});
