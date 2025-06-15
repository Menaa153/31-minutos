
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

  const sliderRef = useRef(null);
  const prevBtnRef = useRef(null);
  const nextBtnRef = useRef(null);

  useEffect(() => {
    const sliderPrueba = sliderRef.current;
    const prevBtn = prevBtnRef.current;
    const nextBtn = nextBtnRef.current;

    if (!sliderPrueba || !prevBtn || !nextBtn) return;

    const totalDivs = sliderPrueba.querySelectorAll('.div-prueba').length;
    const divsToShow = 3;
    let currentIndex = 0;

    const slideWidth = 100 / totalDivs;

    function updateSliderPosition() {
      const offset = -currentIndex * slideWidth;
      sliderPrueba.style.transform = `translateX(${offset}%)`;
    }

    const handlePrev = () => {
      if (currentIndex > 0) {
        currentIndex--;
      } else {
        currentIndex = totalDivs - divsToShow;
      }
      updateSliderPosition();
    };

    const handleNext = () => {
      if (currentIndex < totalDivs - divsToShow) {
        currentIndex++;
      } else {
        currentIndex = 0;
      }
      updateSliderPosition();
    };

    prevBtn.addEventListener('click', handlePrev);
    nextBtn.addEventListener('click', handleNext);

    // atoavance cada 4 segundos
    const intervalId = setInterval(() => {
      handleNext();
    }, 5000);

    updateSliderPosition();

    return () => {
      prevBtn.removeEventListener('click', handlePrev);
      nextBtn.removeEventListener('click', handleNext);
      clearInterval(intervalId); // limpia el intervalo al desmontar
    };
  }, []);


  const handleReporterosClick = () => {
    navigate('/reporteros');
  };

  const handleDeportesClick = () => {
    navigate('/deportes');
  };
  
  const handleNotaVerdeClick = () => {
    navigate('/nota-verde');
  };

  const handleHoroscopoClick = () => {
    navigate('/horoscopo');
  };

  const handleTulioRespondeClick = () => {
    navigate('/tulio-responde');
  };

  const handleEntrevistasLocasClick = () => {
    navigate('/entrevistas-locas');
  };

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
    <div className="home">
      {/* HERO SECTION */}
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
      {/* NOTICIA DESTACADA */}
      <section className="destacada">
        <h2 className='seccions-h'>Noticia Destacada</h2>
        <div className="card">
          <div className='noticia-destacada-perfil'></div>
          <div className="info">
            <span className="categoria-destacada">{noticias[0].category}, {noticias[0].date}</span>
            {/*<span className="fecha">{noticias[0].date}</span><br />*/}
            <span className='titulo'>{noticias[0].title}</span>
            <span className='descripcion'>{noticias[0].description}</span>
            <span className='autor'>{noticias[0].autor}</span>
            <div className='botones'>
              <button className='boton-noticias'>Leer más</button>
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

      {/* ÚLTIMAS NOTICIAS */}
      <h2 className='seccions-h' id='ultimas'>Últimas Noticias</h2>
      <section className="ultimas">
        <div className="news-grid">
          {[1, 2, 3].map((n) => (
            <div key={n} className="card-utlimas">
              <div className="img-placeholder-ultimas"></div>
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

      {/* SECCIONES ESPECIALES 
      <section className="especiales">
        <h2>Secciones Especiales</h2>
          <div className="nota verde">
            Nota verde
            <div className="img-placeholderes">
              <button className='nota-verde-bt'>Leer más</button>
            </div>
          </div>
          <div className='horoscopo'>
            Horoscopo
            <div className="img-placeholderes">
              <button className='nota-verde-bt'>Leer más</button>
            </div>
          </div>
          <div className='deportes'>
            Deportes
            <div className="img-placeholderes">
              <button className='nota-verde-bt'>Leer más</button>
            </div>
          </div>
          <div className='tulio-responde'>
            Tulio responde
            <div className="img-placeholderes">
              <button className='nota-verde-bt'>Leer más</button>
            </div>
          </div>
          <div className='entrevistas-locas'>
            Entrevistas locas
            <div className="img-placeholderes">
              <button className='nota-verde-bt'>Leer más</button>
            </div>
          </div>
      </section>*/}
      <h2 className='seccions-h'>Secciones Especiales</h2>
      <section className="slider-container">
        <div className="slider-prueba" ref={sliderRef}>
          <div className="div-prueba">
            <button onClick={handleDeportesClick} className='div-prueba-deportes'>
              <p>HOY PERDIO EL BICHO</p>
              <p className='div-prueba-deportes-p'>Deportes</p>
            </button>
            {/*<div className='div-prueba-deportes2'></div>*/}
          </div>
          <div className="div-prueba">
            <button onClick={handleNotaVerdeClick} className='div-prueba-notaverde'>
              <p>Nota verde, donde cuidamos el medio ambiente</p>

            </button>
          </div>
          <div className="div-prueba">
            <button onClick={handleHoroscopoClick} className='div-prueba-horoscopo'>
              <p>Horoscopo de la semana</p>
              <p className='p-horoscopo'>Horoscopo</p>
            </button>
          </div>
          <div className="div-prueba">
            <button onClick={handleTulioRespondeClick} className='div-prueba-tulioresponde'>
              <p>HOY PERDIO EL BICHO</p>
            </button>
          </div>
          <div className="div-prueba">
            <button onClick={handleEntrevistasLocasClick} className='div-prueba-entrevistas'>
              <p>HOY PERDIO EL BICHO</p>
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
