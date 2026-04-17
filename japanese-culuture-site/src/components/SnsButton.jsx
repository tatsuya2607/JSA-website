import { snsButtonData } from '../data/SnsButtonData';

const SnsButton = () => {
    return (
        <section className="flex space-x-4">
            {snsButtonData.map((sns) => (
                <a
                    key={sns.id}
                    href={sns.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-10 h-10 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-300"
                >
                    <sns.icon size={20} />
                </a>
            ))}
        </section>
    );
};

export default SnsButton;