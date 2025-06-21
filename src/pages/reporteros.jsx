import "../css/Reporteros.css";


export default function Reporteros() {

  //reporteros
  const reporteros = [
      {
        id: 1,
        nombre: "Tulio Triviño",
        bio: "Conductor principal de 31 Minutos. Vanidoso, despistado y encantador a su manera.",
        foto: '/public/reporteros/tulio/Tulio2.jpg',

      },
      {
        id: 2,
        nombre: "Juan Carlos Bodoque",
        bio: "Reportero estrella, conocido por su sarcasmo e informes profundos como 'La Nota Verde'.",
        foto: "/public/reporteros/bodoque/Bodoque2.jpg",
      },
      {
        id: 3,
        nombre: "Policarpo Avendaño",
        bio: "Encargado de la sección de espectáculos. Amante del canto y el espectáculo.",
        foto: "/public/reporteros/policarpo/Policarpo1.jpg",
      },
      {
        id: 4,
        nombre: "Mario Hugo",
        bio: "Reportero amable y muy ingenuo. Siempre busca el lado tierno de las noticias.",
        foto: "/public/reporteros/mario hugo/MarioHugo1.jpg",
      },
      {
        id: 5,
        nombre: "Patana Tufillo Triviño",
        bio: "Sobrina de Tulio y joven reportera con una visión crítica y sensible.",
        foto: "/public/reporteros/patana/Patana1.jpg",
      },
      {
        id: 6,
        nombre: "Juanín Juan Harry",
        bio: "Productor general del noticiero. Nervioso pero dedicado, mantiene todo funcionando.",
        foto: "/public/reporteros/juanin juan harry/Juanin2.webp",

      },
  ];

  return (
    <div className="reporteros-container">
      <div className="titulo-reporteros">
        <h1>Nuestros Reporteros</h1>
        <p> Conoce al increible equipo que hace posible 31 Minutos, 
            el noticiero más innecesario de la Televisión.</p>
      </div>
      <div className="reporteros">
        {reporteros.map(({ id, nombre, bio, foto }) => (
          <div key={id} className="reportero-card">
            <div className="foto">
              <img src={foto} alt={`Foto de ${nombre}`} />
            </div>
            <div className="info-reportero">
              <h2>{nombre}</h2>
              <p className="tipo-repo">Reportero principal</p>
              <p className="biografia-repo">{bio}</p>
              {/*<button className="bt-ver-perfil">Ver perfil completo</button>*/}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
