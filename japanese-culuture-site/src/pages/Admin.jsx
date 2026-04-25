import { useEffect, useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import {
  CalendarDaysIcon,
  DocumentTextIcon,
  UsersIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import { auth } from "../firebase/firebase";

const dashboardCards = [
  {
    title: "Events Management",
    description: "イベントの作成・公開状況の確認を行います。",
    icon: CalendarDaysIcon,
    href: "/admin/events",
    actionLabel: "イベント管理へ",
  },
  {
    title: "Content Review",
    description: "お知らせ・ページ内容の更新フローを整理します。",
    icon: DocumentTextIcon,
    href: "/",
    actionLabel: "サイトを確認",
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
  const [isSigningOut, setIsSigningOut] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  async function handleSignOut() {
    setIsSigningOut(true);

    try {
      await signOut(auth);
    } finally {
      setIsSigningOut(false);
    }
  }

  if (user === undefined) {
    return (
      <section className="min-h-screen bg-slate-50 px-4 py-16 md:px-8">
        <div className="mx-auto max-w-6xl animate-pulse rounded-2xl border border-slate-200 bg-white p-8 text-slate-500 shadow-sm">
          認証状態を確認しています...
        </div>
      </section>
    );
  }

  if (!user) {
    return <Navigate to="/admin-login" replace />;
  }

  return (
    <section className="min-h-screen bg-slate-50 px-4 py-16 text-slate-900 md:px-8">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm md:p-10">
          <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">Dashboard</p>
              <h1 className="mt-2 text-3xl font-bold text-slate-800 md:text-4xl">Admin Dashboard</h1>
              <p className="mt-2 text-sm text-slate-600 md:text-base">
                ようこそ、<span className="font-medium text-slate-800">{user.email}</span> さん。管理画面から運用作業を進めてください。
              </p>
            </div>

            <button
              type="button"
              onClick={handleSignOut}
              disabled={isSigningOut}
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSigningOut ? "Signing out..." : "ログアウト"}
            </button>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {dashboardCards.map((card) => {
            const Icon = card.icon;

            return (
              <article
                key={card.title}
                className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
                  <Icon className="h-6 w-6" />
                </div>
                <h2 className="text-lg font-semibold text-slate-800">{card.title}</h2>
                <p className="mt-2 flex-grow text-sm leading-relaxed text-slate-600">{card.description}</p>
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
    </section>
  );
}

export default Admin;
