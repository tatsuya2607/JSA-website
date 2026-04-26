import { snsButtonData } from '../../data/SnsButtonData';

const SnsButton = () => {
    return (
        <section className="flex space-x-4">
            {snsButtonData.map((sns) => (
                <a
                    key={sns.id}
                    href={sns.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition-all duration-300 hover:-translate-y-1 hover:bg-indigo-500 hover:text-white"
                >
                    <sns.icon size={20} />
                </a>
            ))}
        </section>
    );
};

export default SnsButton;
