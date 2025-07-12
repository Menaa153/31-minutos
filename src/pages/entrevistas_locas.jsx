import React, { useEffect, useState } from "react";
import { PiMicrophoneStageFill } from "react-icons/pi";
import { obtenerEntrevistas } from "../services/ApisBackend";
import "../css/entrevistas_locas.css";

export default function EntrevistasLocas() {
  const [ingeniosas, setIngeniosas] = useState([]);
  const [extravagantes, setExtravagantes] = useState([]);

  useEffect(() => {
    const fetchEntrevistas = async () => {
      try {
        const data = await obtenerEntrevistas();

        // pa mezclar entrevistas
        const mezclarArray = (array) => {
          const copia = [...array];
          for (let i = copia.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [copia[i], copia[j]] = [copia[j], copia[i]];
          }
          return copia;
        };

        // escoger 3 entrevistas al azar de cada tipo 
        const ingeniosasAleatorias = mezclarArray(data.ingeniosas).slice(0, 3);
        const extravagantesAleatorias = mezclarArray(data.extravagantes).slice(0, 3);

        setIngeniosas(ingeniosasAleatorias);
        setExtravagantes(extravagantesAleatorias);
      } catch (error) {
        console.error("Error al cargar entrevistas locas:", error.message);
      }
    };

    fetchEntrevistas();
  }, []);


  const formatearFechaBonita = (fechaISO) => {
    const opciones = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(fechaISO).toLocaleDateString('es-CO', opciones);
  };

  return (
    <div className="contenedor-entrevistas">
      <header className="encabezado-entrevistas">
        <div className="contenido-encabezado">
          <h1 className="entrevistas-h1">
            <PiMicrophoneStageFill className="nt-vd-icono-entre" />
            Entrevistas Locas
          </h1>
          <p className="entrevistas-p1">
            A veces nuestros reporteros le preguntan a las personas qué opinan sobre diferentes temas. Aquí tenemos una recopilación de las mejores respuestas.
          </p>
        </div>
      </header>

      <section className="contenido-entrevistas">
        <h2 className="entrevistas-h2">Respuestas Ingeniosas</h2>
        {ingeniosas.map((entrevista, index) => (
          <div className="tarjeta-entrevista" key={index}>
            <div className="imagen-entrevista">
            <img src={entrevista.imagen || "/reporteros/default.jpg"} alt={entrevista.autor} />
            </div>
            <div className="info-entrevista">
              <div className="etiqueta-fecha">
                <span className="fecha">{formatearFechaBonita(entrevista.fecha)}</span>
              </div>
              <h3 className="titulo-entrevista">{entrevista.titulo}</h3>
              <p className="descripcion-entrevista">{entrevista.respuesta}</p>
              <div className="autor-entrevista">
                <span>{entrevista.autor}</span>
              </div>
            </div>
          </div>
        ))}

        <h2 className="entrevistas-h2">Opiniones Extravagantes</h2>
        {extravagantes.map((entrevista, index) => (
          <div className="tarjeta-entrevista" key={index}>
            <div className="imagen-entrevista">
              <img src={entrevista.imagen || "/reporteros/default.jpg"} alt={entrevista.autor} />
            </div>
            <div className="info-entrevista">
              <div className="etiqueta-fecha">
                <span className="fecha">{formatearFechaBonita(entrevista.fecha)}</span>
              </div>
              <h3 className="titulo-entrevista">{entrevista.titulo}</h3>
              <p className="descripcion-entrevista">{entrevista.respuesta}</p>
              <div className="autor-entrevista">
                <span>{entrevista.autor}</span>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
