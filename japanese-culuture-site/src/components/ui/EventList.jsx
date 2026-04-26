import { toCategoryLabel } from "../../constants/eventSchema";
import { tagColorMap } from "../../constants/eventColors";
import { formatDate } from "../../utils/formatDate";
import EventCard from "./EventCard";
import FadeIn from "./FadeIn";

// components/EventList.jsx
function EventList({ events }) {

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">            {
            events.map((event, index) => {
                const categoryLabel = toCategoryLabel(event.category);

                return (
                    <FadeIn key={event.id} delay={index * 150} className="w-full max-w-sm">
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