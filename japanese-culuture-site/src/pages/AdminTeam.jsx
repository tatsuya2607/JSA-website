import { Link } from "react-router-dom";
import AdminTeamManager from "../components/admin/AdminTeamManager";

function AdminTeam() {
  return (
    <section className="min-h-screen bg-gray-100 pt-10 text-slate-900">
      <div className="mx-auto max-w-6xl p-6">
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900">Team Management</h1>
          <p className="text-gray-500">Manage team members, roles, and permissions for the admin dashboard.</p>
        </header>
        <Link to="/admin" className="inline-block text-sm font-semibold text-indigo-600 hover:text-indigo-700">
          ← Back to admin dashboard
        </Link>
        <AdminTeamManager />
      </div>
    </section>
  );
}

export default AdminTeam;
