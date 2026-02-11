import Home from './pages/Home'
import Header from './components/Header'
import Culture from './pages/Culture'
import { Route, Routes } from 'react-router-dom'
import CultureDetail from './pages/CultureDetail'

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/culture" element={<Culture />} />
        <Route path="/culture/:id" element={<CultureDetail />} />
      </Routes>
    </>

  );
}

export default App
