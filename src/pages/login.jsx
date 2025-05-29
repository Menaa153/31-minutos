import { Link } from 'react-router-dom';

import '../css/login.css'


export default function Login() {
  return (
    <div className="login">
      <h1>Iniciar Sesión</h1>
      <form>
        <label className='info'>Usuario o correo:</label><br />
        <input type="text" /><br />
        <label className='info'>Contraseña:</label><br />
        <input type="password" /><br />
        <Link className='link'> ¿Olvidaste tu contraseña?</Link>
        <button>Acceder</button>
      </form>
    </div>
  );
}
