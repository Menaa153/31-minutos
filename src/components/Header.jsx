import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../assets/logo.png';
import './Header.css';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="nav-container">

        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>

        <nav className={`nav-links ${menuOpen ? 'active' : ''}`}>
          <NavLink to="/">
            <img src={logo} alt="Logo 31" className="logo" />
          </NavLink>
          <NavLink to="/reporteros">Reporteros</NavLink>
          <NavLink to="/nota-verde">Nota Verde</NavLink>
          <NavLink to="/horoscopo">Horóscopo</NavLink>
          <NavLink to="/deportes">Deportes</NavLink>
          <NavLink to="/tulio-responde">Tulio Responde</NavLink>
          <NavLink to="/entrevistas-locas">Entrevistas Locas</NavLink>
          <NavLink to="/login" className='login-NavLink'>Login</NavLink>
        </nav>
      </div>
    </header>
  );
}
