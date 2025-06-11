import { useEffect, useState, useRef } from 'react';
import '../css/deportes.css'; 

const Deportes = () => {
  return (
    <div>
      <div className="deportes-banner">
        <h2>Deportes</h2>
        <p>Las últimas novedades sobre los deportistas más extravagantes.</p>
        <button>Ver noticias</button>
      </div>

      <div className="noticias-container">
        <h3>Últimas Noticias sobre Deportes</h3>
        <div className="noticias-grid">
          <div className="noticia-card">
            <span className="categoria">Categoría</span>
            <h3>Título</h3>
            <p>Fecha de publicación</p>
            <p>Descripción</p>
            <div className="autor">
              <span>◯</span>
              <span>Autor</span>
            </div>
            <button>Leer más</button>
          </div>

          <div className="noticia-card">
            <span className="categoria">Categoría</span>
            <h3>Título</h3>
            <p>Fecha de publicación</p>
            <p>Descripción</p>
            <div className="autor">
              <span>◯</span>
              <span>Autor</span>
            </div>
            <button>Leer más</button>
          </div>
        </div>
      </div>

      <div className="hazaña-banner">
        <h3>La hazaña de la semana</h3>
      </div>
    </div>
  );
};

export default Deportes;