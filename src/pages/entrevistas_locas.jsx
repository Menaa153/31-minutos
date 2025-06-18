import React from "react";
import "../css/entrevistas_locas.css";

export default function EntrevistasLocas() {
  return (
    <div className="contenedor-entrevistas">
      <header className="encabezado-entrevistas">
        <div className="contenido-encabezado">
          <h1 className="entrevistas-h1">Entrevistas Locas</h1>
          <p className="entrevistas-p1">
            A veces nuestros reporteros le preguntan a las personas qué opinan sobre diferentes temas. Aquí tenemos una recopilación de las mejores respuestas.
          </p>
          {/*<button className="boton-ver-entrevistas">Ver entrevistas</button>*/}
        </div>
      </header>

      <section className="contenido-entrevistas">
        <h2 className="entrevistas-h2">Respuestas Ingeniosas</h2>
        <div className="tarjeta-entrevista">
          <div className="imagen-entrevista">
            <img
              src="https://st1.uvnimg.com/1a/aa/ef2a79014cbab102ec3524fccc8a/telenovelas.jpg"
              alt="Entrevista TV"
            />
          </div>

          <div className="info-entrevista">
            <div className="etiqueta-fecha">
              <span className="categoria">Entrevistas Locas</span>
              <span className="fecha">12/05/2025</span>
            </div>

            <h3 className="titulo-entrevista">
              ¿Cuáles son las series colombianas favoritas de nuestros espectadores?
            </h3>
            <p className="descripcion-entrevista">
              Hicimos una pequeña encuesta a nuestros espectadores para saber qué es lo que suelen ver en sus ratos libres, además de nuestro programa. Estas fueron las mejores respuestas.
            </p>

            <div className="autor-entrevista">
              <div className="avatar">
                <img
                  src="https://i0.wp.com/31minutosoficial.cl/wp-content/uploads/2014/01/thumb-policarpo2.png?w=640&ssl=1"
                  alt="Policarpo"
                />
              </div>
              <span>Policarpo</span>
            </div>
          </div>
        </div>

        <h2>Opiniones Extravagantes</h2>
        <div className="tarjeta-entrevista">
          <div className="imagen-entrevista">
            <img
              src="https://m.media-amazon.com/images/I/51R--QM1BSL.jpg"
              alt="Opiniones divertidas"
            />
          </div>

          <div className="info-entrevista">
            <div className="etiqueta-fecha">
              <span className="categoria">Entrevistas Locas</span>
              <span className="fecha">10/05/2025</span>
            </div>

            <h3 className="titulo-entrevista">
              ¿Te gustaría ser presidente por un día?
            </h3>
            <p className="descripcion-entrevista">
              ¿Y tú qué harías si fueras presidente por un día? Algunas respuestas fueron inesperadas, y otras tan lógicas que nos hicieron pensar. Estas son las opiniones más impresionantes de nuestros espectadores.
            </p>

            <div className="autor-entrevista">
              <div className="avatar">
                <img
                  src="https://i0.wp.com/31minutosoficial.cl/wp-content/uploads/2014/02/thumb-patana.png?resize=300%2C300&ssl=1"
                  alt="Patana"
                />
              </div>
              <span>Patana</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
