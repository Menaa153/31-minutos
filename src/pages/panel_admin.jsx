import React, { useState, useEffect } from 'react';
import '../css/admin_panel.css';
import {
  obtenerReporterosPasantes,
  registrarPasante,
  eliminarPasantePorId,
  obtenerAdministradores,
  crearNoticiaPasante,
  obtenerNoticiasRecientesCombinadas,
  obtenerEstadisticasNoticias   }
 from '../services/ApisBackend'


export default function AdminPanel() {
  const usuario = JSON.parse(localStorage.getItem('usuario31'));
  const rolUsuario = usuario?.rol;
  const [activeTab, setActiveTab] = useState(
  rolUsuario === 'Administrador' ? 'Reporteros' : 'Noticias'
);

  const [newsTitle, setNewsTitle] = useState('');
  const [newsContent, setNewsContent] = useState('');
  const [nombrePasante, setNombrePasante] = useState('');
  const [descripcionPasante, setDescripcionPasante] = useState('');
  const [correoPasante, setCorreoPasante] = useState('');
  const [rolPasante, setRolPasante] = useState('Reportero');
  const [contrasenaPasante, setContrasenaPasante] = useState('');
  const [pasantes, setPasantes] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [noticiasRecientes, setNoticiasRecientes] = useState([]);
  const [estadisticas, setEstadisticas] = useState({ total_noticias: 0, noticia_mas_popular: 0 });




useEffect(() => {
  obtenerReporterosPasantes()
    .then(setPasantes)
    .catch(console.error);

  obtenerAdministradores()
    .then(setAdmins)
    .catch(console.error);
}, []);

useEffect(() => {
  if (rolUsuario === 'Reportero') {
    obtenerNoticiasRecientesCombinadas()
      .then(setNoticiasRecientes)
      .catch(console.error);
  }
}, []);

useEffect(() => {
  obtenerEstadisticasNoticias()
    .then(setEstadisticas)
    .catch(console.error);
}, []);




const handleRegistrarPasante = async (e) => {
  e.preventDefault();

  const nuevoPasante = {
    nombre: nombrePasante,
    descripcion: descripcionPasante,
    correo: correoPasante,
    rol: rolPasante,
    contrasena: contrasenaPasante
  };

  try {
    await registrarPasante(nuevoPasante);

    // Limpiar
    setNombrePasante('');
    setDescripcionPasante('');
    setCorreoPasante('');
    setRolPasante('Reportero');
    setContrasenaPasante('');

    alert('Miembro registrado con éxito');

    // Recargar 
    if (rolPasante === 'Reportero') {
      const actualizados = await obtenerReporterosPasantes();
      setPasantes(actualizados);
    } else if (rolPasante === 'Administrador') {
      const actualizados = await obtenerAdministradores();
      setAdmins(actualizados);
    }

  } catch (err) {
    console.error(err);
    alert('Error al registrar el miembro');
  }
};




const eliminarPasante = async (id) => {
  const confirmar = window.confirm('¿Estás seguro de eliminar este miembro?');
  if (!confirmar) return;

  try {
    await eliminarPasantePorId(id);

    // 🔄 Volver a cargar ambas listas después de eliminar
    const [reporterosActualizados, adminsActualizados] = await Promise.all([
      obtenerReporterosPasantes(),
      obtenerAdministradores()
    ]);

    setPasantes(reporterosActualizados);
    setAdmins(adminsActualizados);

    alert('Miembro eliminado correctamente');
  } catch (err) {
    console.error(err);
    alert('Error al eliminar el miembro');
  }
};




const handleSubmit = async (e) => {
  e.preventDefault();

  const noticia = {
    titulo: newsTitle,
    contenido: newsContent,
    reportero_id: usuario.id
  };

  try {
    await crearNoticiaPasante(noticia);
    alert('Noticia publicada con éxito');

    // Limpiar campos
    setNewsTitle('');
    setNewsContent('');
  } catch (error) {
    console.error('Error al crear noticia:', error.message);
    alert(error.message);
  }
};

  const tabs = rolUsuario === 'Administrador' ? ['Reporteros'] : ['Noticias'];

    if (!rolUsuario) {
      return <div className="admin-container"><h2>Acceso no autorizado</h2></div>;
    }

  return (
    <div className="admin-container">
        <header className="admin-header">
          <div className="header-content">
            <h1>Panel de Administración</h1>
            <p>Gestiona el contenido del portal de noticias de 31 Minutos</p>
          </div>

          <div className="admin-topbar">
            <nav className="admin-tabs">
              {tabs.map(tab => (
                <button
                  key={tab}
                  className={`tab ${activeTab === tab ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </nav>

            <span
              className='erase-button'
              style={{ cursor: 'pointer', marginLeft: '1rem', marginTop: '2rem' }}
              onClick={() => {
                localStorage.removeItem('usuario31');
                window.location.href = '/login';
              }}
            >
              Cerrar sesión
            </span>
          </div>
        </header>


      <main className="admin-main">


        {activeTab === 'Noticias' && rolUsuario === 'Reportero' && (
          <section className="panel-section">
            <h2>Gestión de Noticias</h2>
            <div className="panel-columns">
              <div className="panel-card">
                <h3>Crear Noticia</h3>
                <form className="form" onSubmit={handleSubmit}>
                  <input type="text" placeholder="Título de la noticia" value={newsTitle} onChange={(e) => setNewsTitle(e.target.value)} required />
                  <textarea placeholder="Contenido completo de la noticia" value={newsContent} onChange={(e) => setNewsContent(e.target.value)} required></textarea>
                  <button type="submit">Publicar Noticia</button>
                </form>
              </div>

            <div className="panel-card">
              <h3>Noticias Recientes</h3>
              <ul className="news-list">
                {noticiasRecientes.map((n, i) => (
                  <li key={i}>
                    <strong>{n.titulo}</strong>
                    <span className="news-meta">{n.categoria_noticia} • {n.nombre_reportero}</span>
                  </li>
                ))}
              </ul>
    
            </div>


            <div className="panel-card stats-card">
              <h3>Estadísticas</h3>
              <div className="stat-item">
                <span>Total de noticias:</span><strong>{estadisticas.total_noticias}</strong>
              </div>
              <div className="stat-item">
                <span>Noticia más popular:</span><strong>{estadisticas.noticia_mas_popular} likes</strong>
              </div>
            </div>

            </div>
          </section>
        )}



        {activeTab === 'Reporteros' && rolUsuario === 'Administrador' && (
          <section className="panel-section">
            <h2>Gestión de Reporteros</h2>
            <div className="panel-columns">
              <div className="panel-card">
                <h3>Añadir nuevo miembro</h3>
                <form className="form" onSubmit={handleRegistrarPasante}>
                  <input
                    type="text"
                    placeholder="Nombre del reportero"
                    value={nombrePasante}
                    onChange={(e) => setNombrePasante(e.target.value)}
                    required
                  />
                  <textarea
                    placeholder="Descripción breve del reportero"
                    value={descripcionPasante}
                    onChange={(e) => setDescripcionPasante(e.target.value)}
                    required
                  ></textarea>

                  <select value={rolPasante} onChange={(e) => setRolPasante(e.target.value)} required>
                    <option value="Administrador">Administrador</option>
                    <option value="Reportero">Reportero</option>
        
                  </select>

                  <h3>Asigna las credenciales al reportero</h3>
                  <input
                    type="email"
                    placeholder="Correo electrónico"
                    value={correoPasante}
                    onChange={(e) => setCorreoPasante(e.target.value)}
                    required
                  />
                  <input
                    type="password"
                    placeholder="Contraseña"
                    value={contrasenaPasante}
                    onChange={(e) => setContrasenaPasante(e.target.value)}
                    required
                  />
                  <button type="submit">Añadir Usuario</button>
                </form>


                <h3 style={{ marginTop: '2rem' }}>Nuestros Nuevos Admins</h3>
                <p className="subtext">Mira quien está moviendo los hilos detrás de cámara</p>
                <ul className="news-list">
                  {admins.map(admin => (
                    <li key={admin.id}>
                      <strong>{admin.nombre}</strong><br />
                      <span className="news-meta">{admin.correo}</span>
                      <span
                        className='erase-button'
                        style={{ cursor: 'pointer', marginLeft: '1rem' }}
                        onClick={() => eliminarPasante(admin.id)}
                      >
                        Eliminar
                      </span>
                    </li>
                  ))}
                </ul>
    
              </div>

              <div className="panel-card">
                <h3 style={{ marginTop: '2rem' }}>Nuestros Nuevos Reporteros</h3>
                <p className="subtext">Equipo actual de pastantes de 31 Minutos</p>


                    <ul className="news-list">
                    {pasantes.map(p => (
                      <li key={p.id}>
                        <strong>{p.nombre}</strong><br />
                        <span className="news-meta">{p.rol} • {p.correo}</span>
                        <span
                          className='erase-button'
                          style={{ cursor: 'pointer', marginLeft: '1rem' }}
                          onClick={() => eliminarPasante(p.id)}
                        >
                          Eliminar
                        </span>
                      </li>
                    ))}
                  </ul>
              </div>
            </div>
          </section>
        )}


      </main>
    </div>
  );
}