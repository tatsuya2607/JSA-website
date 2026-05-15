function AboutCard({ icon, title, description }) {
    const Icon = icon;
    return (
        <div className="block max-w-md p-6 bg-white border border-gray-200 rounded-lg 
            shadow-sm mt-7">

            <div className="flex justify-center mb-4">
                <Icon className="w-10 h-10 text-red-500" />
            </div>

            <h5 className="mb-2 text-md tracking-tight text-black text-center">
                {title}
            </h5>
            <p className="font-normal p-3 text-gray-500 text-center">
                {description}
            </p>
        </div>
    );
}

export default AboutCard;

