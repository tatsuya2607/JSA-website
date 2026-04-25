import { useEffect, useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import {
  CalendarDaysIcon,
  DocumentTextIcon,
  UsersIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import { auth } from "../firebase/firebase";
import AdminNavbar from "../components/AdminNavbar";

const dashboardCards = [
  {
    title: "Events Management",
    description: "Create events and review their publish status.",
    icon: CalendarDaysIcon,
    href: "/admin/events",
    actionLabel: "Open Events",
  },
  {
    title: "Site Review",
    description: "Review the public website and latest content updates.",
    icon: DocumentTextIcon,
    href: "/",
    actionLabel: "Open Website",
  },
  {
    title: "Team Management",
    description: "メンバー情報の追加・編集・表示順の管理を行います。",
    icon: UsersIcon,
    href: "/admin/team",
    actionLabel: "チーム管理へ",
  },
];

function Admin() {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  if (user === undefined) {
    return (
      <section className="min-h-screen bg-gray-100 px-4 py-16 md:px-8">
        <div className="mx-auto max-w-6xl rounded-xl bg-white p-8 text-slate-500 shadow-md">
          Checking authentication status...
        </div>
      </section>
    );
  }

  if (!user) {
    return <Navigate to="/admin-login" replace />;
  }

  return (
    <section className="min-h-screen bg-gray-100 text-slate-900">
      <AdminNavbar />

      <div className="mx-auto max-w-6xl space-y-8 p-6">
        <div className="rounded-xl bg-white p-8 shadow-md md:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">Dashboard</p>
          <h1 className="mt-2 text-2xl font-bold text-slate-900 md:text-3xl">Admin Dashboard</h1>
          <p className="mt-2 text-gray-500">
            Welcome back, <span className="font-medium text-slate-800">{user.email}</span>.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {dashboardCards.map((card) => {
            const Icon = card.icon;

            return (
              <article
                key={card.title}
                className="group flex h-full flex-col rounded-xl bg-white p-6 shadow-md transition hover:-translate-y-1"
              >
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
                  <Icon className="h-6 w-6" />
                </div>
                <h2 className="text-lg font-semibold text-slate-800">{card.title}</h2>
                <p className="mt-2 flex-grow text-sm leading-relaxed text-gray-500">{card.description}</p>
                <Link
                  to={card.href}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 transition group-hover:text-indigo-700"
                >
                  {card.actionLabel}
                  <ArrowRightIcon className="h-4 w-4" />
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </AdminLayout>
  );
}

export default Admin;
