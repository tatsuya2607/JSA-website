import { signOut } from "firebase/auth";
import { NavLink, useNavigate } from "react-router-dom";
import { auth } from "../../firebase/firebase";

const navItems = [
  { to: "/admin", label: "Dashboard" },
  { to: "/admin/events", label: "Events Management" },
  { to: "/admin/team", label: "Team Management" },
];

function getNavClassName(isActive) {
  return [
    "rounded-md px-3 py-2 text-sm font-semibold transition",
    isActive
      ? "bg-indigo-100 text-indigo-700"
      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
  ].join(" ");
}

function AdminNavbar() {
  const navigate = useNavigate();

  async function handleLogout() {
    await signOut(auth);
    navigate("/admin-login");
  }

  return (
    <header className="fixed top-0 z-50 w-full border-b border-slate-200 bg-white">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-2 sm:px-6 lg:px-8">
        <p className="text-lg font-bold text-slate-900">JSA Admin</p>

        <nav className="flex flex-wrap items-center gap-1">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.to === "/admin"} className={({ isActive }) => getNavClassName(isActive)}>
              {item.label}
            </NavLink>
          ))}

          <button
            type="button"
            onClick={handleLogout}
            className="ml-1 rounded-md bg-rose-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-rose-700"
          >
            Logout
          </button>
        </nav>
      </div>
    </header>
  );
}

export default AdminNavbar;
