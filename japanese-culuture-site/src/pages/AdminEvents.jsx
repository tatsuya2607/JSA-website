import { useEffect, useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { createEvent, getEvents } from "../api/events";
import {
  EVENT_CATEGORIES,
  EVENT_STATUSES,
  toCategoryLabel,
} from "../constants/eventSchema";
import { auth } from "../firebase/firebase";

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
  const [user, setUser] = useState(undefined);

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

  if (user === undefined) {
    return null;
  }

  if (!user) {
    return <Navigate to="/admin-login" replace />;
  }

  return (
    <section className="min-h-screen bg-gray-100 pt-10 text-slate-900">
      <div className="mx-auto max-w-6xl p-6">
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900">Events Management</h1>
          <p className="text-gray-500">Create, review, and organize event details.</p>
        </header>
        <div>
          <Link to="/admin" className="mb-6 inline-block text-sm font-semibold text-indigo-600 hover:text-indigo-700">
            ← Back to admin dashboard
          </Link>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          <form onSubmit={handleSubmit} className="space-y-4 rounded-xl bg-white p-6 shadow-md">
            <h2 className="text-xl font-bold text-slate-800">Create Event</h2>

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

          <div className="rounded-xl bg-white p-6 shadow-md">
            <h2 className="mb-4 text-xl font-bold text-slate-800">All Events</h2>
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
        </div>
      </div>
    </section>
  );
}

export default AdminEvents;
