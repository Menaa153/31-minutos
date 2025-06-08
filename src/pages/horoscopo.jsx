import { useEffect, useState, useRef } from 'react';
import '../css/horoscopo.css';


export default function Horoscopo() {


  const [horoscopos, setHoroscopos] = useState({});
  const yaConsultado = useRef(false); // evita multiples llamadas
  const [mensaje, setMensaje] = useState('Cargando horóscopo...');

  const apiKey = 'AIzaSyBqFk1pIAbt1yCe7Hr-WWN-jYkvsCwlon0'; 

  useEffect(() => {
    if (yaConsultado.current) return; // ya se hizo la llamada
    yaConsultado.current = true;

    const obtenerHoroscopo = async () => {
      try {
        const response = await fetch(
         `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              contents: [
                {
                  parts: [
                    {
                      text: `Dame el horóscopo de la semana para cada signo del zodiaco, en un tono breve y divertido. Devuélvelo en formato JSON con los nombres de los signos como claves. Ejemplo: {
                        "Aries": "texto divertido",
                        "Tauro": "texto divertido",
                        ...
                      }`,
                    },
                  ],
                },
              ],
            }),
          }
        );

        const data = await response.json();
        console.log('respuesta completa de la API:', data);
        const texto = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
        console.log('texto generado por la API:', texto);

        //convertir a JSON
        const jsonText = texto.trim();

        //aislar el JSON válido
        const start = jsonText.indexOf('{');
        const end = jsonText.lastIndexOf('}');
        const posibleJSON = jsonText.slice(start, end + 1);

        const objetoHoroscopos = JSON.parse(posibleJSON);

        setHoroscopos(objetoHoroscopos);
      } catch (error) {
        console.error('Error al obtener o procesar el horoscopo:', error);
        setMensaje('Error al obtener el horscopo.');
      }
    };

    obtenerHoroscopo();
  }, []);

    return (
    <div className="horoscopo-container">
      <h1>Horóscopo de la Semana</h1>
      {Object.keys(horoscopos).length === 0 ? (
        <p>{mensaje}</p>
      ) : (
        Object.entries(horoscopos).map(([signo, prediccion]) => (
          <div key={signo} className="signo-card">
            <h2>{signo}</h2>
            <p>{prediccion}</p>
          </div>
        ))
      )}
    </div>
  );

}
