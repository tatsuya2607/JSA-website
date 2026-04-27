import Section from "../layout/Section";
import EventList from "../ui/EventList";
import EmptyState from "../ui/EmptyState";

function EventsSection({ events }) {
  return (
    <Section id="events" bg="gray">
      <div className="text-center">
        <h2 className="text-3xl font-bold">
          Upcoming Events
        </h2>

        <p className="text-gray-500 max-w-2xl mx-auto mt-5">
          Join us for exciting cultural events and activities throughout the semester.
        </p>
      </div>

      {events.length > 0 ? (
        <div className="mt-12 w-full max-w-6xl mx-auto">
          <EventList events={events.slice(0, 3)} />

          {events.length > 3 && (
            <div className="mt-8 text-center">
              <a
                href="/events"
                className="inline-block px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-400 transition-colors"
              >
                View All Events
              </a>
            </div>
          )}
        </div>
      ) : (
        <EmptyState
          title="Coming Soon"
          message="No events yet"
          subMessage="Stay tuned! New events will be announced soon."
          buttonText=""
          buttonLink=""
        />
      )}
    </Section>
  );
}

export default EventsSection;