import EventCardSkeleton from "./EventCardSkeleton";

function EventListSkeleton({ count = 3 }) {
  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-16 gap-y-20 justify-items-center"
      role="status"
      aria-label="Loading events"
    >
      {Array.from({ length: count }).map((_, index) => (
        <EventCardSkeleton key={index} />
      ))}
      <span className="sr-only">Loading events…</span>
    </div>
  );
}

export default EventListSkeleton;
