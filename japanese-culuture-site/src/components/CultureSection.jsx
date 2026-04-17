function CultureSection({ tag, title, description, image, isReversed, items }) {
    return (
        <section className="w-full py-5 px-10">
            <div
                className={`max-w-[1700px] mx-auto flex flex-col md:flex-row gap-12 px-0 py-6 
       ${isReversed ? "md:flex-row" : "md:flex-row-reverse"}`}
            >
                {/* TEXT */}
                <div className="flex-1 text-left items-start mt-4 pl-0">
                    <span className="inline-block mb-2 px-3 py-1 text-sm bg-black text-white rounded-full">
                        {tag}
                    </span>

                    <h2 className="text-3xl text-black font-bold mb-5">
                        {title}
                    </h2>

                    <p className="text-gray-600 text-lg mb-4 leading-relaxed">
                        {description}
                    </p>

                    {/* LIST */}
                    <ul className="list-disc list-inside text-gray-600 space-y-2">
                        {items.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                </div>

                {/* IMAGE */}
                <div className="flex-1">
                    <img
                        src={image}
                        alt={title}
                        className="w-full h-[380px] object-cover rounded-xl"
                    />
                </div>
            </div>
        </section>
    );
}

export default CultureSection;
