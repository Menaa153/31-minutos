import "../css/Reporteros.css";

export default function Reporteros() {
  const reporteros = [
      {
        id: 1,
        nombre: "Tulio Triviño",
        bio: "Conductor principal de 31 Minutos. Vanidoso, despistado y encantador a su manera.",
        foto: "https://randomuser.me/api/portraits/men/23.jpg",
      },
      {
        id: 2,
        nombre: "Juan Carlos Bodoque",
        bio: "Reportero estrella, conocido por su sarcasmo e informes profundos como 'La Nota Verde'.",
        foto: "https://randomuser.me/api/portraits/men/23.jpg",
      },
      {
        id: 3,
        nombre: "Policarpo Avendaño",
        bio: "Encargado de la sección de espectáculos. Amante del canto y el espectáculo.",
        foto: "https://randomuser.me/api/portraits/men/23.jpg",
      },
      {
        id: 4,
        nombre: "Mario Hugo",
        bio: "Reportero amable y muy ingenuo. Siempre busca el lado tierno de las noticias.",
        foto: "https://randomuser.me/api/portraits/men/23.jpg",
      },
      {
        id: 5,
        nombre: "Patana Tufillo Triviño",
        bio: "Sobrina de Tulio y joven reportera con una visión crítica y sensible.",
        foto: "https://randomuser.me/api/portraits/men/23.jpg",
      },
      {
        id: 6,
        nombre: "Calcetín con Rombos Man",
        bio: "Superhéroe defensor de los calcetines abandonados. Ícono de justicia textil.",
        foto: "https://randomuser.me/api/portraits/men/23.jpg",
      },
      {
        id: 7,
        nombre: "Juanín Juan Harry",
        bio: "Productor general del noticiero. Nervioso pero dedicado, mantiene todo funcionando.",
        foto: "https://randomuser.me/api/portraits/men/23.jpg",
      },
      {
      id: 8,
      nombre: "Ana Gómez",
      bio: "Especialista en reportajes culturales.",
      foto: "https://randomuser.me/api/portraits/men/23.jpg",
    },
    // Agrega hasta 10 reporteros
  ];

  return (
    <div className="reporteros-container">
      <div className="titulo-reporteros">
        <h1>Reporteros</h1>
        <p>Conoce a los que hacen posible este noticiero innecesario.</p>
      </div>
      <div className="reporteros">
        {reporteros.map(({ id, nombre, edad, bio, foto }) => (
          <div key={id} className="reportero-card">
            <div className="foto">
              <img src={foto} alt={`Foto de ${nombre}`} />
            </div>
            <div className="info">
              <h2>{nombre}</h2>
              <p>{bio}</p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
