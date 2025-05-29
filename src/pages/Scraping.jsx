import React, { useEffect, useState } from 'react';

function ScrapingElTiempo() {
  const [titulares, setTitulares] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchHTML() {
      try {
        // Aquí la url que quieres scrapear
        const response = await fetch('https://www.eltiempo.com/', {
          method: 'GET',
          mode: 'cors', // Esto puede dar error por CORS
        });

        if (!response.ok) throw new Error('Error al obtener la página');

        const htmlText = await response.text();

        // Parsear el texto HTML a documento DOM
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlText, 'text/html');

        // Aquí debes inspeccionar la página y buscar los selectores CSS de los titulares
        // Por ejemplo, supongamos que los titulares están en elementos <h2> con clase 'title'
        const elements = doc.querySelectorAll('h2.title');

        const titulosArray = Array.from(elements).map(el => el.textContent.trim());

        setTitulares(titulosArray);
      } catch (err) {
        setError(err.message);
      }
    }

    fetchHTML();
  }, []);

  if (error) return <p>Error: {error}</p>;
  if (titulares.length === 0) return <p>Cargando titulares...</p>;

  return (
    <div>
      <h2>Titulares El Tiempo (scraping simple)</h2>
      <ul>
        {titulares.map((titulo, i) => (
          <li key={i}>{titulo}</li>
        ))}
      </ul>
    </div>
  );
}

export default ScrapingElTiempo;
