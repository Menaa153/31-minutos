import { useEffect, useState, useRef } from 'react';
import '../css/deportes.css'; 

const Deportes = () => {

  const noticias = [
    {
      id: 1,
      titulo: 'Lionel Messi lidera histórica remontada del Inter Miami',
      descripcion: 'En un partido inolvidable, Lionel Messi marcó dos goles y dio una asistencia para que el Inter Miami venciera 4-3 al LA Galaxy, tras ir perdiendo 0-3 en el primer tiempo. Con esta actuación, Messi reafirma su influencia en la Major League Soccer.',
      categoria: 'Futbol',
      fecha: '2025-06-06',
      autor: 'Tulio Triviño',
    }];
  
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

      <section className='deportes'>
        <div className='deportes-header'>
          <p className='deportes-p1'> Deportes</p>
          <p className='deportes-p2'> Las últimas novedades sobre los deportistas más extravagantes.
          </p>
          {/*<p className='deportes-p3'>Actualizado: 9 de Mayo de 2025</p>
          
          <div className='nota-verde-buttons'>
            <button className='nota-verde-buttons-a'>Ver Reportajes</button>
            <button className='nota-verde-buttons-b'>Conoce a bodoque</button>
          </div>*/}
        </div> 
      </section>

      <h2 className='deportes-noticias'>Últimas Noticias sobre Deportes</h2>
      <section className='section-deportes' >
        <div className="deportes-parent">
          {[1,2,3,4].map((n) => (
            <div key={n} className="div-deportes">
              <div className="img-deportes">
              </div>
              <div className="deportes-descripcion">
                <p className='deportes-descripcion-c-f'>{noticias[0].categoria}, {noticias[0].fecha}</p>
                <p className='deportes-descripcion-t'>{noticias[0].titulo}</p>
                <p className='deportes-descripcion-d'>{noticias[0].descripcion.split(" ").slice(0, 24).join(" ")}...</p>
                <div className='deportes-div'>
                  <p className='deportes-descripcion-a'>{noticias[0].autor}</p>
                  <button className='deportes-btn-d' onClick={() => openModal(noticias[0])}>Leer mas</button>
                </div> 
              </div>
            
            </div>))}
        </div>
      </section>
      <div className="hazaña-banner">
        <h3>La hazaña de la semana</h3>
      </div>

      {showModal && selectedNoticia && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{selectedNoticia.titulo}</h2>
            <p className="modal-category">{selectedNoticia.categoria}, {selectedNoticia.fecha}</p>
            <p className="modal-description">{selectedNoticia.descripcion}</p>
            <p className="modal-author">{selectedNoticia.autor}</p>
            <button className="close-modal-btn-deportes" onClick={closeModal}>Cerrar</button>
          </div>
        </div>
      )}

    </div>  
  );
};

export default Deportes;