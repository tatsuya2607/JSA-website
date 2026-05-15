import { auth } from "../firebase/firebase";

import AdminDashboardCard from "../components/admin/AdminDashboardCard";
import { dashboardCards } from "../data/AdminDashboardData";

function Admin() {
    const user = auth.currentUser;

    return (
        <section className="min-h-screen bg-gray-100 text-slate-900">
            <div className="mx-auto max-w-6xl space-y-8 p-6">
                <div className="rounded-xl bg-white p-8 shadow-md md:p-10">
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">Dashboard</p>
                    <h1 className="mt-2 text-2xl font-bold text-slate-900 md:text-3xl">Admin Dashboard</h1>
                    <p className="mt-2 text-gray-500">
                        Welcome back, <span className="font-medium text-slate-800">{user?.email}</span>.
                    </p>
                </div>

                {/* Dashboard Cards */}
                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                    {dashboardCards.map((card) => (
                        <AdminDashboardCard key={card.title} {...card} />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Admin;
