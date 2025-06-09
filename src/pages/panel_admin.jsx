import React, { useState } from 'react';
import '../css/admin_panel.css';

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState('Noticias');
  const [newsTitle, setNewsTitle] = useState('');
  const [newsSummary, setNewsSummary] = useState('');
  const [newsContent, setNewsContent] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedReporter, setSelectedReporter] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      title: newsTitle,
      category: selectedCategory,
      reporter: selectedReporter,
      summary: newsSummary,
      content: newsContent
    });
    setNewsTitle('');
    setNewsSummary('');
    setNewsContent('');
    setSelectedCategory('');
    setSelectedReporter('');
  };

  const tabs = ['Noticias', 'Reporteros', 'Configuración'];

  return (
    <div className="admin-container">
      <header className="admin-header">
        <div className="header-content">
          <h1>Panel de Administración</h1>
          <p>Gestiona el contenido del portal de noticias de 31 Minutos</p>
        </div>
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
      </header>

      <main className="admin-main">
        {activeTab === 'Noticias' && (
          <section className="panel-section">
            <h2>Gestión de Noticias</h2>
            <div className="panel-columns">
              <div className="panel-card">
                <h3>Crear Noticia</h3>
                <form className="form" onSubmit={handleSubmit}>
                  <input type="text" placeholder="Título de la noticia" value={newsTitle} onChange={(e) => setNewsTitle(e.target.value)} required />
                  <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} required>
                    <option value="">Selecciona una categoría</option>
                    <option value="Nota Verde">Nota Verde</option>
                    <option value="Horóscopo">Horóscopo</option>
                    <option value="Deportes">Deportes</option>
                    <option value="Cultura">Cultura</option>
                  </select>
                  <select value={selectedReporter} onChange={(e) => setSelectedReporter(e.target.value)} required>
                    <option value="">Selecciona un reportero</option>
                    <option value="Juan Carlos Bodoque">Juan Carlos Bodoque</option>
                    <option value="Policarpo Avendaño">Policarpo Avendaño</option>
                    <option value="Tulio Triviño">Tulio Triviño</option>
                    <option value="Juanín Juan Harry">Juanín Juan Harry</option>
                  </select>
                  <textarea placeholder="Breve resumen de la noticia" value={newsSummary} onChange={(e) => setNewsSummary(e.target.value)} required></textarea>
                  <textarea placeholder="Contenido completo de la noticia" value={newsContent} onChange={(e) => setNewsContent(e.target.value)} required></textarea>
                  <input type="file" accept="image/*" />
                  <button type="submit">Publicar Noticia</button>
                </form>
              </div>

              <div className="panel-card">
                <h3>Noticias Recientes</h3>
                <ul className="news-list">
                  <li><strong>Juan Carlos Bodoque investiga la desaparición de los árboles</strong><span className="news-meta">Nota Verde • Juan Carlos Bodoque</span></li>
                  <li><strong>Policarpo Avendaño revela los secretos del horóscopo semanal</strong><span className="news-meta">Horóscopo • Policarpo Avendaño</span></li>
                  <li><strong>Tulio Triviño presenta su nuevo programa de entrevistas</strong><span className="news-meta">Cultura • Tulio Triviño</span></li>
                </ul>
                <a href="#" className="view-all">Ver todas las noticias →</a>
              </div>

              <div className="panel-card stats-card">
                <h3>Estadísticas</h3>
                <div className="stat-item"><span>Total de noticias:</span><strong>24</strong></div>
                <div className="stat-item"><span>Noticias esta semana:</span><strong>6</strong></div>
                <div className="stat-item"><span>Noticia más popular:</span><strong>42 likes</strong></div>
                <div className="stat-item"><span>Categoría más vista:</span><strong>Nota Verde</strong></div>
                <button className="report-button">Ver informe completo</button>
              </div>
            </div>
          </section>
        )}

        {activeTab === 'Reporteros' && (
          <section className="panel-section">
            <h2>Gestión de Reporteros</h2>
            <div className="panel-columns">
              <div className="panel-card">
                <h3>Añadir Reportero</h3>
                <form className="form">
                  <input type="text" placeholder="Nombre del reportero" />
                  <input type="text" placeholder="Rol o especialidad" />
                  <textarea placeholder="Descripción breve del reportero"></textarea>
                  <textarea placeholder="Biografía detallada"></textarea>
                  <input type="file" accept="image/*" />
                  <button type="submit">Registrar Reportero</button>
                </form>
              </div>

              <div className="panel-card">
                <h3>Reporteros Activos</h3>
                <p className="subtext">Equipo actual de 31 Minutos</p>
                <ul className="news-list">
                  <li><strong>Tulio Triviño</strong><span className="news-meta">Director y Presentador</span></li>
                  <li><strong>Juan Carlos Bodoque</strong><span className="news-meta">Reportero de Medio Ambiente</span></li>
                  <li><strong>Policarpo Avendaño</strong><span className="news-meta">Astrólogo</span></li>
                </ul>
                <a href="#" className="view-all">Ver todos los reporteros</a>
              </div>

              <div className="panel-card stats-card">
                <h3>Rendimiento</h3>
                <div className="stat-item"><span>Reportero más activo:</span><strong>Juan Carlos Bodoque</strong></div>
                <div className="stat-item"><span>Noticias publicadas</span><strong>8 esta semana</strong></div>
                <div className="stat-item"><span>Reportero más popular</span><strong>Tulio Triviño</strong></div>
                <div className="stat-item"><span>Nuevos reporteros</span><strong>2 este mes</strong></div>
                <button className="report-button">Ver informe completo</button>
              </div>
            </div>
          </section>
        )}

        {activeTab === 'Configuración' && (
          <section className="panel-section">
            <h2>Gestión de Usuarios</h2>
            <div className="panel-columns">
              <div className="panel-card">
                <h3>Administradores y permisos</h3>
                <form className="form">
                  <input type="email" placeholder="Correo electrónico" required />
                  <select required>
                    <option value="Editor">Editor</option>
                    <option value="Administrador">Administrador</option>
                    <option value="Reportero">Reportero</option>
                  </select>
                  <button type="submit">Añadir Usuario</button>
                </form>

                <h4 style={{ marginTop: '2rem' }}>Usuarios Actuales</h4>
                <ul className="news-list">
                  <li><strong>tulio@31minutos.cl</strong><br/><span className="news-meta">Administrador</span><span style={{ float: 'right', color: '#e30613', cursor: 'pointer' }}>Editar</span></li>
                  <li><strong>bodoque@31minutos.cl</strong><br/><span className="news-meta">Editor</span><span style={{ float: 'right', color: '#e30613', cursor: 'pointer' }}>Editar</span></li>
                  <li><strong>juanin@31minutos.cl</strong><br/><span className="news-meta">Reportero</span><span style={{ float: 'right', color: '#e30613', cursor: 'pointer' }}>Editar</span></li>
                </ul>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
