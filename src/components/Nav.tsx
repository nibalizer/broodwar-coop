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
        <li><a href="https://github.com/nibalizer/broodwar-coop/issues/new" target="_blank" rel="noopener noreferrer">Contact Us</a></li>
        <li><a href="https://github.com/nibalizer/broodwar-coop" target="_blank" rel="noopener noreferrer">GitHub</a></li>
      </ul>
    </nav>
  )
}
