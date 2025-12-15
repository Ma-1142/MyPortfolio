import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          YOUR NAME
        </Link>

        <ul className="navbar-links">
          <li>
            <Link to="/" className={isActive('/') ? 'active' : ''}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className={isActive('/about') ? 'active' : ''}>
              About Me
            </Link>
          </li>
          <li>
            <Link to="/museum" className={isActive('/museum') ? 'active' : ''}>
              Museum
            </Link>
          </li>
          <li>
            <Link to="/services" className={isActive('/services') ? 'active' : ''}>
              Services
            </Link>
          </li>
        </ul>

        <Link to="/contact" className="btn btn-primary navbar-cta">
          Contact Me
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
