import { toCategoryLabel } from "../../constants/eventSchema";
import Admin from "../../pages/Admin";
import EventItemCard from "./EventItemCard";

function AdminEventList({
    events,
    handleEdit,
    handleDelete,
    errorMessage,
    successMessage,
}) {

    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-2xl font-bold text-slate-800">
                All Events
            </h2>

            {errorMessage && (
                <p className="mb-3 text-sm text-rose-600">{errorMessage}</p>
            )}

            {successMessage && (
                <p className="mb-3 text-sm text-emerald-600">{successMessage}</p>
            )}

            <ul className="space-y-3">
                <ul className="space-y-3">
                    {events.map((event) => (
                        <EventItemCard
                            key={event.id}
                            event={event}
                            handleEdit={handleEdit}
                            handleDelete={handleDelete}
                        />
                    ))}
                </ul>
            </ul>
        </div>
    );
}

export default AdminEventList;