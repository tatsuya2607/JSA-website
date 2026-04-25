import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import AdminTeamManager from "../components/AdminTeamManager";
import AdminLayout from "../components/AdminLayout";
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
    <AdminLayout>
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Team Management</h1>
        <p className="text-sm text-gray-600">Manage Team Members</p>
      </header>

      <AdminTeamManager />
    </AdminLayout>
  );
}

export default AdminTeam;
