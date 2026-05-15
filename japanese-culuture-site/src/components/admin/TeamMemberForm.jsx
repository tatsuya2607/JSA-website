function TeamMemberForm({
  formData,
  setFormData,
  handleSubmit,
  handleImageUpload,
  isSaving,
  isEditing,
  isUploadingImage,
  formError,
  resetForm,
}) {
  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      <h1 className="text-2xl font-bold text-slate-800">
        Admin: Team Manager
      </h1>

      <div>
        <label htmlFor="member-name" className="mb-1 block text-sm font-medium text-slate-700">Name</label>
        <input
          id="member-name"
          required
          value={formData.name}
          onChange={(event) =>
            setFormData((prev) => ({ ...prev, name: event.target.value }))
          }
          placeholder="Name"
          className="w-full rounded-lg border border-slate-300 px-3 py-2"
        />
      </div>

      <div>
        <label htmlFor="member-role" className="mb-1 block text-sm font-medium text-slate-700">Role</label>
        <input
          id="member-role"
          required
          value={formData.role}
          onChange={(event) =>
            setFormData((prev) => ({ ...prev, role: event.target.value }))
          }
          placeholder="Role"
          className="w-full rounded-lg border border-slate-300 px-3 py-2"
        />
      </div>

      <div>
        <label htmlFor="member-message" className="mb-1 block text-sm font-medium text-slate-700">Message</label>
        <input
          id="member-message"
          required
          value={formData.message}
          onChange={(event) =>
            setFormData((prev) => ({ ...prev, message: event.target.value }))
          }
          placeholder="Message (1 line)"
          maxLength={120}
          className="w-full rounded-lg border border-slate-300 px-3 py-2"
        />
      </div>

      <div>
        <label htmlFor="member-image" className="mb-1 block text-sm font-medium text-slate-700">Image</label>
        <input
          id="member-image"
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="w-full rounded-lg border border-slate-300 px-3 py-2"
        />
        {isUploadingImage && (
          <p className="mt-1 text-sm text-slate-500">Uploading image...</p>
        )}
      </div>

      {formError && (
        <p className="text-sm text-rose-600">{formError}</p>
      )}

      <div>
        <label htmlFor="member-order" className="mb-1 block text-sm font-medium text-slate-700">Order</label>
        <input
          id="member-order"
          required
          type="number"
          value={formData.order}
          onChange={(event) =>
            setFormData((prev) => ({
              ...prev,
              order: Number(event.target.value),
            }))
          }
          placeholder="Order"
          className="w-full rounded-lg border border-slate-300 px-3 py-2"
        />
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          type="submit"
          disabled={isSaving}
          className="rounded-lg bg-indigo-600 px-4 py-2 font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSaving ? "Saving..." : isEditing ? "Update Member" : "Add Member"}
        </button>

        {isEditing && (
          <button
            type="button"
            onClick={resetForm}
            className="rounded-lg border border-slate-300 px-4 py-2 font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            Cancel Edit
          </button>
        )}
      </div>
    </form>
  );
}

export default TeamMemberForm;