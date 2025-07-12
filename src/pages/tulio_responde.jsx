import "../css/tulio_responde.css";

import { useState } from "react";
import { FaCircleQuestion } from "react-icons/fa6";
import { enviarPreguntaTulio } from '../services/ApisBackend';


export default function TulioResponde() {

  // estado para manejar el formulario
  const [nombre, setNombre] = useState("");
  const [pregunta, setPregunta] = useState("");

  // funcion para manejar el envio de las preguntas
  const manejarEnvio = async (e) => {
    e.preventDefault();
    try {
      const preguntaEnviada = await enviarPreguntaTulio({ nombre, pregunta });
      alert(`¡Pregunta enviada con exito!\n${preguntaEnviada.pregunta}`);
      setNombre('');
      setPregunta('');
    } catch (error) {
      alert('Hubo un error al enviar tu pregunta. Intenta de nuevo. error: ' + error.message);
    }
  };

  
  return (
    <div>
      <section>
        <div className="contenedor-tulio">
          <p className="titulo-tulio"> <FaCircleQuestion className='nt-vd-icono' /> Tulio Responde</p>
          <p className="descripcion-tulio">
            Envía tus preguntas para que Tulio te responda. Las más interesantes y útiles podrán ser respondidas en nuestro próximo programa.
          </p>
          <div className="botones-tulio">
            {/*<button className="boton-hacer-pregunta">Hacer Pregunta</button>*/}
          </div>
        </div>
      </section>

      <section className="seccion-formulario-tulio">
        <div className="formulario-wrapper">
          <form className="formulario-tulio" onSubmit={manejarEnvio}>
            <div className="fila-formulario">
              <label htmlFor="nombre" className="label-formulario">Nombre:</label>
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
              <label htmlFor="pregunta" className="label-formulario">Pregunta:</label>
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

            <div className="boton-enviar-container">
              <button type="submit" className="boton-enviar">Enviar Pregunta</button>
            </div>
          </form>
        </div>
      </section>

      <div className="info-extra-tulio">
        <p>Las preguntas seleccionadas podrán formar parte del siguiente programa de 31 Minutos.</p>
        <p>Gracias por participar y aportar tus ideas y dudas para hacer un show más divertido y educativo.</p>
      </div>
    </div>
  );
}
