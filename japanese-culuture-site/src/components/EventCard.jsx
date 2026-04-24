import {
  MapPinIcon,
} from "@heroicons/react/24/outline";

function EventCard({ category, startAt, title, summary, venueName }) {
    const eventDate = new Date(startAt);
    const formattedDate = Number.isNaN(eventDate.getTime())
        ? "TBD"
        : eventDate.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric"
        });

    const Icon = MapPinIcon;

    return (
        <div className="block w-full max-w-md p-6 bg-white border border-gray-200 rounded-lg 
            shadow-sm mt-7">


            <div className="flex mb-4 text-black items-center">
                {/* category */}
                <span className="inline-gray mb-2 px-2 mt-1 text-sm bg-gray-200 text-black rounded-full capitalize">
                    {category}
                </span>

                {/* date */}
                <p className="ml-auto text-sm">
                    {formattedDate}
                </p>
            </div>

            <div className="flex flex-col items-start text-left">
                {/* title */}
                <h5 className="mb-2 text-lg tracking-tight text-black">
                    {title}
                </h5>
                {/* summary */}
                <p className="mb-2 font-normal text-black text-gray-500">
                    {summary}
                </p>
                {/* location */}
                <p className="font-normal mt-2 text-gray-500 flex items-center gap-2">
                    {Icon ? <Icon className="w-4 h-4 text-gray-500 shrink-0" /> : null}
                    <span>{venueName}</span>
                </p>
            </div>
        </div>
    );
}

export default EventCard;
