import React from "react";
import "../css/entrevistas_locas.css";

export default function EntrevistasLocas() {
  return (
    <div className="contenedor-entrevistas">
      <header className="encabezado-entrevistas">
        <div className="contenido-encabezado">
          <h1>Entrevistas Locas</h1>
          <p>
            A veces nuestros reporteros le preguntan a las personas que opinan sobre diferentes temas, aquí tenemos una recopilación de las mejores respuestas.
          </p>
          <button className="boton-ver-entrevistas">Ver entrevistas</button>
        </div>
      </header>

      <section className="contenido-entrevistas">
        <h2>Respuestas Ingeniosas</h2>
        <div className="tarjeta-entrevista">
          <div className="imagen-entrevista"></div>

          <div className="info-entrevista">
            <div className="etiqueta-fecha">
              <span className="categoria">Categoría</span>
              <span className="fecha">Fecha de publicación</span>
            </div>

            <h3 className="titulo-entrevista">Título</h3>
            <p className="descripcion-entrevista">Descripción</p>

            <div className="autor-entrevista">
              <div className="avatar"></div>
              <span>Autor</span>
            </div>
          </div>
        </div>

        <h2>Opiniones Extravagantes</h2>
        <div className="tarjeta-entrevista">
          <div className="imagen-entrevista"></div>

          <div className="info-entrevista">
            <div className="etiqueta-fecha">
              <span className="categoria">Categoría</span>
              <span className="fecha">Fecha de publicación</span>
            </div>

            <h3 className="titulo-entrevista">Título</h3>
            <p className="descripcion-entrevista">Descripción</p>

            <div className="autor-entrevista">
              <div className="avatar"></div>
              <span>Autor</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}