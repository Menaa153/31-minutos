import { useEffect, useState, useRef } from 'react';
import '../css/horoscopo.css';

import { GiAries } from "react-icons/gi";
import { GiTaurus } from "react-icons/gi";
import { GiGemini } from "react-icons/gi";
import { GiCancer } from "react-icons/gi";
import { GiLeo } from "react-icons/gi";
import { GiVirgo } from "react-icons/gi";
import { GiLibra } from "react-icons/gi";
import { GiScorpio } from "react-icons/gi";
import { GiSagittarius } from "react-icons/gi";
import { GiCapricorn } from "react-icons/gi";
import { GiAquarius } from "react-icons/gi";
import { GiPisces } from "react-icons/gi";


import { FaStarOfDavid } from "react-icons/fa";



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

  const signosZodiaco = [
  {
    nombre: 'Aries',
    fecha: '21 de marzo - 19 de abril',
    icono: <GiAries size={50} color="#814bb0" />
  },
  {
    nombre: 'Tauro',
    fecha: '20 de abril - 20 de mayo',
    icono: <GiTaurus size={50} color="#814bb0" />
  },
  {
    nombre: 'Géminis',
    fecha: '21 de mayo - 20 de junio',
    icono: <GiGemini size={50} color="#814bb0" />
  },
  {
    nombre: 'Cáncer',
    fecha: '21 de junio - 22 de julio',
    icono: <GiCancer size={50} color="#814bb0" />
  },
  {
    nombre: 'Leo',
    fecha: '23 de julio - 22 de agosto',
    icono: <GiLeo size={50} color="#814bb0" />
  },
  {
    nombre: 'Virgo',
    fecha: '23 de agosto - 22 de septiembre',
    icono: <GiVirgo size={50} color="#814bb0" />
  },
  {
    nombre: 'Libra',
    fecha: '23 de septiembre - 22 de octubre',
    icono: <GiLibra size={50} color="#814bb0" />
  },
  {
    nombre: 'Escorpio',
    fecha: '23 de octubre - 21 de noviembre',
    icono: <GiScorpio size={50} color="#814bb0" />
  },
  {
    nombre: 'Sagitario',
    fecha: '22 de noviembre - 21 de diciembre',
    icono: <GiSagittarius size={50} color="#814bb0" />
  },
  {
    nombre: 'Capricornio',
    fecha: '22 de diciembre - 19 de enero',
    icono: <GiCapricorn size={50} color="#814bb0" />
  },
  {
    nombre: 'Acuario',
    fecha: '20 de enero - 18 de febrero',
    icono: <GiAquarius size={50} color="#814bb0" />
  },
  {
    nombre: 'Piscis',
    fecha: '19 de febrero - 20 de marzo',
    icono: <GiPisces size={50} color="#814bb0" />
  }];


  return (
    <div>
      <section className='horoscopo'>
        <div className='horoscopo-header'>
          <p className='horoscopo-p1'> <FaStarOfDavid className='nt-vd-icono' /> Horoscopo semanal</p>
          <p className='horoscopo-p2'> Las predicciones astrologicas mas disparatadas
            y divertidas de la semana,por Policarpio Avendaño.
          </p>
          <p className='horoscopo-p3'>Actualizado: 9 de Mayo de 2025</p>
          {/*}
          <div className='nota-verde-buttons'>
            <button className='nota-verde-buttons-a'>Ver Reportajes</button>
            <button className='nota-verde-buttons-b'>Conoce a bodoque</button>
          </div>*/}
        </div> 
      </section>
      
      <section className='horoscopo-mensaje'>
        <div className='horoscopo-mensaje-poli'>
          <div className='horoscopo-mensaje-poli-img-fondo-perfil'></div>
          <div className='horoscopo-mensaje-poli-texto'>
            <p className='horoscopo-title-msm-poli'>Mensaje de Policario Avedaño</p>
            <p className='horoscopo-descrip-msm-poli'>"Las extrellas nunca miente, pero a veces yo si para que el horoscopo
              sea mas interesante"</p>
          </div>
        </div>
      </section>

      <p className='horoscopo-diarios'> Las predicciones para hoy,
        9 de Mayo de 2025. Recuerda que las extrellas sugieren, pero 
        tú decides. 
      </p>
  
      <section className='section-horoscopos'>
        <div className="horoscopo-parent">
          {signosZodiaco.map((signo) => (
            <div key={signo.nombre} className="div-horoscopo">
              <div className="img-horoscopo-signo">
                <div className='img-horoscopo-signo-icon'>
                  {signo.icono}
                </div>
                <div>
                  <p className='horoscopo-p-signo'>{signo.nombre}</p>
                  <p className='horoscopo-p-fecha'>{signo.fecha}</p>
                </div>
              </div>
              <div className="horoscopo-descripcion">
                <p className='horoscopo-descripcion-p'>
                  {horoscopos[signo.nombre] || mensaje}
                </p>
              </div>
              <div className='horoscopo-descripcion-2'>
                <div className='horoscopo-descripcion-2-1'>
                  <p className='horoscopo-descripcion-2-p1'>Número de la suerte:</p>
                  <p className='horoscopo-descripcion-2-p2'>{Math.floor(Math.random() * 100)}</p>
                </div>
                <div className='horoscopo-descripcion-2-2'>
                  <p className='horoscopo-descripcion-2-p1'>Compatibilidad:</p>
                  <p className='horoscopo-descripcion-2-p2'>Escorpio, Piscis</p>
                </div>  
              </div>  
            </div>
          ))}
        </div>
      </section>
    </div>
 
  

  );

}
