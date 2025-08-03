import './Nav.css'

export default function Nav() {
  return (
    <nav className="nav">
      <div className="nav-brand">
        <h2>Broodwar Co-op</h2>
      </div>
      <ul className="nav-links">
        <li><a href="#home">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#services">Services</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  )
}
