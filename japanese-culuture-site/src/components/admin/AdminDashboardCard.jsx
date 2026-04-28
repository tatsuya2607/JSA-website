import { Link } from "react-router-dom";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

function AdminDashboardCard({ title, icon, description, href, actionLabel }) {
    const Icon = icon;
    return (
        <article
            className="group flex h-full flex-col rounded-xl bg-white p-6 shadow-md transition hover:-translate-y-1"
        >
            <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
                <Icon className="h-6 w-6" />
            </div>

            <h2 className="text-lg font-semibold text-slate-800">
                {title}
            </h2>

            <p className="mt-2 flex-grow text-sm leading-relaxed text-gray-500">
                {description}
            </p>

            <Link
                to={href}
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 transition group-hover:text-indigo-700"
            >
                {actionLabel}
                <ArrowRightIcon className="h-4 w-4" />
            </Link>
        </article>
    );
}

export default AdminDashboardCard;
