import Home from './pages/Home'
import Header from './components/Header'
import Culture from './pages/Culture'
import { Route, Routes } from 'react-router-dom'

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/culture" element={<Culture />} />
      </Routes>
    </>

  );
}

export default App
