import { useEffect, useState } from 'react';
import { FaRegFutbol } from "react-icons/fa";
import { obtenerNoticiaDeportes } from '../services/ApisBackend';
import '../css/deportes.css';

const Deportes = () => {
  const [, setNoticias] = useState([]);
  const [noticiasAleatorias, setNoticiasAleatorias] = useState([]);
  const [selectedNoticia, setSelectedNoticia] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Función para seleccionar N noticias al azar
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
        const data = await obtenerNoticiaDeportes();
        setNoticias(data || []);
        const seleccion = seleccionarNoticiasAleatorias(data, 4);
        setNoticiasAleatorias(seleccion);
      } catch (error) {
        console.error('Error al cargar noticias:', error.message);
      }
    };

    fetchNoticias();
  }, []);

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

      <section className='deportes'>
        <div className='deportes-header'>
          <p className='deportes-p1'><FaRegFutbol className='nt-vd-icono' /> Deportes</p>
          <p className='deportes-p2'>Las últimas novedades sobre los deportistas más extravagantes.</p>
        </div>
      </section>

      <h2 className='deportes-noticias'>Últimas Noticias sobre Deportes</h2>

      <section className='section-deportes'>
        <div className="deportes-parent">
          {noticiasAleatorias.map((noticia) => (
            <div key={noticia.id} className="div-deportes">
              <div className="img-deportes">
                <img
                  src={`/${noticia.imagen_reportero || 'reporteros/default.jpg'}`}
                  alt="reportero"
                />
              </div>
              <div className="deportes-descripcion">
                <p className='deportes-descripcion-c-f'>
                  {noticia.categoria}, {formatearFechaBonita(noticia.fecha_publicacion)}
                </p>
                <p className='deportes-descripcion-t'>{noticia.titulo}</p>
                <p className='deportes-descripcion-d'>
                  {noticia.texto_noticia.split(" ").slice(0, 24).join(" ")}...</p>
                <div className='deportes-div'>
                  <p className='deportes-descripcion-a'>{noticia.nombre_reportero}</p>
                  <button className='deportes-btn-d' onClick={() => openModal(noticia)}>Leer más</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <h1 className='hazaña-semana-h1'>La hazaña de la semana</h1>

      <div className="hazaña-banner">
        <p>Un atleta desconocido sorprendió al mundo al correr una maratón completa ¡en chancletas!</p>
      </div>

      {showModal && selectedNoticia && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{selectedNoticia.titulo}</h2>
            <p className="modal-category">
              {selectedNoticia.categoria}, {new Date(selectedNoticia.fecha_publicacion).toLocaleDateString()}
            </p>
            <p className="modal-description">{selectedNoticia.texto_noticia}</p>
            <p className="modal-author">{selectedNoticia.nombre_reportero}</p>
            <button className="close-modal-btn-deportes" onClick={closeModal}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
};


export default Deportes;