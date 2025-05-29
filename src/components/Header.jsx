import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

import './Header.css';

export default function Header() {
  return (
    <header className="navbar">
      <nav className="nav-links">
        <Link to="/" className='logo-link'>
          <img src={logo} alt="Logo 31" className="logo" />
        </Link>
        <Link to="/reporteros">Reporteros</Link>
        <Link to="/nota-verde">Nota Verde</Link>
        <Link to="/horoscopo">Horóscopo</Link>
        <Link to="/deportes">Deportes</Link>
        <Link to="/tulio-responde">Tulio Responde</Link>
        <Link to="/entrevistas-locas">Entrevistas Locas</Link>
        <Link to="/login" className='login-link'>Login</Link>
      </nav>
    </header>
  );
}
