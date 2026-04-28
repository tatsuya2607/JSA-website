import Home from './pages/Home'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import AdminNavbar from './components/admin/AdminNavbar'
import { Route, Routes, useLocation } from 'react-router-dom'
import Events from './pages/Events'
import EventDetail from './pages/EventDetail'
import AdminEvents from './pages/AdminEvents'
import Admin from './pages/Admin'
import AdminLogin from './pages/AdminLogin'
import AdminTeam from './pages/AdminTeam'
import ProtectedRoute from './components/auth/ProtectedRoute'

function App() {
  const { pathname } = useLocation();
  const isAdminRoute = pathname.startsWith('/admin');

  return (
    <>
      {!isAdminRoute && <Header />}
      {isAdminRoute && <AdminNavbar />}

      <main className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:id" element={<EventDetail />} />
          <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
          <Route path="/admin/events" element={<ProtectedRoute><AdminEvents /></ProtectedRoute>} />
          <Route path="/admin/team" element={<ProtectedRoute><AdminTeam /></ProtectedRoute>} />
          <Route path="/admin-login" element={<AdminLogin />} />
        </Routes>
      </main>

      {!isAdminRoute && <Footer />}
    </>

  );
}

export default App
