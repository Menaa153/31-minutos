import '../css/nota_verde.css';

import { LuLeaf } from "react-icons/lu";
import like from '../assets/corazon.png';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import Tulio from '../assets/Tulio2.jpg';  



export default function NotaVerde() {
  const navigate = useNavigate(); // <-- Inicializa el hook aquí

  const handleReporterosClick = () => {
    navigate('/reporteros');
  };
    const noticias = [
    {
      id: 1,
      title: 'Lionel Messi lidera histórica remontada del Inter Miami',
      description: 'En un partido inolvidable, Lionel Messi marcó dos goles y dio una asistencia para que el Inter Miami venciera 4-3 al LA Galaxy, tras ir perdiendo 0-3 en el primer tiempo. Con esta actuación, Messi reafirma su influencia en la Major League Soccer.',
      category: 'Deportes',
      date: '2025-06-06',
      autor: 'Juan Carlos Bodoque',
    }

    ];
  


  
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

  return (
    <div>

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
      <h2 className='h2-reportajes' id='reportajes'>Reportajes de Nota Verde</h2>
      <section className='section-reportajes' >
        <div className="parent">
          {[1,2,3,4,5,6].map((n) => (
            <div key={n} className="div-reportajes">
              <div className="img-reportajes">
                <img src='/reporteros/bodoque/Bodoque5.jpg' className='img-reportajes-img' alt="Tulio Triviño" />
              </div>
                  <div className="info-reportajes">
                    <p className='info-reportajes-titulo'>{noticias[0].title}</p>
                    <span className="info-reportajes-categoria">{noticias[0].category}, </span>
                    <span className="info-reportajes-fecha">{noticias[0].date}</span>
                    <p className='info-reportajes-descripcion'>{noticias[0].description.split(" ").slice(0, 24).join(" ")}...</p>
                    <div className='like-container-reportajes'>
                      <p className='info-reportajes-autor'>{noticias[0].autor}</p>
                      <div className="like-group-reportajes">
                        <button className="like-button-reportajes">
                          <img src={like} alt="like" className="like-img" />
                        </button>
                        <span className='like-count'>15</span>
                      </div>
                </div>
                <button className='info-reportajes-bt' onClick={() => openModal(noticias[0])}>Leer más</button>
            </div>
        </div>))}
        </div>
      </section>

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

      {showModal && selectedNoticia && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{selectedNoticia.title}</h2>
            <p className="modal-category">{selectedNoticia.category}, {selectedNoticia.date}</p>
            <p className="modal-description">{selectedNoticia.description}</p>
            <p className="modal-author">{selectedNoticia.autor}</p>
            <button className="close-modal-btn-nota-verde" onClick={closeModal}>Cerrar</button>
          </div>
        </div>
    )}
    </div>
  );
}