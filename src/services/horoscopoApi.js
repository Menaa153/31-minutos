
// ejemplo de consumo de api de gemini para la generacion de horoscopo; de esta forma se va hacer
// los otros consumos para las demas secciones


const apiKey = 'AIzaSyBqFk1pIAbt1yCe7Hr-WWN-jYkvsCwlon0';

export const obtenerHoroscopos = async () => {
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `Dame el horóscopo de la semana para cada signo del zodiaco, en un tono breve y divertido. Devuélvelo en formato JSON con los nombres de los signos como claves. Ejemplo: {
                    "Aries": "texto divertido",
                    "Tauro": "texto divertido",
                    ...
                  }`,
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await response.json();
    const texto = data.candidates?.[0]?.content?.parts?.[0]?.text || '';

    // aislar el JSON valido
    const start = texto.indexOf('{');
    const end = texto.lastIndexOf('}');
    const posibleJSON = texto.slice(start, end + 1);

    return JSON.parse(posibleJSON);
  } catch (error) {
    console.error('Error al obtener el horóscopo:', error);
    throw new Error('No se pudo obtener el horóscopo.');
  }
};
