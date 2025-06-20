import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/login.css'; 
import logo31 from '../assets/logo.png'; 

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();


    const handleLogin = (e) => {
    e.preventDefault();
    navigate('/admin');
  };
  

  return (
    <div className="login-container-31">
      <div className="login-header-31">
        <img src={logo31} alt="31 Minutos" className="logo-31" style={{ width: '120px', marginBottom: '10px' }} />
        <h2>Noticias que nadie pidió</h2>
        <p className="subtitle-31">Accede al sistema con tus credenciales</p>
      </div>

      <div className="login-box-31">
        <h3>Iniciar sesión</h3>
        <p className="login-instructions">Por favor, completa los campos para continuar</p>

        <form className="form-31">
          <div className="input-group-31">
            <label htmlFor="email">Correo electrónico</label>
            <input 
              type="email" 
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="correo@31minutos.com"
            />
          </div>
          
          <div className="input-group-31">
            <label htmlFor="password">Contraseña</label>
            <input 
              type="password" 
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>
          
          <button type="submit" className="btn-login-31" onClick={handleLogin}>
            Iniciar sesión
          </button>
        </form>

        <a
          className="back-to-home"
          onClick={() => navigate('/')}
          type="button"
        >
          Volver al inicio
        </a>
      </div>
    </div>
  );
};

export default Login;

