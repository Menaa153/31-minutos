
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../assets/logo.png';
import './Header.css';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  

    // Evita el scroll del fondo cuando el menú está abierto
    useEffect(() => {
      if (menuOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'auto';
      }

      return () => {
        document.body.style.overflow = 'auto';
      };
    }, [menuOpen]);

    // Cerrar menú al hacer clic en un enlace
    const handleLinkClick = () => {
      setMenuOpen(false);
    };

  return (
    <header className="navbar">
      <div className="nav-container">
        <div className='botones-header'>
          <NavLink to="/" onClick={handleLinkClick} className='link-img'>
            <img src={logo} alt="Logo 31" className="logo" />
          </NavLink>
          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
            ☰
          </button>
        </div>

        <nav className={`nav-links ${menuOpen ? 'active' : ''}`}>
          <NavLink to="/reporteros" onClick={handleLinkClick}>Reporteros</NavLink>
          <NavLink to="/nota-verde" onClick={handleLinkClick}>Nota Verde</NavLink>
          <NavLink to="/horoscopo" onClick={handleLinkClick}>Horóscopo</NavLink>
          <NavLink to="/deportes" onClick={handleLinkClick}>Deportes</NavLink>
          <NavLink to="/tulio-responde" onClick={handleLinkClick}>Tulio Responde</NavLink>
          <NavLink to="/entrevistas-locas" onClick={handleLinkClick}>Entrevistas Locas</NavLink>
          <NavLink to="/login" onClick={handleLinkClick} className='login-NavLink'>Login</NavLink>
        </nav>
      </div>
    </header>
  );
}
