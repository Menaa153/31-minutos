import '../css/nota_verde.css';
import { LuLeaf } from "react-icons/lu";
import like from '../assets/corazon.png';
import likeFill from '../assets/corazon_relleno.png';

import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { obtenerVerdes, toggleLike, obtenerLikesUsuario } from '../services/ApisBackend';

export default function NotaVerde() {
  const navigate = useNavigate();
  const [, setNoticias] = useState([]);
  const [noticiasAleatorias, setNoticiasAleatorias] = useState([]);
  const [likesDados, setLikesDados] = useState({}); //manejar estado local de likes

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
    const fetchDatos = async () => {
      try {
        const data = await obtenerVerdes();
        setNoticias(data || []);
        const seleccion = seleccionarNoticiasAleatorias(data, 6);
        setNoticiasAleatorias(seleccion);

        //crgar los likees dados por ip
        const likesUsuario = await obtenerLikesUsuario();
        const mapaLikes = {};
        likesUsuario.forEach(id => { mapaLikes[id] = true });
        setLikesDados(mapaLikes);

      } catch (error) {
        console.error('Error al cargar datos:', error.message);
      }
    };

    fetchDatos();
  }, []);

  const handleScrollToNoticias = () => {
    const section = document.getElementById('reportajes');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleReporterosClick = () => {
    window.scrollTo(0, 0);
    navigate('/reporteros');
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

  const manejarLike = async (idNoticia) => {
    try {
      const { liked } = await toggleLike(idNoticia);
      setNoticiasAleatorias(prev =>
        prev.map(n =>
          n.id === idNoticia
            ? { ...n, like_count: liked ? n.like_count + 1 : n.like_count - 1 }
            : n
        )
      );
      setLikesDados(prev => ({ ...prev, [idNoticia]: liked }));
    } catch (error) {
      console.error('Error al hacer like:', error.message);
    }
  };

  return (
    <div>
      {/* Banner header */}
      <section>
        <div className='nota-verde'>
          <p className='nota-verde-p1'> <LuLeaf className='nt-vd-icono' /> Nota Verde</p>
          <p className='nota-verde-p2'>
            La sección ecológica de 31 Minutos, donde Juan Carlos Bodoque nos enseña
            sobre el medio ambiente y cómo cuidar nuestro planeta.
          </p>
          <div className='nota-verde-buttons'>
            <button onClick={handleScrollToNoticias} className='nota-verde-buttons-header1'>Ver Reportajes</button>
            <button onClick={handleReporterosClick} className='nota-verde-buttons-header2'>Conoce a Bodoque</button>
          </div>
        </div>
      </section>

      {/* Noticias */}
      <h2 className='h2-reportajes' id='reportajes'>Reportajes de Nota Verde</h2>
      {noticiasAleatorias.length > 0 && (
        <section className='section-reportajes'>
          <div className="parent">
            {noticiasAleatorias.map((noticia) => (
              <div key={noticia.id} className="div-reportajes">
                <div className="img-reportajes-verde">
                  <img
                    src={`/${noticia.imagen_reportero || 'reporteros/default.jpg'}`}
                    alt="reportero"
                  />
                </div>
                <div className="info-reportajes">
                  <p className='info-reportajes-titulo'>{noticia.titulo}</p>
                  <span className="info-reportajes-categoria">{noticia.categoria_noticia}, </span>
                  <span className="info-reportajes-fecha">{formatearFechaBonita(noticia.fecha_publicacion)}</span>
                  <p className='info-reportajes-descripcion'>
                    {noticia.texto_noticia.split(" ").slice(0, 24).join(" ")}...
                  </p>
                  <div className='like-container-reportajes'>
                    <p className='info-reportajes-autor'>{noticia.nombre_reportero}</p>
                    <div className="like-group-reportajes">
                      <button className="like-button-reportajes" onClick={() => manejarLike(noticia.id)}>
                        <img
                          src={likesDados[noticia.id] ? likeFill : like}
                          alt="like"
                          className="like-img"
                        />
                      </button>
                      <span className='like-count'>{noticia.like_count}</span>
                    </div>
                  </div>
                  <button className='info-reportajes-bt' onClick={() => openModal(noticia)}>Leer más</button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <div className='nota-verde-ultimomsm'>
        <div className='nota-verde-ultimomsm-div'>
          <p className='nota-verde-ultimomsm-txt'>
            En un mundo que avanza rápido, detenernos a pensar en el planeta es un acto de conciencia. 
            Esta Nota Verde es un espacio para reconectar con la naturaleza, reflexionar sobre nuestro 
            impacto y recordar que cada pequeño cambio cuenta. Cuidar el medio ambiente no es una opción, 
            es una responsabilidad compartida. Desde el reciclaje hasta el uso consciente de recursos, 
            cada gesto suma. Porque el futuro no se hereda, se construye hoy, con acciones verdes que 
            florecen en esperanza.
            <br /><br />¡Únete a nosotros en la misión de cuidar nuestro planeta!
          </p>
        </div>
        <div className='nota-verde-ultimomsm-img'>
          <img src='/fondos/medioambiente2.jpg' className='img-nota-verde-img' alt="medioambiente" />
        </div>
      </div>

      {/* modal */}
      {showModal && selectedNoticia && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{selectedNoticia.titulo}</h2>
            <p className="modal-category">
              {selectedNoticia.categoria_noticia}, {formatearFechaBonita(selectedNoticia.fecha_publicacion)}
            </p>
            <p className="modal-description">{selectedNoticia.texto_noticia}</p>
            <p className="modal-author">{selectedNoticia.nombre_reportero}</p>
            <button className="close-modal-btn-nota-verde" onClick={closeModal}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
}
