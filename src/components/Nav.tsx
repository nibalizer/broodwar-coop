import './Nav.css'
import { Link } from 'react-router-dom'

export default function Nav() {
  return (
    <nav className="nav">
      <div className="nav-brand">
        <h2>Broodwar Co-op</h2>
      </div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/play">Play</Link></li>
        <li><Link to="/setup">Setup</Link></li>
        <li><a href="#about">About</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  )
}
