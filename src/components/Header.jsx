import { NavLink } from 'react-router-dom';
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';

import './Header.css';

export default function Header() {
  return (
    <header className="navbar">
      <nav className="nav-links">
        <NavLink to="/" className='logo-NavLink'>
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
    </header>
  );
}
