import '../css/nota_verde.css';

export default function NotaVerde() {
  return (
    <div>

      <section>
        <div>
          <p>Nota verde</p>
          <p>La sección ecologica de 31 Minutos, donde Juan Carlos Bodoque nos enseña
            sobre el medio ambiente y como cuidar nuestro planeta.
          </p>
          <div>
            <button>Leer más</button>
            <button>Conoce a bodoque</button>
          </div>
        </div>
      </section>
      <h2>Reportajes de Nota Verde</h2>
      <section className='section-reportajes'>
        <div className="parent">
          <div className='div1'>1</div>
          <div className='div2'>2</div>
          <div className='div3'>3</div>
          <div className='div4'>4</div>
          <div className='div5'>5</div>
          <div className='div6'>6</div>
        </div>
      </section>

      <div>
        <p>En esta sección encontrarás reportajes, consejos y noticias sobre el cuidado del medio ambiente,
          así como iniciativas para promover la sostenibilidad y el respeto por la naturaleza.
        </p>
        <p>¡Únete a nosotros en la misión de cuidar nuestro planeta!</p>
      </div>
    </div>
  );
}