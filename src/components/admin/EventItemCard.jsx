import { toCategoryLabel } from "../../constants/eventSchema";
import { formatDate } from "../../utils/formatDate";


function EventItemCard({ event, handleEdit, handleDelete }) {
  return (
    <li className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm md:flex-row md:items-center">
      {event.imageUrl ? (
        <img
          src={event.imageUrl}
          alt={event.title}
          className="h-40 w-full rounded-lg object-cover md:h-28 md:w-44"
        />
      ) : (
        <div className="flex h-40 w-full items-center justify-center rounded-lg bg-slate-100 text-sm text-slate-400 md:h-28 md:w-44">
          No image
        </div>
      )}

      <div className="min-w-0 flex-1">
        <p className="font-semibold text-slate-900">
          {event.title}
        </p>

        <p className="mt-1 text-sm text-slate-500">
          {formatDate(event.startAt) || "TBD"}
        </p>

        <p className="mt-1 text-sm text-slate-500">
          {toCategoryLabel(event.category)} ・ {event.status}
        </p>

        <p className="mt-2 line-clamp-2 text-sm text-slate-600">
          {event.summary}
        </p>
      </div>

      <div className="flex gap-2 md:flex-col md:items-stretch">
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
  );
}

export default EventItemCard;