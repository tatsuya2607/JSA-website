import { useEffect, useState } from "react";
import { createEvent, deleteEvent, getEvents, updateEvent } from "../api/events";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { uploadImageFile } from "../api/uploads";
import {
  EVENT_CATEGORIES,
  EVENT_STATUSES,
  toCategoryLabel,
} from "../constants/eventSchema";

const defaultFormData = {
  title: "",
  category: "",
  startAt: "",
  venueName: "",
  imageUrl: "",
  summary: "",
  status: "",
};

function AdminEvents() {
  const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState(defaultFormData);
  const [isSaving, setIsSaving] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [editingEventId, setEditingEventId] = useState("");

  async function loadEvents() {
    const data = await getEvents({ includeDrafts: true });
    setEvents(data);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      setErrorMessage("");

      try {
        await refreshData();
      } catch (error) {
        setErrorMessage(error.message || "Failed to load events and teams.");
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, []);

  function handleEdit(item) {
    setSuccessMessage("");
    setErrorMessage("");
    setEditingEventId(item.id);
    setFormData({
      title: item.title ?? "",
      category: item.category ?? EVENT_CATEGORIES[0],
      startAt: item.startAt ?? "",
      venueName: item.venueName ?? "",
      imageUrl: item.imageUrl ?? "",
      summary: item.summary ?? "",
      status: item.status ?? EVENT_STATUSES[0],
    });
  }

  function resetForm() {
    setFormData(defaultFormData);
    setEditingEventId("");
  }

  async function handleImageUpload(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploadingImage(true);
    setErrorMessage("");

    try {
      const uploadedUrl = await uploadImageFile(file, "events");
      setFormData((prev) => ({ ...prev, imageUrl: uploadedUrl }));
    } catch (error) {
      setErrorMessage(error.message || "Failed to upload image.");
    } finally {
      setIsUploadingImage(false);
      event.target.value = "";
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSaving(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      if (editingEventId) {
        await updateEvent(editingEventId, formData);
        setSuccessMessage("Event updated successfully!");
      } else {
        await createEvent(formData);
        setSuccessMessage("Event created successfully!");
      }
      resetForm();
      await loadEvents();
    } catch (error) {
      setErrorMessage(error.message || "Failed to save event");
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDelete(eventId) {
    const shouldDelete = window.confirm("Delete this event?");
    if (!shouldDelete) return;

    setErrorMessage("");
    setSuccessMessage("");

    try {
      await deleteEvent(eventId);
      if (editingEventId === eventId) {
        resetForm();
      }
      setSuccessMessage("Event deleted successfully!");
      await loadEvents();
    } catch (error) {
      setErrorMessage(error.message || "Failed to delete event");
    }
  }

  async function refreshData() {
    await loadEvents();
  }

  return (
    <section className="mx-auto grid max-w-6xl gap-10 px-6 py-14 lg:grid-cols-[1fr_1.2fr]">
      <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-800">
          {editingEventId ? "Admin: Edit Event" : "Admin: Create Event"}
        </h1>

        <input
          required
          value={formData.title}
          onChange={(event) => setFormData((prev) => ({ ...prev, title: event.target.value }))}
          placeholder="Title"
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900"
        />

        <input
          required
          type="datetime-local"
          value={formData.startAt}
          onChange={(event) => setFormData((prev) => ({ ...prev, startAt: event.target.value }))}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900"
        />

        <select
          value={formData.category}
          onChange={(event) => setFormData((prev) => ({ ...prev, category: event.target.value }))}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900"
        >
          <option value="">Select a category</option>
          {EVENT_CATEGORIES.map((category) => (
            <option key={category} value={category}>
              {toCategoryLabel(category)}
            </option>
          ))}
        </select>

        <input
          value={formData.venueName}
          onChange={(event) => setFormData((prev) => ({ ...prev, venueName: event.target.value }))}
          placeholder="Venue"
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900"
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="w-full rounded-lg border border-slate-300 px-3 py-2"
        />
        {isUploadingImage && <p className="text-sm text-slate-500">Uploading image...</p>}

        <textarea
          required
          value={formData.summary}
          onChange={(event) => setFormData((prev) => ({ ...prev, summary: event.target.value }))}
          placeholder="Summary"
          className="h-28 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900"
        />

        <select
          value={formData.status}
          onChange={(event) => setFormData((prev) => ({ ...prev, status: event.target.value }))}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900"
        >
          <option value="">Select a status</option>
          {EVENT_STATUSES.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>

        <button
          type="submit"
          disabled={isSaving}
          className="w-full rounded-lg bg-indigo-600 px-4 py-2 font-semibold text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSaving ? "Saving..." : editingEventId ? "Update Event" : "Save Event"}
        </button>
        {editingEventId && (
          <button
            type="button"
            onClick={resetForm}
            className="w-full rounded-lg border border-slate-300 px-4 py-2 font-semibold text-slate-700 hover:bg-slate-100"
          >
            Cancel Edit
          </button>
        )}
      </form>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-2xl font-bold text-slate-800">All Events</h2>
        {errorMessage && <p className="mb-3 text-sm text-rose-600">{errorMessage}</p>}
        {successMessage && <p className="mb-3 text-sm text-emerald-600">{successMessage}</p>}
        <ul className="space-y-3">
          {events.map((event) => (
            <li key={event.id} className="rounded-lg border border-slate-100 p-4">
              <p className="font-semibold text-slate-800">{event.title}</p>
              <p className="text-sm text-slate-600">{event.startAt || "TBD"}</p>
              <p className="text-sm text-slate-500">
                {toCategoryLabel(event.category)} ・ {event.status}
              </p>
              <div className="mt-3 flex gap-2">
                <button
                  type="button"
                  onClick={() => handleEdit(event)}
                  className="rounded-md bg-amber-500 px-3 py-1.5 text-sm font-semibold text-white hover:bg-amber-600"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(event.id)}
                  className="rounded-md bg-rose-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-rose-700"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default AdminEvents;
