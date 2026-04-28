import AdminNavbar from "./AdminNavbar";

function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <AdminNavbar />
      <main className="mx-auto w-full max-w-6xl p-6">{children}</main>
    </div>
  );
}

export default AdminLayout;
