import { EVENT_CATEGORIES, EVENT_STATUSES, toCategoryLabel } from "../../constants/eventSchema";

function EventForm({
    formData,
    setFormData,
    handleSubmit,
    handleImageUpload,
    isSaving,
    isUploadingImage,
    editingEventId,
    resetForm,
}) {
    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
        >
            <h1 className="text-2xl font-bold text-slate-800">
                {editingEventId ? "Edit Event" : "Create Event"}
            </h1>

            {/* Title */}
            <div>
                <label htmlFor="event-title" className="mb-1 block text-sm font-medium text-slate-700">Title</label>
                <input
                    id="event-title"
                    maxLength={50}
                    minLength={3}
                    required
                    value={formData.title}
                    onChange={(e) =>
                        setFormData((prev) => ({ ...prev, title: e.target.value }))
                    }
                    placeholder="Title"
                    className="w-full rounded-lg border border-slate-300 px-3 py-2"
                />
                <p className="mt-1 text-xs text-gray-400">{formData.title.length}/50</p>
            </div>

            {/* Date */}
            <div>
                <label htmlFor="event-start" className="mb-1 block text-sm font-medium text-slate-700">Date & Time</label>
                <input
                    id="event-start"
                    required
                    type="datetime-local"
                    value={formData.startAt}
                    onChange={(e) =>
                        setFormData((prev) => ({ ...prev, startAt: e.target.value }))
                    }
                    className="w-full rounded-lg border border-slate-300 px-3 py-2"
                />
            </div>

            {/* Category */}
            <div>
                <label htmlFor="event-category" className="mb-1 block text-sm font-medium text-slate-700">Category</label>
                <select
                    id="event-category"
                    required
                    value={formData.category}
                    onChange={(e) =>
                        setFormData((prev) => ({ ...prev, category: e.target.value }))
                    }
                    className="w-full rounded-lg border border-slate-300 px-3 py-2"
                >
                    <option value="">Select a category</option>
                    {EVENT_CATEGORIES.map((category) => (
                        <option key={category} value={category}>
                            {toCategoryLabel(category)}
                        </option>
                    ))}
                </select>
            </div>

            {/* Venue */}
            <div>
                <label htmlFor="event-venue" className="mb-1 block text-sm font-medium text-slate-700">Venue</label>
                <input
                    id="event-venue"
                    maxLength={50}
                    minLength={2}
                    value={formData.venueName}
                    onChange={(e) =>
                        setFormData((prev) => ({ ...prev, venueName: e.target.value }))
                    }
                    placeholder="Venue"
                    className="w-full rounded-lg border border-slate-300 px-3 py-2"
                />
                <p className="mt-1 text-xs text-gray-400">{formData.venueName.length}/50</p>
            </div>

            {/* Image */}
            <div>
                <label htmlFor="event-image" className="mb-1 block text-sm font-medium text-slate-700">Image</label>
                <input
                    id="event-image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2"
                />
                {isUploadingImage && (
                    <p className="mt-1 text-sm text-slate-500">Uploading image...</p>
                )}
            </div>

            {/* Summary */}
            <div>
                <label htmlFor="event-summary" className="mb-1 block text-sm font-medium text-slate-700">Summary</label>
                <textarea
                    id="event-summary"
                    required
                    maxLength={200}
                    minLength={10}
                    value={formData.summary}
                    onChange={(e) =>
                        setFormData((prev) => ({ ...prev, summary: e.target.value }))
                    }
                    placeholder="Summary"
                    className="h-28 w-full rounded-lg border border-slate-300 px-3 py-2"
                />
                <p className="mt-1 text-xs text-gray-400">{formData.summary.length}/200</p>
            </div>

            {/* Status */}
            <div>
                <label htmlFor="event-status" className="mb-1 block text-sm font-medium text-slate-700">Status</label>
                <select
                    id="event-status"
                    value={formData.status}
                    onChange={(e) =>
                        setFormData((prev) => ({ ...prev, status: e.target.value }))
                    }
                    className="w-full rounded-lg border border-slate-300 px-3 py-2"
                >
                    <option value="">Select status</option>
                    {EVENT_STATUSES.map((status) => (
                        <option key={status} value={status}>
                            {status}
                        </option>
                    ))}
                </select>
            </div>

            {/* Buttons */}
            <button
                type="submit"
                disabled={isSaving}
                className="w-full rounded-lg bg-indigo-600 px-4 py-2 text-white"
            >
                {isSaving
                    ? "Saving..."
                    : editingEventId
                        ? "Update Event"
                        : "Create Event"}
            </button>

            {editingEventId && (
                <button
                    type="button"
                    onClick={resetForm}
                    className="w-full rounded-lg border px-4 py-2"
                >
                    Cancel
                </button>
            )}
        </form>
    );
}

export default EventForm;