import { useEffect, useState } from "react";
import { createEvent, getEvents } from "../api/events";
import {
  EVENT_CATEGORIES,
  EVENT_STATUSES,
  toCategoryLabel,
} from "../constants/eventSchema";

const initialFormData = {
  title: "",
  category: EVENT_CATEGORIES[0],
  startAt: "",
  venueName: "",
  summary: "",
  imageUrl: "",
  status: "draft",
};

function AdminEvents() {
  const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState(initialFormData);
  const [isSaving, setIsSaving] = useState(false);

  async function loadEvents() {
    const data = await getEvents({ includeDrafts: true });
    setEvents(data);
  }

  useEffect(() => {
    let isMounted = true;

    getEvents({ includeDrafts: true }).then((data) => {
      if (isMounted) {
        setEvents(data);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSaving(true);

    await createEvent(formData);
    setFormData(initialFormData);
    await loadEvents();

    setIsSaving(false);
  }

  return (
    <section className="mx-auto grid max-w-6xl gap-10 px-6 py-14 lg:grid-cols-[1fr_1.2fr]">
      <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-800">Admin: Create Event</h1>

        <input
          required
          value={formData.title}
          onChange={(event) => setFormData((prev) => ({ ...prev, title: event.target.value }))}
          placeholder="Title"
          className="w-full rounded-lg border border-slate-300 px-3 py-2"
        />

        <input
          required
          type="datetime-local"
          value={formData.startAt}
          onChange={(event) => setFormData((prev) => ({ ...prev, startAt: event.target.value }))}
          className="w-full rounded-lg border border-slate-300 px-3 py-2"
        />

        <select
          value={formData.category}
          onChange={(event) => setFormData((prev) => ({ ...prev, category: event.target.value }))}
          className="w-full rounded-lg border border-slate-300 px-3 py-2"
        >
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
          className="w-full rounded-lg border border-slate-300 px-3 py-2"
        />

        <input
          value={formData.imageUrl}
          onChange={(event) => setFormData((prev) => ({ ...prev, imageUrl: event.target.value }))}
          placeholder="Image URL"
          className="w-full rounded-lg border border-slate-300 px-3 py-2"
        />

        <textarea
          required
          value={formData.summary}
          onChange={(event) => setFormData((prev) => ({ ...prev, summary: event.target.value }))}
          placeholder="Summary"
          className="h-28 w-full rounded-lg border border-slate-300 px-3 py-2"
        />

        <select
          value={formData.status}
          onChange={(event) => setFormData((prev) => ({ ...prev, status: event.target.value }))}
          className="w-full rounded-lg border border-slate-300 px-3 py-2"
        >
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
          {isSaving ? "Saving..." : "Save Event"}
        </button>
      </form>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-2xl font-bold text-slate-800">All Events</h2>
        <ul className="space-y-3">
          {events.map((event) => (
            <li key={event.id} className="rounded-lg border border-slate-100 p-4">
              <p className="font-semibold text-slate-800">{event.title}</p>
              <p className="text-sm text-slate-600">{event.startAt || "TBD"}</p>
              <p className="text-sm text-slate-500">
                {toCategoryLabel(event.category)} ・ {event.status}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default AdminEvents;
