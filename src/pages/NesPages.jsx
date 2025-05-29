import React, { useEffect, useState } from "react";

const API_KEY = "ab0c6d419a836087eb536af07911d31a";
const URL = `https://gnews.io/api/v4/top-headlines?country=co&token=${API_KEY}&max=10`;

function NoticiasColombia() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchNoticias() {
      try {
        setLoading(true);
        const res = await fetch(URL);
        const data = await res.json();

        if (data.articles) {
          setArticles(data.articles);
        } else {
          setError("No se encontraron noticias.");
        }
      } catch (err) {
        setError("Error al cargar noticias.");
      } finally {
        setLoading(false);
      }
    }
    fetchNoticias();
  }, []);

  if (loading) return <p>Cargando noticias...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Noticias de Colombia</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {articles.map((article, idx) => (
          <li
            key={idx}
            style={{
              marginBottom: "1.5rem",
              borderBottom: "1px solid #ccc",
              paddingBottom: "1rem",
            }}
          >
            {article.image && (
              <img
                src={article.image}
                alt={article.title}
                style={{ width: "100%", maxHeight: "200px", objectFit: "cover" }}
              />
            )}
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontWeight: "bold", fontSize: "1.1rem", display: "block", marginTop: "0.5rem" }}
            >
              {article.title}
            </a>
            <p>{article.description}</p>
            <small>{new Date(article.publishedAt).toLocaleString()}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NoticiasColombia;
