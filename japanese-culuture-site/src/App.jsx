import Home from './pages/Home'
import Header from './components/Header'
import Footer from './components/Footer'
import Culture from './pages/Culture'
import { Route, Routes } from 'react-router-dom'
import CultureDetail from './pages/CultureDetail'
import About from './pages/About'
import Events from './pages/Events'
import EventDetail from './pages/EventDetail'
import AdminEvents from './pages/AdminEvents'
import Admin from './pages/Admin'
import AdminLogin from './pages/AdminLogin'

function App() {
  return (
    <>
      <Header />

      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:id" element={<EventDetail />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/events" element={<AdminEvents />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/culture" element={<Culture />} />
          <Route path="/culture/:id" element={<CultureDetail />} />
        </Routes>
      </main>

      <Footer />
    </>

  );
}

export default App
