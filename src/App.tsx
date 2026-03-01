import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'
import Home from './pages/Home'
import Play from './pages/Play'
import Setup from './pages/Setup'

function App() {
  return (
    <Router basename="/broodwar-coop">
      <div className="app">
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/play" element={<Play />} />
          <Route path="/setup" element={<Setup />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
