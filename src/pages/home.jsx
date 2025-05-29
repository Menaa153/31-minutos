import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

import '../css/home.css';



export default function Home() {
  return (
    <div className="home">
      {/* HERO SECTION */}
      <section className="hero">
        <img src={logo} alt='Logo 31' className='logo-img' />
        {/*<h1>31 Minutos</h1>*/}
        <p>El Portal de Noticias Que Nadie Pidió</p>
        <div className="hero-buttons">
          <button>Ver Noticias</button>
          <Link to="/reporteros" className='hero-link'> 
              Conocer a los reporteros 
          </Link>
          <button>Conoce a los Reporteros</button>
        </div>
      </section>

      {/* NOTICIA DESTACADA */}
      <section className="destacada">
        <h2>Noticia Destacada</h2>
        <div className="card">
          <div className="img-placeholder"></div>
          <div className="info">
            <h3>Título</h3>
            <p>Descripción</p>
            <p><strong>Autor</strong></p>
            <span className="categoria">Categoría</span>
            <span className="fecha">Fecha de publicación</span>
            <br /><br />
            <button>Leer más</button>
          </div>
        </div>
      </section>

      {/* ÚLTIMAS NOTICIAS */}
      <section className="ultimas">
        <h2>Últimas Noticias</h2>
        <div className="news-grid">
          {[1, 2].map((n) => (
            <div key={n} className="card">
              <div className="img-placeholder"></div>
              <div className="info">
                <span className="categoria">Categoría</span>
                <span className="fecha">Fecha</span>
                <h3>Título</h3>
                <p>Descripción</p>
                <p><strong>Autor</strong></p>
                <button>Leer más</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECCIONES ESPECIALES */}
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
      </section>
    </div>
  );
}
