import { Link } from "react-router-dom";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

function EventCard({ event, index, formatDate, categoryLabel, tagColorMap }) {
    return (
        <Link to={`/events/${event.id}`} className="group block h-full">
            <article className="flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">

                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                    <div className="absolute inset-0 z-10 bg-black/20 transition-colors duration-500 group-hover:bg-transparent" />
                    {event.imageUrl ? (
                        <img
                            src={event.imageUrl}
                            alt={event.title}
                            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                        />
                    ) : (
                        <div className="flex h-full items-center justify-center px-4 text-center text-sm text-slate-500">
                            Event image will be announced soon.
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="flex flex-grow flex-col p-4 md:p-5">
                    <div className="mb-3 flex flex-wrap items-center gap-2">
                        <span className="text-sm font-semibold text-indigo-600">
                            {formatDate(event.startAt)}
                        </span>
                        <span
                            className={`rounded-full px-2.5 py-1 text-xs font-medium ${tagColorMap[categoryLabel] || tagColorMap.Other
                                }`}
                        >
                            {categoryLabel}
                        </span>
                    </div>

                    <h2 className="mb-2 text-lg font-bold text-slate-800 transition-colors duration-300 group-hover:text-indigo-600">
                        {event.title}
                    </h2>

                    <p className="flex-grow text-sm leading-relaxed text-slate-600">
                        {event.summary}
                    </p>

                    <p className="mt-3 text-sm text-slate-500">
                        {event.venueName || "Venue TBD"}
                    </p>

                    <p className="mt-4 flex items-center text-sm font-semibold text-slate-400 transition-colors group-hover:text-indigo-600">
                        Learn more
                        <ArrowRightIcon className="ml-1 h-4 w-4" />
                    </p>
                </div>
            </article>
        </Link>
    );
}

export default EventCard;
