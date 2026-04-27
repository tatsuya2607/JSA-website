import { toCategoryLabel } from "../../constants/eventSchema";
import { tagColorMap } from "../../constants/eventColors";
import { formatDate } from "../../utils/formatDate";
import EventCard from "./EventCard";
import FadeIn from "./FadeIn";

// components/EventList.jsx
function EventList({ events }) {
    const isSingle = events.length === 1;
    const isDouble = events.length === 2;

    return (
        <div
            className={`
                ${isSingle || isDouble
                    ? "flex justify-center flex-wrap"
                    : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                }
                gap-x-16 gap-y-20
            `}
        >
            {events.map((event, index) => {
                const categoryLabel = toCategoryLabel(event.category);

                return (
                    <FadeIn
                        key={event.id}
                        delay={index * 150}
                        className="w-80"
                    >
                        <EventCard
                            event={event}
                            formatDate={formatDate}
                            categoryLabel={categoryLabel}
                            tagColorMap={tagColorMap}
                        />
                    </FadeIn>
                );
            })}
        </div>
    );
}
export default EventList;