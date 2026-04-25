import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import AdminTeamManager from "../components/AdminTeamManager";
import AdminNavbar from "../components/AdminNavbar";
import { auth } from "../firebase/firebase";

function AdminTeam() {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  if (user === undefined) {
    return null;
  }

  if (!user) {
    return <Navigate to="/admin-login" replace />;
  }

  return (
    <section className="min-h-screen bg-gray-100">
      <AdminNavbar />

      <div className="mx-auto max-w-6xl p-6">
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900">Team Management</h1>
          <p className="text-gray-500">Manage Members</p>
        </header>

        <AdminTeamManager />
      </div>
    </section>
  );
}

export default AdminTeam;
