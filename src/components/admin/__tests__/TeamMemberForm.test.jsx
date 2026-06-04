import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TeamMemberForm from "../TeamMemberForm";

const baseFormData = {
  name: "",
  role: "",
  message: "",
  imageUrl: "",
  order: 0,
};

function renderForm(overrides = {}) {
  const props = {
    formData: baseFormData,
    setFormData: vi.fn(),
    handleSubmit: vi.fn((e) => e.preventDefault()),
    handleImageUpload: vi.fn(),
    isSaving: false,
    isEditing: false,
    isUploadingImage: false,
    formError: "",
    resetForm: vi.fn(),
    ...overrides,
  };
  render(<TeamMemberForm {...props} />);
  return props;
}

describe("TeamMemberForm", () => {
  it("renders all labels", () => {
    renderForm();
    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Role")).toBeInTheDocument();
    expect(screen.getByLabelText("Message")).toBeInTheDocument();
    expect(screen.getByLabelText("Image")).toBeInTheDocument();
    expect(screen.getByLabelText("Order")).toBeInTheDocument();
  });

  it("shows 'Add Member' when not editing", () => {
    renderForm({ isEditing: false });
    expect(screen.getByRole("button", { name: "Add Member" })).toBeInTheDocument();
  });

  it("shows 'Update Member' when editing", () => {
    renderForm({ isEditing: true });
    expect(
      screen.getByRole("button", { name: "Update Member" })
    ).toBeInTheDocument();
  });

  it("shows Cancel Edit button only when editing", () => {
    const { rerender } = render(
      <TeamMemberForm
        formData={baseFormData}
        setFormData={vi.fn()}
        handleSubmit={vi.fn()}
        handleImageUpload={vi.fn()}
        isSaving={false}
        isEditing={false}
        isUploadingImage={false}
        formError=""
        resetForm={vi.fn()}
      />
    );
    expect(screen.queryByText("Cancel Edit")).not.toBeInTheDocument();

    rerender(
      <TeamMemberForm
        formData={baseFormData}
        setFormData={vi.fn()}
        handleSubmit={vi.fn()}
        handleImageUpload={vi.fn()}
        isSaving={false}
        isEditing={true}
        isUploadingImage={false}
        formError=""
        resetForm={vi.fn()}
      />
    );
    expect(screen.getByText("Cancel Edit")).toBeInTheDocument();
  });

  it("disables submit button while saving", () => {
    renderForm({ isSaving: true });
    expect(screen.getByRole("button", { name: "Saving..." })).toBeDisabled();
  });

  it("displays formError when provided", () => {
    renderForm({ formError: "Upload failed" });
    expect(screen.getByText("Upload failed")).toBeInTheDocument();
  });

  it("shows uploading indicator when isUploadingImage", () => {
    renderForm({ isUploadingImage: true });
    expect(screen.getByText("Uploading image...")).toBeInTheDocument();
  });

  it("calls resetForm when Cancel Edit is clicked", async () => {
    const user = userEvent.setup();
    const props = renderForm({ isEditing: true });
    await user.click(screen.getByText("Cancel Edit"));
    expect(props.resetForm).toHaveBeenCalled();
  });
});
