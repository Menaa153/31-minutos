import React, { useState } from "react";
import "../css/tulio_responde.css";

export default function TulioResponde() {
  const [nombre, setNombre] = useState("");
  const [pregunta, setPregunta] = useState("");

  const manejarEnvio = (e) => {
    e.preventDefault();
    alert(`Pregunta enviada por ${nombre}: ${pregunta}`);
    // Aquí se pueden enviar los datos a un backend
    setNombre("");
    setPregunta("");
  };

  return (
    <div className="contenedor-tulio">
      <section className="encabezado-tulio">
        <h1>Tulio Responde</h1>
        <p>
          Envía tus preguntas para que Tulio te responda. Las más interesantes
          y útiles podrán ser respondidas en nuestro próximo programa.
        </p>
        <button className="boton-hacer-pregunta">Hacer Pregunta</button>
      </section>

      <form className="formulario-tulio" onSubmit={manejarEnvio}>
        <div className="fila-formulario">
          {}
          <label htmlFor="nombre">Nombre:</label>
          {}
          <div className="input-wrapper">
            <input
              id="nombre"
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="fila-formulario">
          {}
          <label htmlFor="pregunta">Pregunta:</label>
          {}
          <div className="input-wrapper">
            <input
              id="pregunta"
              type="text"
              value={pregunta}
              onChange={(e) => setPregunta(e.target.value)}
              required
            />
          </div>
        </div>

        <button type="submit" className="boton-enviar">
          Enviar Pregunta
        </button>
      </form>
    </div>
  );
}