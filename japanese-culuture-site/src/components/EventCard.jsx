function EventCard({ tag, date, title, description, place, icon: Icon }) {
    return (
        <div className="block max-w-md p-6 bg-white border border-gray-200 rounded-lg 
            shadow-sm mt-7">


            <div className="flex mb-4 text-black items-center">
                {/* tag */}
                <span className="inline-gray mb-2 px-2 mt-1 text-sm bg-gray-200 text-black rounded-full">
                    {tag}
                </span>

                {/* date */}
                <p className="ml-auto text-sm">
                    {date}
                </p>
            </div>

            <div className="flex flex-col items-start text-left">
                {/* title */}
                <h5 className="mb-2 text-md tracking-tight text-black">
                    {title}
                </h5>
                {/* description */}
                <p className="mb-2 font-normal text-black text-gray-500">
                    {description}
                </p>
                {/* location */}
                <p className="font-normal mt-2 text-gray-500 flex items-center gap-2">
                    {Icon ? <Icon className="w-4 h-4 text-gray-500 shrink-0" /> : null}
                    <span>{place}</span>
                </p>
            </div>
        </div>
    );
}

export default EventCard;
