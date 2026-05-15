import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getEventById } from "../api/events";
import { toCategoryLabel } from "../constants/eventSchema";

function formatDate(startAt) {
  if (!startAt) return "TBD";
  const date = new Date(startAt);
  if (Number.isNaN(date.getTime())) return "TBD";

  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function EventDetail() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let ignore = false;
    async function fetchEvent() {
      setIsLoading(true);
      try {
        const data = await getEventById(id);
        if (!ignore) setEvent(data);
      } catch (error) {
        console.error("Failed to fetch event:", error);
      } finally {
        if (!ignore) setIsLoading(false);
      }
    }

    fetchEvent();
    return () => {
      ignore = true;
    };
  }, [id]);

  if (isLoading) {
    return <div className="mx-auto max-w-4xl px-6 py-20">Loading event details...</div>;
  }

  if (!event || event.status !== "published") {
    return (
      <div className="mx-auto max-w-4xl px-6 py-20">
        <p className="mb-6 text-slate-600">This event is unavailable.</p>
        <Link to="/events" className="font-semibold text-indigo-600 hover:text-indigo-700">
          Back to events
        </Link>
      </div>
    );
  }

  return (
    <section className="mx-auto max-w-4xl px-6 py-14">
      <Link to="/events" className="text-sm font-semibold text-indigo-600 hover:text-indigo-700">
        ← Back to events
      </Link>

      <div className="mt-6 overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
        {event.imageUrl && (
          <img src={event.imageUrl} alt={event.title} className="h-72 w-full object-cover" />
        )}

        <div className="p-8">
          <p className="mb-3 text-sm font-semibold text-indigo-600">{formatDate(event.startAt)}</p>
          <h1 className="mb-3 text-3xl font-bold text-slate-800">{event.title}</h1>
          <p className="mb-6 inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
            {toCategoryLabel(event.category)}
          </p>

          <p className="mb-6 leading-relaxed text-slate-600">{event.summary}</p>

          <div>
            <h2 className="mb-2 text-lg font-semibold text-slate-800">Venue</h2>
            <p className="text-slate-600">{event.venueName || "Venue TBD"}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default EventDetail;
