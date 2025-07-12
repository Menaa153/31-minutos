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
import { obtenerHoroscopos } from '../services/ApisBackend';


export default function Horoscopo() {

  //pa consumir la api y traer los horoscopos
  const [horoscopos, setHoroscopos] = useState({});
  const [mensaje, setMensaje] = useState();
  const yaConsultado = useRef(false);

  useEffect(() => {
    if (yaConsultado.current) return;
    yaConsultado.current = true;

    const fetchHoroscopos = async () => {
      try {
        const data = await obtenerHoroscopos();
        setHoroscopos(data);
      } catch {
        setMensaje('Error al obtener el horoscopo.');
      }
    };

    fetchHoroscopos();
  }, []);


  //obtener dia mes y año actual
  const fechaActual = new Date();
  const fechaFormateada = new Intl.DateTimeFormat('es-CO', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(fechaActual);

  //signos zodiacales
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

  //fubcion para generar compatibilidad al azar
  function generarCompatibilidadAleatoria(signoActual, signos) {
    const otrosSignos = signos
      .map((s) => s.nombre)
      .filter((nombre) => nombre !== signoActual);

    // elegir dos distintos al azar
    const compatibilidades = [];
    while (compatibilidades.length < 2) {
      const signoRandom = otrosSignos[Math.floor(Math.random() * otrosSignos.length)];
      if (!compatibilidades.includes(signoRandom)) {
        compatibilidades.push(signoRandom);
      }
    }
    
    return compatibilidades.join(', ');
  }

  return (
    <div>
      <section className='horoscopo'>
        <div className='horoscopo-header'>
          <p className='horoscopo-p1'> <FaStarOfDavid className='nt-vd-icono' /> Horoscopo semanal</p>
          <p className='horoscopo-p2'> Las predicciones astrologicas mas disparatadas
            y divertidas de la semana,por Policarpio Avendaño.
          </p>
          <p className='horoscopo-p3'>Actualizado: {fechaFormateada}</p>
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

      <p className='horoscopo-diarios'> Las predicciones para hoy, {fechaFormateada}. 
        Recuerda que las extrellas sugieren, pero tú decides. 
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
                  <p className='horoscopo-descripcion-2-p2'>
                    {generarCompatibilidadAleatoria(signo.nombre, signosZodiaco)}
                  </p>

                </div>  
              </div>  
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
