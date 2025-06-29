
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';

import { useState } from 'react';

import logo from '../assets/logo.png';
import like from '../assets/corazon.png';
import Tulio from '../assets/Tulio2.jpg';   
import '../css/home.css';





export default function Home() {


  const navigate = useNavigate();

  //referencia contenedor y botones de desplazamiento 
  const sliderRef = useRef(null);
  const prevBtnRef = useRef(null);
  const nextBtnRef = useRef(null);

useEffect(() => {

  const sliderPrueba = sliderRef.current;
  const prevBtn = prevBtnRef.current;
  const nextBtn = nextBtnRef.current;

  // si no hay referencia disponible salir del efecto
  if (!sliderPrueba || !prevBtn || !nextBtn) return;

  const totalDivs = sliderPrueba.querySelectorAll('.div-prueba').length;

  //configuraciones iniciales de divs y desplzamiento 
  let divsToShow = 3;
  let moveAmount = 20;

  //condiciones para pantallas-ajustar divs y desplazamiento
  const calculateSettings = () => {
    if (window.innerWidth < 768) {
      divsToShow = 1;
      moveAmount = 100;
    } else if (window.innerWidth < 1100) {
      divsToShow = 2;
      moveAmount = 50;
    } else {
      divsToShow = 3;
      moveAmount = 20;
    }
  };

  calculateSettings();

  //indice de div actual visible
  let currentIndex = 0;

  // actualizar posicion de slider
  function updateSliderPosition() {
    const offset = -(currentIndex * moveAmount);
    sliderPrueba.style.transform = `translateX(${offset}%)`;
  }

  //boton de dar click atras
  const handlePrev = () => {
    if (currentIndex > 0) {
      currentIndex--;
    } else {
      currentIndex = totalDivs - divsToShow;
    }
    updateSliderPosition();
  };

  //boton de dar click adelante
  const handleNext = () => {
    if (currentIndex < totalDivs - divsToShow) {
      currentIndex++;
    } else {
      currentIndex = 0;
    }
    updateSliderPosition();
  };

  // pa manejar casmbios de pantalla y actualizar slider
  const handleResize = () => {
    const oldDivsToShow = divsToShow;
    const oldMoveAmount = moveAmount;
    calculateSettings();

    //si hay cambios en divstoshow o moveamount
    if (oldDivsToShow !== divsToShow || oldMoveAmount !== moveAmount) {
      if (currentIndex > totalDivs - divsToShow) {
        currentIndex = totalDivs - divsToShow;
      }
      updateSliderPosition();
    }
  };

  //eventos a los click en botones
  prevBtn.addEventListener('click', handlePrev);
  nextBtn.addEventListener('click', handleNext);

  //escuchar cambios en tamaño de pantalla
  window.addEventListener('resize', handleResize);

  //transicion automatica cada 5s
  const intervalId = setInterval(() => {
    handleNext();
  }, 5000);

  updateSliderPosition();

  return () => {
    prevBtn.removeEventListener('click', handlePrev);
    nextBtn.removeEventListener('click', handleNext);
    window.removeEventListener('resize', handleResize);
    clearInterval(intervalId);
  };
}, []);


  // click de botones que dirigen a otra pagina, y que empiece
  //al inicio de la pagina
  const handleReporterosClick = () => {
    window.scrollTo(0, 0);
    navigate('/reporteros');
  };

  const handleDeportesClick = () => {
    window.scrollTo(0, 0);
    navigate('/deportes');
  };
  
  const handleNotaVerdeClick = () => {
    window.scrollTo(0, 0);
    navigate('/nota-verde');
  };

  const handleHoroscopoClick = () => {
    window.scrollTo(0, 0);
    navigate('/horoscopo');
  };

  const handleTulioRespondeClick = () => {
    window.scrollTo(0, 0);
    navigate('/tulio-responde');
  };

  const handleEntrevistasLocasClick = () => {
    window.scrollTo(0, 0);
    navigate('/entrevistas-locas');
  };

  //auto scroll al dar en un boton que lo lleva a otra seccion mas abajo
  const handleScrollToNoticias = () => {
    const section = document.getElementById('ultimas');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const noticias = [
    {
      id: 1,
      title: 'Lionel Messi lidera histórica remontada del Inter Miami',
      description: 'En un partido inolvidable, Lionel Messi marcó dos goles y dio una asistencia para que el Inter Miami venciera 4-3 al LA Galaxy, tras ir perdiendo 0-3 en el primer tiempo. Con esta actuación, Messi reafirma su influencia en la Major League Soccer.',
      category: 'Deportes',
      date: '2025-06-06',
      autor: 'Tulio Triviño',
    }

  ];

  //para modales y mostrar noticas completas
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

  //pagina
  return (
    <div className="home">
      {/* header de home */}
      <section className="hero">
        <img src={logo} alt="Logo 31" className="logo-img" />
        <div className="hero-content">
          <div className="textos">
            <p className='textos-a'>31 Minutos</p>
            <p className='textos-b'>El Portal de Noticias Que Nadie Pidió</p>
            <div className="hero-buttons">
              <button onClick={handleScrollToNoticias}>Ver Noticias</button>
              <button onClick={handleReporterosClick}>Conoce a los Reporteros</button>
            </div>
          </div>
        </div>
      </section>
      {/* noticia destacada */}
      <section className="destacada">
        <h2 className='seccions-h'>Noticia Destacada</h2>
        <div className="card">
          <div className='noticia-destacada-perfil'></div>
          <div className="info">
            <span className="categoria-destacada">{noticias[0].category}, {noticias[0].date}</span>
            {/*<span className="fecha">{noticias[0].date}</span><br />*/}
            <span className='titulo'>{noticias[0].title}</span>
            <span className='descripcion'>{noticias[0].description.split(" ").slice(0, 24).join(" ")}...</span>
            <span className='autor'>{noticias[0].autor}</span>
            <div className='botones'>
              <button className='boton-noticias' onClick={() => openModal(noticias[0])}>Leer más</button>
              <div className='like-container'>
                <button className="like-button">
                  <img src={like} alt="like" className="like-img" />
                </button>
                <span className='like-count'>15</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ultimas noticias */}
      <h2 className='seccions-h' id='ultimas'>Últimas Noticias</h2>
      <section className="ultimas">
        <div className="news-grid">
          {[1, 2, 3].map((n) => (
            <div key={n} className="card-utlimas">
              <div className="img-placeholder-ultimas">
                <img src='/reporteros/bodoque/Bodoque5.jpg' className='img-foto-ultima-img' alt="Tulio Triviño" />
              </div>
                <div className="info-utlimas">
                  <p className='info-utlimas-titulo'>{noticias[0].title}</p>
                  <span className="info-utlimas-categoria">{noticias[0].category}, </span>
                  <span className="info-utlimas-fecha">{noticias[0].date}</span>
                  <p className='info-utlimas-descripcion'>{noticias[0].description.split(" ").slice(0, 24).join(" ")}...</p>
                  <div className='like-container-ultimas'>
                    <p className='info-utlimas-autor'>{noticias[0].autor}</p>
                    <div className="like-group">
                      <button className="like-button-ultimas">
                        <img src={like} alt="like" className="like-img" />
                      </button>
                      <span className='like-count'>15</span>
                    </div>
                  </div>
                  <button className='info-utlimas-bt' onClick={() => openModal(noticias[0])}>
                    Leer más
                  </button>
                </div>
            </div>
          ))}
        </div>
      </section>

      {/* secciones especiales - slider */}
      <h2 className='seccions-h'>Secciones Especiales</h2>
      <section className="slider-container">
        <div className="slider-prueba" ref={sliderRef}>
          <div className="div-prueba">
            <button onClick={handleDeportesClick} className='div-prueba-deportes'>
              <p className='div-prueba-centro'>Las últimas novedades sobre los deportistas más extravagantes</p>
              <p className='div-prueba-p'>Deportes</p>
            </button>
            {/*<div className='div-prueba-deportes2'></div>*/}
          </div>
          <div className="div-prueba">
            <button onClick={handleNotaVerdeClick} className='div-prueba-notaverde'>
              <p className='div-prueba-centro'>Nota verde, donde cuidamos el medio ambiente</p>
              <p className='div-prueba-p'>Nota Verde</p>
            </button>
          </div>
          <div className="div-prueba">
            <button onClick={handleHoroscopoClick} className='div-prueba-horoscopo'>
              <p className='div-prueba-centro'>Las predicciones astrologicas mas disparatadas y divertidas del dia.</p>
              <p className='div-prueba-p'>Horoscopo</p>
            </button>
          </div>
          <div className="div-prueba">
            <button onClick={handleTulioRespondeClick} className='div-prueba-tulioresponde'>
              <p className='div-prueba-centro'>Envía tus preguntas para que Tulio te responda.</p>
              <p className='div-prueba-p'>Tulio Responde</p>
            </button>
          </div>
          <div className="div-prueba">
            <button onClick={handleEntrevistasLocasClick} className='div-prueba-entrevistas'>
              <p className='div-prueba-centro'>Una recopilación de respuestas que ni Nostradamus
                hubiera predicho.</p>
              <p className='div-prueba-p'>Entrevistas Locas</p>
            </button>
          </div>
        </div>

        <div className="slider-indicators-left">
          <button className='slider-indicators-bt' ref={prevBtnRef}>
            <FontAwesomeIcon icon={faAngleLeft} />
          </button>
          </div>
          <div className="slider-indicators-right">
          <button className='slider-indicators-bt' ref={nextBtnRef}>
            <FontAwesomeIcon icon={faAngleRight} />
          </button>
        </div>
      </section>

      {/* modales pa ver descripcion completa de noticas */}
      {showModal && selectedNoticia && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{selectedNoticia.title}</h2>
            <p className="modal-category">{selectedNoticia.category}, {selectedNoticia.date}</p>
            <p className="modal-description">{selectedNoticia.description}</p>
            <p className="modal-author">{selectedNoticia.autor}</p>
            <button className="close-modal-btn" onClick={closeModal}>Cerrar</button>
          </div>
        </div>
      )}

    </div>
  );
}
