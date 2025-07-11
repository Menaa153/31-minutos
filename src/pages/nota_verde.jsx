import '../css/nota_verde.css';

import { LuLeaf } from "react-icons/lu";
import like from '../assets/corazon.png';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { obtenerVerdes } from '../services/ApisBackend';



export default function NotaVerde() {

  const navigate = useNavigate();

  const handleReporterosClick = () => {
    navigate('/reporteros');
  };

  const [, setNoticias] = useState([]);
  const [noticiasAleatorias, setNoticiasAleatorias] = useState([]);

  //para seleccionar n noticias al azar
  const seleccionarNoticiasAleatorias = (lista, cantidad) => {
    const copia = [...lista];
    const resultado = [];
    while (resultado.length < cantidad && copia.length > 0) {
      const indice = Math.floor(Math.random() * copia.length);
      resultado.push(copia.splice(indice, 1)[0]);
    }
    return resultado;
  };

  useEffect(() => {
    const fetchNoticias = async () => {
      try {
        const data = await obtenerVerdes();
        setNoticias(data || []);
        const seleccion = seleccionarNoticiasAleatorias(data, 6);
        setNoticiasAleatorias(seleccion);
      } catch (error) {
        console.error('Error al cargar noticias:', error.message);
      }
    };

    fetchNoticias();
  }, []);
  

  //autoscroll al dar click en el boton
  const handleScrollToNoticias = () => {
    const section = document.getElementById('reportajes');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const [selectedNoticia, setSelectedNoticia] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const openModal = (noticia) => {
    setSelectedNoticia(noticia);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedNoticia(null);
    setShowModal(false);
  };

  const formatearFechaBonita = (fechaISO) => {
    const opciones = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(fechaISO).toLocaleDateString('es-CO', opciones);
  };

  
  return (
    <div>

      {/* banner header */}
      <section>
        <div className='nota-verde'>
          <p className='nota-verde-p1'> <LuLeaf className='nt-vd-icono' /> Nota Verde</p>
          <p className='nota-verde-p2'>La sección ecologica de 31 Minutos, donde Juan Carlos Bodoque nos enseña
            sobre el medio ambiente y como cuidar nuestro planeta.
          </p>
          <div className='nota-verde-buttons'>
            <button onClick={handleScrollToNoticias} className='nota-verde-buttons-header1'>Ver Reportajes</button>
            <button onClick={handleReporterosClick} className='nota-verde-buttons-header2'>Conoce a bodoque</button>
          </div>
        </div> 
      </section>

      {/* noticias de nota verde */}

      <h2 className='h2-reportajes' id='reportajes'>Reportajes de Nota Verde</h2>
      { noticiasAleatorias && (
      <section className='section-reportajes' >
        <div className="parent">
          {noticiasAleatorias.map((noticias) => (
            <div key={noticias.id} className="div-reportajes">
              <div className="img-reportajes-verde">
                <img
                  src={`/${noticias.imagen_reportero || 'reporteros/default.jpg'}`}
                  alt="reportero"
                />
              </div>
                  <div className="info-reportajes">
                    <p className='info-reportajes-titulo'>{noticias.titulo}</p>
                    <span className="info-reportajes-categoria">{noticias.categoria_noticia}, </span>
                    <span className="info-reportajes-fecha">{formatearFechaBonita(noticias.fecha_publicacion)}</span>
                    <p className='info-reportajes-descripcion'>{noticias.texto_noticia.split(" ").slice(0, 24).join(" ")}...</p>
                    <div className='like-container-reportajes'>
                      <p className='info-reportajes-autor'>{noticias.nombre_reportero}</p>
                      <div className="like-group-reportajes">
                        <button className="like-button-reportajes">
                          <img src={like} alt="like" className="like-img" />
                        </button>
                        <span className='like-count'>{noticias.like_count}</span>
                      </div>
                  </div>
                <button className='info-reportajes-bt' onClick={() => openModal(noticias)}>Leer más</button>
            </div>
        </div>))}
        </div>
      </section>
      )}

      {/* banner al final de la pagina */}
      <div className='nota-verde-ultimomsm'>
        <div className='nota-verde-ultimomsm-div'>
          <p className='nota-verde-ultimomsm-txt'>
            En un mundo que avanza rápido, detenernos a pensar en el planeta es un acto de conciencia. 
            Esta Nota Verde es un espacio para reconectar con la naturaleza, reflexionar sobre nuestro 
            impacto y recordar que cada pequeño cambio cuenta. Cuidar el medio ambiente no es una opción, 
            es una responsabilidad compartida. Desde el reciclaje hasta el uso consciente de recursos, 
            cada gesto suma. Porque el futuro no se hereda, se construye hoy, con acciones verdes que 
            florecen en esperanza. <br /><br />
            ¡Únete a nosotros en la misión de cuidar nuestro planeta!
          </p>
        </div>
        <div className='nota-verde-ultimomsm-img'>
          <img src='/fondos/medioambiente2.jpg' className='img-nota-verde-img' alt="medioambiente" />
        </div>
      </div>

      {showModal && selectedNoticia &&  (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{selectedNoticia.titulo}</h2>
            <p className="modal-category">{selectedNoticia.categoria_noticia}, {selectedNoticia.fecha_publicacion}</p>
            <p className="modal-description">{selectedNoticia.texto_noticia}</p>
            <p className="modal-author">{selectedNoticia.nombre_reportero}</p>
            <button className="close-modal-btn-nota-verde" onClick={closeModal}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
}